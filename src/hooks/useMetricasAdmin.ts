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

// Conta quantas vezes o app foi aberto hoje — cada abertura conta
// separadamente (se a mesma pessoa abriu 3 vezes, conta 3), diferente
// de "membros simultâneos" (só quem está conectado agora). Exclui o
// próprio administrador, para não inflar o número com testes/gestão.
// Início do dia calculado no horário local de quem está vendo o
// Dashboard.
async function contarAberturasHoje(): Promise<number> {
  const inicioDoDia = new Date();
  inicioDoDia.setHours(0, 0, 0, 0);

  const { count, error } = await supabase
    .from("logs_acesso")
    .select("*", { count: "exact", head: true })
    .gte("created_at", inicioDoDia.toISOString())
    .neq("papel", "administrador");

  if (error) {
    console.error("[useAberturasHoje] Falha ao contar aberturas de hoje:", error);
    throw error;
  }
  return count ?? 0;
}

export function useAberturasHoje(habilitado: boolean) {
  return useQuery({
    queryKey: ["aberturas_hoje"],
    queryFn: contarAberturasHoje,
    enabled: habilitado,
  });
}
