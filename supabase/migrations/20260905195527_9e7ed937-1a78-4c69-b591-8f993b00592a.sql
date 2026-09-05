ALTER TABLE public.avisos DROP CONSTRAINT IF EXISTS avisos_tipo_check;
ALTER TABLE public.avisos
  ADD CONSTRAINT avisos_tipo_check
  CHECK (tipo IN ('noticia', 'aviso', 'alerta', 'comunicado', 'evento'));

ALTER TABLE public.avisos ADD COLUMN data_evento TIMESTAMP WITH TIME ZONE;