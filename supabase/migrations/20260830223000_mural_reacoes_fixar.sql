-- Evolução do mural de pedidos de oração:
-- 1) coluna "papel" (captura o papel de quem postou, no momento da
--    postagem — mesmo princípio já usado para "nome") para destacar
--    visualmente pedidos do administrador
-- 2) coluna "fixado" para fixar um único pedido no topo, sempre visível
-- 3) tabela de reações (emoji) por pedido

ALTER TABLE public.pedidos_oracao
  ADD COLUMN papel TEXT NOT NULL DEFAULT 'membro'
    CHECK (papel IN ('administrador', 'membro', 'visitante')),
  ADD COLUMN fixado BOOLEAN NOT NULL DEFAULT false;

-- Só administrador pode atualizar um pedido (usado para fixar/desafixar).
-- A UI só expõe esse controle para administrador, mas a regra de
-- segurança vale independente da tela.
CREATE POLICY "Administrador atualiza pedidos (fixar)" ON public.pedidos_oracao
  FOR UPDATE TO authenticated
  USING (public.eh_administrador())
  WITH CHECK (public.eh_administrador());

CREATE TABLE public.reacoes_pedidos_oracao (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  pedido_id UUID NOT NULL REFERENCES public.pedidos_oracao ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users ON DELETE CASCADE,
  emoji TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE (pedido_id, user_id)
);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.reacoes_pedidos_oracao TO authenticated;
GRANT ALL ON public.reacoes_pedidos_oracao TO service_role;

ALTER TABLE public.reacoes_pedidos_oracao ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Qualquer autenticado ve as reacoes" ON public.reacoes_pedidos_oracao
  FOR SELECT TO authenticated USING (true);

CREATE POLICY "Autenticado reage com a propria conta" ON public.reacoes_pedidos_oracao
  FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Autenticado troca a propria reacao" ON public.reacoes_pedidos_oracao
  FOR UPDATE TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Autenticado remove a propria reacao" ON public.reacoes_pedidos_oracao
  FOR DELETE TO authenticated
  USING (auth.uid() = user_id);

ALTER PUBLICATION supabase_realtime ADD TABLE public.reacoes_pedidos_oracao;
