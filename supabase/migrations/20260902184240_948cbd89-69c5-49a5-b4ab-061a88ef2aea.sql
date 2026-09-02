-- Tabela de captação de leads para a página de acolhimento urgente
-- (/oracao-urgente) — pessoas em momento de necessidade que deixam
-- nome, e-mail e WhatsApp antes de entrar de verdade no devocional
-- (login continua exigindo Google/Apple; isso é só o registro de
-- contato, para o administrador poder fazer um acompanhamento pessoal
-- depois, se quiser).

CREATE TABLE public.leads_captacao (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  nome TEXT NOT NULL,
  email TEXT NOT NULL,
  whatsapp TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

GRANT INSERT ON public.leads_captacao TO anon, authenticated;
GRANT SELECT ON public.leads_captacao TO authenticated;
GRANT ALL ON public.leads_captacao TO service_role;

ALTER TABLE public.leads_captacao ENABLE ROW LEVEL SECURITY;

-- Qualquer pessoa pode se cadastrar aqui, mesmo sem estar logada ainda
-- (ela normalmente chega a essa página antes de fazer login).
CREATE POLICY "Qualquer um pode deixar seus dados" ON public.leads_captacao
  FOR INSERT TO anon, authenticated
  WITH CHECK (true);

-- Só o administrador consegue ver a lista de leads capturados.
CREATE POLICY "Administrador ve os leads" ON public.leads_captacao
  FOR SELECT TO authenticated
  USING (public.eh_administrador());