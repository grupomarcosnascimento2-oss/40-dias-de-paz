CREATE TABLE public.avisos (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  tipo TEXT NOT NULL CHECK (tipo IN ('noticia', 'aviso', 'alerta', 'comunicado')),
  titulo TEXT NOT NULL,
  mensagem TEXT NOT NULL,
  ativo BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

GRANT SELECT ON public.avisos TO authenticated;
GRANT ALL ON public.avisos TO service_role;

ALTER TABLE public.avisos ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Qualquer autenticado ve os avisos" ON public.avisos
  FOR SELECT TO authenticated USING (true);

CREATE POLICY "Administrador gerencia avisos" ON public.avisos
  FOR ALL TO authenticated
  USING (public.eh_administrador())
  WITH CHECK (public.eh_administrador());

ALTER PUBLICATION supabase_realtime ADD TABLE public.avisos;