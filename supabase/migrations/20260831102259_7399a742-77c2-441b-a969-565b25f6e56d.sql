-- Permite que administradores enxerguem todos os perfis (necessário para
-- métricas do Dashboard, como quantidade de membros). Usuários comuns
-- continuam só vendo o próprio perfil (policy já existente).
--
-- A checagem de "sou administrador?" fica numa função SECURITY DEFINER
-- separada para evitar recursão infinita: uma policy em "perfis" que
-- consulta a própria tabela "perfis" diretamente re-aciona a mesma
-- policy para essa consulta interna. Rodando dentro de uma função
-- SECURITY DEFINER, a consulta interna roda com privilégio do dono da
-- função, sem re-acionar a RLS de quem chamou.

CREATE OR REPLACE FUNCTION public.eh_administrador()
RETURNS boolean
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
STABLE
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.perfis
    WHERE user_id = auth.uid() AND papel = 'administrador'
  );
$$;

CREATE POLICY "Administrador ve todos os perfis" ON public.perfis
  FOR SELECT TO authenticated
  USING (public.eh_administrador());