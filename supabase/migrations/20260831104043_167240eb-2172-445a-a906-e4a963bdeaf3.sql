CREATE TABLE public.respostas_pedidos_oracao (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  pedido_id UUID NOT NULL REFERENCES public.pedidos_oracao ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users ON DELETE CASCADE,
  nome TEXT NOT NULL,
  texto TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

GRANT SELECT, INSERT, DELETE ON public.respostas_pedidos_oracao TO authenticated;
GRANT ALL ON public.respostas_pedidos_oracao TO service_role;

ALTER TABLE public.respostas_pedidos_oracao ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Qualquer autenticado ve as respostas" ON public.respostas_pedidos_oracao
  FOR SELECT TO authenticated USING (true);

CREATE POLICY "So administrador responde" ON public.respostas_pedidos_oracao
  FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = user_id AND public.eh_administrador());

CREATE POLICY "Administrador remove respostas" ON public.respostas_pedidos_oracao
  FOR DELETE TO authenticated
  USING (public.eh_administrador());

ALTER PUBLICATION supabase_realtime ADD TABLE public.respostas_pedidos_oracao;