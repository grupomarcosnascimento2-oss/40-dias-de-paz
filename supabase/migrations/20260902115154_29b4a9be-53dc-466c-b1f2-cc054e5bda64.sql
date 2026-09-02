-- 1) Registra automaticamente o momento em que uma pessoa vira membro
-- pela primeira vez — via gatilho no banco, para funcionar tanto pela
-- sincronização automática (pagamento confirmado) quanto por promoção
-- manual, sem depender de qual caminho fez a atualização.

ALTER TABLE public.perfis ADD COLUMN tornou_se_membro_em TIMESTAMP WITH TIME ZONE;

CREATE OR REPLACE FUNCTION public.registrar_tornou_se_membro()
RETURNS trigger
LANGUAGE plpgsql
AS $$
BEGIN
  IF NEW.papel = 'membro'
     AND (OLD.papel IS DISTINCT FROM 'membro')
     AND NEW.tornou_se_membro_em IS NULL THEN
    NEW.tornou_se_membro_em := now();
  END IF;
  RETURN NEW;
END;
$$;

CREATE TRIGGER perfis_tornou_se_membro
BEFORE UPDATE ON public.perfis
FOR EACH ROW EXECUTE FUNCTION public.registrar_tornou_se_membro();

-- 2) Público-alvo de cada aviso: todos (padrão, comportamento de
-- sempre), só membros novos (boas-vindas) ou todos os membros
-- (independente de há quanto tempo).

ALTER TABLE public.avisos
  ADD COLUMN publico TEXT NOT NULL DEFAULT 'todos'
  CHECK (publico IN ('todos', 'membros', 'novos_membros'));