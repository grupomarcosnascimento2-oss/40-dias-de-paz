import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { Papel } from "@/lib/perfis";

// Conta quantos perfis existem com um determinado papel. Só retorna um
// número real para quem tiver permissão de ver todos os perfis (hoje,
// só o administrador — ver policy "Administrador ve todos os perfis" na
// migration 20260830210000_admin_ve_perfis.sql). Para qualquer outra
// pessoa, a contagem sempre vem 0, porque a RLS só deixa ela enxergar a
// própria linha.

async function contarPorPapel(papel: Papel): Promise<number> {
  const { count, error } = await supabase
    .from("perfis")
    .select("*", { count: "exact", head: true })
    .eq("papel", papel);

  if (error) {
    console.error("[useContagemPorPapel] Falha ao contar perfis:", error);
    throw error;
  }
  return count ?? 0;
}

export function useContagemPorPapel(papel: Papel, habilitado: boolean) {
  return useQuery({
    queryKey: ["contagem_perfis", papel],
    queryFn: () => contarPorPapel(papel),
    enabled: habilitado,
  });
}

// Conta quantos acessos aconteceram hoje, no total — não é o mesmo que
// "membros simultâneos" (esse é um número acumulado do dia inteiro,
// vindo de perfis.ultimo_acesso; aquele é só quem está conectado agora,
// via Presence). Início do dia calculado no horário local do navegador
// de quem está vendo o Dashboard.
async function contarAcessosHoje(): Promise<number> {
  const inicioDoDia = new Date();
  inicioDoDia.setHours(0, 0, 0, 0);

  const { count, error } = await supabase
    .from("perfis")
    .select("*", { count: "exact", head: true })
    .gte("ultimo_acesso", inicioDoDia.toISOString());

  if (error) {
    console.error("[useAcessosHoje] Falha ao contar acessos de hoje:", error);
    throw error;
  }
  return count ?? 0;
}

export function useAcessosHoje(habilitado: boolean) {
  return useQuery({
    queryKey: ["acessos_hoje"],
    queryFn: contarAcessosHoje,
    enabled: habilitado,
  });
}
