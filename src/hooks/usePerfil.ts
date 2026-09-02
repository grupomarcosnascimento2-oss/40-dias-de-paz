import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { PAPEL_PADRAO, type Papel } from "@/lib/perfis";

export type Perfil = {
  user_id: string;
  papel: Papel;
  acessos_devocional: number;
  tornou_se_membro_em: string | null;
  created_at: string;
};

async function buscarOuCriarPerfil(userId: string): Promise<Perfil> {
  const { data, error } = await supabase
    .from("perfis")
    .select("user_id, papel, acessos_devocional, tornou_se_membro_em, created_at")
    .eq("user_id", userId)
    .maybeSingle();

  if (error) {
    console.error("[usePerfil] Falha ao buscar perfil:", error);
    throw error;
  }
  if (data) return data as Perfil;

  // Primeiro acesso: cria o perfil como "visitante" — o papel mínimo,
  // que o próprio usuário tem permissão de criar (ver RLS na migration).
  // Uma promoção a "membro" ou "administrador" só acontece por fora,
  // com privilégio de servidor — ver sincronizarPerfilAposLogin.functions.ts
  // ou uma ação manual do administrador.
  const { data: criado, error: erroCriacao } = await supabase
    .from("perfis")
    .insert({ user_id: userId, papel: PAPEL_PADRAO })
    .select("user_id, papel, acessos_devocional, tornou_se_membro_em, created_at")
    .single();

  if (erroCriacao) {
    console.error("[usePerfil] Falha ao criar perfil:", erroCriacao);
    throw erroCriacao;
  }
  return criado as Perfil;
}

export function usePerfil(userId: string | undefined) {
  return useQuery({
    queryKey: ["perfil", userId],
    queryFn: () => buscarOuCriarPerfil(userId!),
    enabled: Boolean(userId),
  });
}

// Incrementa o contador de acessos à aba Devocional. Usado para
// identificar a segunda visita do visitante e, a partir daí, restringir
// o acesso (ver jornada.tsx). Só é chamado na primeira visita (quando o
// contador ainda está em 0) — a partir da segunda, a pessoa já é
// bloqueada antes de chegar a incrementar de novo.
export function useIncrementarAcessoDevocional() {
  const queryClient = useQueryClient();

  return async (userId: string, valorAtual: number) => {
    const { error } = await supabase
      .from("perfis")
      .update({ acessos_devocional: valorAtual + 1 })
      .eq("user_id", userId);

    if (error) {
      console.error("[useIncrementarAcessoDevocional] Falha ao atualizar:", error);
      return;
    }
    void queryClient.invalidateQueries({ queryKey: ["perfil", userId] });
  };
}
