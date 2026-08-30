-- Tabela de perfis: guarda o papel de cada usuário no devocional
-- (administrador, membro ou visitante). Criada como parte do controle
-- de acesso por perfil — implementada, mas ainda não habilitada no app
-- (ver CONTROLE_DE_PERFIL_HABILITADO em src/lib/perfis.ts).

CREATE TABLE public.perfis (
  user_id UUID NOT NULL PRIMARY KEY REFERENCES auth.users ON DELETE CASCADE,
  papel TEXT NOT NULL DEFAULT 'visitante' CHECK (papel IN ('administrador', 'membro', 'visitante')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

GRANT SELECT, INSERT ON public.perfis TO authenticated;
GRANT ALL ON public.perfis TO service_role;

ALTER TABLE public.perfis ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Usuario ve seu proprio perfil" ON public.perfis
  FOR SELECT TO authenticated USING (auth.uid() = user_id);

-- O usuário só pode criar o próprio perfil como "visitante" (o papel
-- mínimo). Promover alguém a "membro" ou "administrador" exige o
-- service_role — feito pela validação de pagamento (server function) ou
-- manualmente pelo administrador. Note que não existe policy de UPDATE
-- para o papel "authenticated": isso é proposital, para impedir que o
-- próprio usuário se autopromova pelo navegador.
CREATE POLICY "Usuario cria seu perfil como visitante" ON public.perfis
  FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = user_id AND papel = 'visitante');

CREATE TRIGGER perfis_updated_at BEFORE UPDATE ON public.perfis
FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();