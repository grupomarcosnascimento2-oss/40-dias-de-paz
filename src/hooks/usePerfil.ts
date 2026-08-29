import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { PAPEL_PADRAO, type Papel } from "@/lib/perfis";

export type Perfil = {
  user_id: string;
  papel: Papel;
};

async function buscarOuCriarPerfil(userId: string): Promise<Perfil> {
  const { data, error } = await supabase
    .from("perfis")
    .select("user_id, papel")
    .eq("user_id", userId)
    .maybeSingle();

  if (error) throw error;
  if (data) return data as Perfil;

  // Primeiro acesso: cria o perfil como "visitante" — o papel mínimo,
  // que o próprio usuário tem permissão de criar (ver RLS na migration).
  // Uma promoção a "membro" ou "administrador" só acontece por fora,
  // com privilégio de servidor — ver sincronizarPerfilAposLogin.functions.ts
  // ou uma ação manual do administrador.
  const { data: criado, error: erroCriacao } = await supabase
    .from("perfis")
    .insert({ user_id: userId, papel: PAPEL_PADRAO })
    .select("user_id, papel")
    .single();

  if (erroCriacao) throw erroCriacao;
  return criado as Perfil;
}

export function usePerfil(userId: string | undefined) {
  return useQuery({
    queryKey: ["perfil", userId],
    queryFn: () => buscarOuCriarPerfil(userId!),
    enabled: Boolean(userId),
  });
}
