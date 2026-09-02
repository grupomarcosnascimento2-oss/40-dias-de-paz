-- Amplia o público-alvo dos avisos para incluir "visitante".

ALTER TABLE public.avisos DROP CONSTRAINT IF EXISTS avisos_publico_check;
ALTER TABLE public.avisos
  ADD CONSTRAINT avisos_publico_check
  CHECK (publico IN ('todos', 'membros', 'novos_membros', 'visitante'));
