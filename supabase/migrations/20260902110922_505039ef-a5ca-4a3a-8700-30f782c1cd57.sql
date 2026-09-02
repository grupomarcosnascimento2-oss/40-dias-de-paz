ALTER TABLE public.perfis ADD COLUMN acessos_devocional INTEGER NOT NULL DEFAULT 0;

GRANT UPDATE (acessos_devocional) ON public.perfis TO authenticated;

CREATE POLICY "Usuario atualiza seu contador de acessos" ON public.perfis
  FOR UPDATE TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);