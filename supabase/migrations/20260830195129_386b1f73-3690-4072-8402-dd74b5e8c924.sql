-- Tabela de pedidos de oração — mural da Comunidade de Oração, onde
-- membros logados publicam pedidos. Moderação: o autor do pedido ou um
-- administrador podem removê-lo.

CREATE TABLE public.pedidos_oracao (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users ON DELETE CASCADE,
  nome TEXT NOT NULL,
  texto TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

GRANT SELECT, INSERT, DELETE ON public.pedidos_oracao TO authenticated;
GRANT ALL ON public.pedidos_oracao TO service_role;

ALTER TABLE public.pedidos_oracao ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Qualquer autenticado ve o mural" ON public.pedidos_oracao
  FOR SELECT TO authenticated USING (true);

CREATE POLICY "Autenticado publica seu proprio pedido" ON public.pedidos_oracao
  FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Remoção: o próprio autor, ou um administrador (via tabela perfis).
CREATE POLICY "Autor ou administrador remove o pedido" ON public.pedidos_oracao
  FOR DELETE TO authenticated
  USING (
    auth.uid() = user_id
    OR EXISTS (
      SELECT 1 FROM public.perfis
      WHERE perfis.user_id = auth.uid() AND perfis.papel = 'administrador'
    )
  );

-- Habilita atualização em tempo real (postgres_changes) para esta tabela.
ALTER PUBLICATION supabase_realtime ADD TABLE public.pedidos_oracao;