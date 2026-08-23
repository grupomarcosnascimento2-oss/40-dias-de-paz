CREATE TABLE public.jornadas (
  user_id UUID NOT NULL PRIMARY KEY REFERENCES auth.users ON DELETE CASCADE,
  tem_acesso BOOLEAN NOT NULL DEFAULT false,
  dias_concluidos INTEGER NOT NULL DEFAULT 0,
  ultima_conclusao TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

GRANT SELECT, INSERT, UPDATE ON public.jornadas TO authenticated;
GRANT ALL ON public.jornadas TO service_role;

ALTER TABLE public.jornadas ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Usuario ve sua jornada" ON public.jornadas FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Usuario cria sua jornada" ON public.jornadas FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Usuario atualiza sua jornada" ON public.jornadas FOR UPDATE TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

CREATE OR REPLACE FUNCTION public.set_updated_at() RETURNS TRIGGER AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER jornadas_updated_at BEFORE UPDATE ON public.jornadas
FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();