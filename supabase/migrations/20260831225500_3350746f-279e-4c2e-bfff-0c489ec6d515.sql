ALTER TABLE public.perfis DROP CONSTRAINT IF EXISTS perfis_papel_check;
ALTER TABLE public.perfis
  ADD CONSTRAINT perfis_papel_check
  CHECK (papel IN ('administrador', 'intercessor', 'membro', 'visitante'));

ALTER TABLE public.pedidos_oracao DROP CONSTRAINT IF EXISTS pedidos_oracao_papel_check;
ALTER TABLE public.pedidos_oracao
  ADD CONSTRAINT pedidos_oracao_papel_check
  CHECK (papel IN ('administrador', 'intercessor', 'membro', 'visitante'));

CREATE OR REPLACE FUNCTION public.pode_responder_pedidos()
RETURNS boolean
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
STABLE
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.perfis
    WHERE user_id = auth.uid() AND papel IN ('administrador', 'intercessor')
  );
$$;

REVOKE EXECUTE ON FUNCTION public.pode_responder_pedidos() FROM PUBLIC;
REVOKE EXECUTE ON FUNCTION public.pode_responder_pedidos() FROM anon;
GRANT EXECUTE ON FUNCTION public.pode_responder_pedidos() TO authenticated;

DROP POLICY IF EXISTS "So administrador responde" ON public.respostas_pedidos_oracao;
CREATE POLICY "Administrador ou intercessor responde" ON public.respostas_pedidos_oracao
  FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = user_id AND public.pode_responder_pedidos());

DROP POLICY IF EXISTS "Administrador remove respostas" ON public.respostas_pedidos_oracao;
CREATE POLICY "Autor ou administrador remove respostas" ON public.respostas_pedidos_oracao
  FOR DELETE TO authenticated
  USING (auth.uid() = user_id OR public.eh_administrador());