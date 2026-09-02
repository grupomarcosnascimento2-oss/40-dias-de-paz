import { useEffect } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { TipoAviso } from "@/lib/avisos";

export type PublicoAviso = "todos" | "membros" | "novos_membros" | "visitante";

export type AvisoDb = {
  id: string;
  tipo: TipoAviso;
  titulo: string;
  mensagem: string;
  ativo: boolean;
  publico: PublicoAviso;
  created_at: string;
};

const CHAVE = ["avisos"] as const;

async function buscarAvisos(): Promise<AvisoDb[]> {
  const { data, error } = await supabase
    .from("avisos")
    .select("id, tipo, titulo, mensagem, ativo, publico, created_at")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("[useAvisos] Falha ao buscar avisos:", error);
    throw error;
  }
  return data as AvisoDb[];
}

// Busca todos os avisos, com atualização em tempo real. Quem só precisa
// dos avisos ativos (o painel exibido a todo mundo) filtra localmente
// por "ativo" — o Dashboard usa a lista completa, para o administrador
// também ver os desativados.
export function useAvisos() {
  const queryClient = useQueryClient();
  const consulta = useQuery({ queryKey: CHAVE, queryFn: buscarAvisos });

  useEffect(() => {
    // Nome único por instância: dois componentes podem usar este hook ao
    // mesmo tempo, e reaproveitar o mesmo nome de canal faz o Supabase
    // recusar o segundo `on("postgres_changes")` (canal já inscrito).
    const canal = supabase
      .channel(`avisos_realtime_${Math.random().toString(36).slice(2)}`)
      .on("postgres_changes", { event: "*", schema: "public", table: "avisos" }, () => {
        void queryClient.invalidateQueries({ queryKey: CHAVE });
      })
      .subscribe();

    return () => {
      void supabase.removeChannel(canal);
    };
  }, [queryClient]);

  return consulta;
}

export function useCriarAviso() {
  const queryClient = useQueryClient();

  return async (tipo: TipoAviso, titulo: string, mensagem: string, publico: PublicoAviso) => {
    const { error } = await supabase.from("avisos").insert({ tipo, titulo, mensagem, publico });
    if (error) {
      console.error("[useCriarAviso] Falha ao criar aviso:", error);
      return { erro: "falha_ao_criar" as const };
    }
    void queryClient.invalidateQueries({ queryKey: CHAVE });
    return {};
  };
}

export function useAlternarAviso() {
  const queryClient = useQueryClient();

  return async (id: string, ativo: boolean) => {
    const { error } = await supabase.from("avisos").update({ ativo }).eq("id", id);
    if (error) {
      console.error("[useAlternarAviso] Falha ao atualizar aviso:", error);
      return { erro: "falha_ao_atualizar" as const };
    }
    void queryClient.invalidateQueries({ queryKey: CHAVE });
    return {};
  };
}

export function useRemoverAviso() {
  const queryClient = useQueryClient();

  return async (id: string) => {
    const { error } = await supabase.from("avisos").delete().eq("id", id);
    if (error) {
      console.error("[useRemoverAviso] Falha ao remover aviso:", error);
      return { erro: "falha_ao_remover" as const };
    }
    void queryClient.invalidateQueries({ queryKey: CHAVE });
    return {};
  };
}
