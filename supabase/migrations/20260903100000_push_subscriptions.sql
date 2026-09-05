-- Guarda a inscrição de push de cada pessoa que ativou notificações
-- (endpoint + chaves do navegador dela, no formato do Web Push
-- padrão). Uma pessoa pode ter mais de uma inscrição (ex: celular e
-- computador), por isso não é uma coluna em "perfis".

CREATE TABLE public.push_subscriptions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  endpoint TEXT NOT NULL UNIQUE,
  p256dh TEXT NOT NULL,
  auth TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

GRANT SELECT, INSERT, DELETE ON public.push_subscriptions TO authenticated;

ALTER TABLE public.push_subscriptions ENABLE ROW LEVEL SECURITY;

-- Cada pessoa só vê/gerencia as próprias inscrições.
CREATE POLICY "Usuario gerencia suas proprias inscricoes" ON public.push_subscriptions
  FOR ALL TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- O administrador precisa ler todas as inscrições para poder enviar os
-- avisos (via função de servidor, com privilégio de service_role — não
-- é acessado pelo navegador de ninguém, então não precisa de policy
-- adicional aqui além da leitura por administrador, se algum dia for
-- necessária na interface).
CREATE POLICY "Administrador ve todas as inscricoes" ON public.push_subscriptions
  FOR SELECT TO authenticated
  USING (public.eh_administrador());
