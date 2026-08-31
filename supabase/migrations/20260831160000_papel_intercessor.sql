-- Novo papel: "intercessor" — pessoa preparada para responder pedidos
-- de oração na Comunidade de Oração, apoiando esse trabalho junto com
-- o administrador (pensado para quando o administrador não estiver
-- disponível). A tendência é ter vários intercessores ao longo do tempo.

-- Amplia a lista de papéis permitidos em "perfis".
ALTER TABLE public.perfis DROP CONSTRAINT IF EXISTS perfis_papel_check;
ALTER TABLE public.perfis
  ADD CONSTRAINT perfis_papel_check
  CHECK (papel IN ('administrador', 'intercessor', 'membro', 'visitante'));

-- Amplia a lista de papéis permitidos em "pedidos_oracao" (papel
-- capturado no momento da publicação, mesmo princípio já usado para "nome").
ALTER TABLE public.pedidos_oracao DROP CONSTRAINT IF EXISTS pedidos_oracao_papel_check;
ALTER TABLE public.pedidos_oracao
  ADD CONSTRAINT pedidos_oracao_papel_check
  CHECK (papel IN ('administrador', 'intercessor', 'membro', 'visitante'));

-- Função segura para checar "administrador OU intercessor" — usada nas
-- policies de resposta a pedidos. Mesmo padrão de eh_administrador():
-- SECURITY DEFINER evita recursão de RLS (a consulta interna à tabela
-- perfis não re-aciona a policy de quem chamou).
CREATE OR REPLACE FUNCTION public.pode_responder_pedidos()
RETURNS boolean
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
STABLE
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.perfis
    WHERE user_id = auth.uid() AND papel IN ('administrador', 'intercessor')
  );
$$;

REVOKE EXECUTE ON FUNCTION public.pode_responder_pedidos() FROM PUBLIC;
REVOKE EXECUTE ON FUNCTION public.pode_responder_pedidos() FROM anon;
GRANT EXECUTE ON FUNCTION public.pode_responder_pedidos() TO authenticated;

-- Substitui a policy de INSERT em respostas_pedidos_oracao: agora
-- administrador OU intercessor podem responder (antes, só administrador).
DROP POLICY IF EXISTS "So administrador responde" ON public.respostas_pedidos_oracao;
CREATE POLICY "Administrador ou intercessor responde" ON public.respostas_pedidos_oracao
  FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = user_id AND public.pode_responder_pedidos());

-- Substitui a policy de remoção: o próprio autor da resposta (inclusive
-- um intercessor removendo a própria resposta) OU um administrador.
DROP POLICY IF EXISTS "Administrador remove respostas" ON public.respostas_pedidos_oracao;
CREATE POLICY "Autor ou administrador remove respostas" ON public.respostas_pedidos_oracao
  FOR DELETE TO authenticated
  USING (auth.uid() = user_id OR public.eh_administrador());
