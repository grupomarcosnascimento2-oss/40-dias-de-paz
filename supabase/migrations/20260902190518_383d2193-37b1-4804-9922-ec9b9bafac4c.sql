-- Registra cada vez que o app é aberto por alguém logado — diferente
-- de perfis.ultimo_acesso (que só guarda a última vez, sobrescrevendo),
-- esta tabela guarda uma linha por abertura, para o Dashboard poder
-- contar "quantas vezes o app foi aberto hoje", não só "quantas pessoas
-- diferentes".

CREATE TABLE public.logs_acesso (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  papel TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

GRANT INSERT ON public.logs_acesso TO authenticated;
GRANT SELECT ON public.logs_acesso TO authenticated;

ALTER TABLE public.logs_acesso ENABLE ROW LEVEL SECURITY;

-- Qualquer pessoa logada pode registrar a própria abertura.
CREATE POLICY "Usuario registra a propria abertura" ON public.logs_acesso
  FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Só o administrador consegue ver os logs (para contar no Dashboard).
CREATE POLICY "Administrador ve os logs de acesso" ON public.logs_acesso
  FOR SELECT TO authenticated
  USING (public.eh_administrador());