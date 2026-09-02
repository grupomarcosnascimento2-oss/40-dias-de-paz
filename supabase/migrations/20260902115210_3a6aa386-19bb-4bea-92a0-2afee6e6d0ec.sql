CREATE OR REPLACE FUNCTION public.registrar_tornou_se_membro()
RETURNS trigger
LANGUAGE plpgsql
SET search_path = public
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