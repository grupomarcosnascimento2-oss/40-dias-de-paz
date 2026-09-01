-- Contador de quantas vezes o visitante já acessou a aba "Devocional".
-- Usado para identificar a segunda visita e, a partir daí, restringir
-- o acesso à TV e aos 40 dias, levando sempre para o convite de virar
-- membro.
--
-- Segurança: RLS garante que cada pessoa só atualiza a própria linha; o
-- GRANT de coluna garante que ela só pode alterar esta coluna
-- específica — nunca o papel (que continua exigindo service_role).

ALTER TABLE public.perfis ADD COLUMN acessos_devocional INTEGER NOT NULL DEFAULT 0;

GRANT UPDATE (acessos_devocional) ON public.perfis TO authenticated;

CREATE POLICY "Usuario atualiza seu contador de acessos" ON public.perfis
  FOR UPDATE TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);
