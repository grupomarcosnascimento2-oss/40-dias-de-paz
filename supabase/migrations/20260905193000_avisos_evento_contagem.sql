-- Novo tipo de aviso "evento", com uma data/hora-alvo — usado para
-- mostrar uma contagem regressiva até o início de algo (ex: "Semana da
-- Jornada de Oração"), em vez de só um texto estático que fica
-- desatualizado com o tempo.

ALTER TABLE public.avisos DROP CONSTRAINT IF EXISTS avisos_tipo_check;
ALTER TABLE public.avisos
  ADD CONSTRAINT avisos_tipo_check
  CHECK (tipo IN ('noticia', 'aviso', 'alerta', 'comunicado', 'evento'));

ALTER TABLE public.avisos ADD COLUMN data_evento TIMESTAMP WITH TIME ZONE;
