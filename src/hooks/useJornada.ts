import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { TOTAL_DIAS } from "@/lib/devocional";

export type Jornada = {
  user_id: string;
  tem_acesso: boolean;
  dias_concluidos: number;
  ultima_conclusao: string | null;
};

async function buscarOuCriarJornada(userId: string): Promise<Jornada> {
  const { data, error } = await supabase
    .from("jornadas")
    .select("user_id, tem_acesso, dias_concluidos, ultima_conclusao")
    .eq("user_id", userId)
    .maybeSingle();

  if (error) throw error;
  if (data) return data as Jornada;

  const { data: criada, error: erroCriacao } = await supabase
    .from("jornadas")
    .insert({ user_id: userId })
    .select("user_id, tem_acesso, dias_concluidos, ultima_conclusao")
    .single();

  if (erroCriacao) throw erroCriacao;
  return criada as Jornada;
}

export function useJornada(userId: string | undefined) {
  return useQuery({
    queryKey: ["jornada", userId],
    queryFn: () => buscarOuCriarJornada(userId!),
    enabled: Boolean(userId),
  });
}

export function useLiberarAcesso(userId: string | undefined) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async () => {
      const { error } = await supabase
        .from("jornadas")
        .update({ tem_acesso: true })
        .eq("user_id", userId!);
      if (error) throw error;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["jornada", userId] }),
  });
}

export function useConcluirDia(userId: string | undefined) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (numeroDoDia: number) => {
      const { error } = await supabase
        .from("jornadas")
        .update({
          dias_concluidos: Math.min(numeroDoDia, TOTAL_DIAS),
          ultima_conclusao: new Date().toISOString(),
        })
        .eq("user_id", userId!)
        .lt("dias_concluidos", numeroDoDia);
      if (error) throw error;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["jornada", userId] }),
  });
}

export function diaLiberado(numero: number, diasConcluidos: number) {
  return numero <= diasConcluidos + 1;
}
