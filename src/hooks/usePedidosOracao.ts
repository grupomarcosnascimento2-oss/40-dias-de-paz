import { useEffect, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export type PedidoOracao = {
  id: string;
  user_id: string;
  nome: string;
  texto: string;
  created_at: string;
};

const CHAVE = ["pedidos_oracao"] as const;

async function buscarPedidos(): Promise<PedidoOracao[]> {
  const { data, error } = await supabase
    .from("pedidos_oracao")
    .select("id, user_id, nome, texto, created_at")
    .order("created_at", { ascending: false })
    .limit(100);

  if (error) {
    console.error("[usePedidosOracao] Falha ao buscar pedidos:", error);
    throw error;
  }
  return data as PedidoOracao[];
}

export function usePedidosOracao() {
  const queryClient = useQueryClient();
  const consulta = useQuery({ queryKey: CHAVE, queryFn: buscarPedidos });

  // Atualização em tempo real: assim que alguém publica ou remove um
  // pedido, todo mundo com o mural aberto vê a mudança sem recarregar.
  useEffect(() => {
    const canal = supabase
      .channel("pedidos_oracao_mural")
      .on("postgres_changes", { event: "*", schema: "public", table: "pedidos_oracao" }, () => {
        void queryClient.invalidateQueries({ queryKey: CHAVE });
      })
      .subscribe();

    return () => {
      void supabase.removeChannel(canal);
    };
  }, [queryClient]);

  return consulta;
}

export function usePublicarPedido() {
  const queryClient = useQueryClient();
  const [publicando, setPublicando] = useState(false);

  const publicar = async (userId: string, nome: string, texto: string) => {
    const textoLimpo = texto.trim();
    if (!textoLimpo) return { erro: "texto_vazio" as const };

    setPublicando(true);
    const { error } = await supabase
      .from("pedidos_oracao")
      .insert({ user_id: userId, nome, texto: textoLimpo });
    setPublicando(false);

    if (error) {
      console.error("[usePublicarPedido] Falha ao publicar:", error);
      return { erro: "falha_ao_publicar" as const };
    }

    void queryClient.invalidateQueries({ queryKey: CHAVE });
    return {};
  };

  return { publicar, publicando };
}

export function useRemoverPedido() {
  const queryClient = useQueryClient();

  return async (id: string) => {
    const { error } = await supabase.from("pedidos_oracao").delete().eq("id", id);
    if (error) console.error("[useRemoverPedido] Falha ao remover:", error);
    if (!error) void queryClient.invalidateQueries({ queryKey: CHAVE });
    return { erro: error ? ("falha_ao_remover" as const) : undefined };
  };
}
