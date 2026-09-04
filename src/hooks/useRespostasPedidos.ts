import { useEffect, useId, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export type RespostaPedido = {
  id: string;
  pedido_id: string;
  user_id: string;
  nome: string;
  texto: string;
  created_at: string;
};

const CHAVE = ["respostas_pedidos_oracao"] as const;

async function buscarRespostas(): Promise<RespostaPedido[]> {
  const { data, error } = await supabase
    .from("respostas_pedidos_oracao")
    .select("id, pedido_id, user_id, nome, texto, created_at")
    .order("created_at", { ascending: true });

  if (error) {
    console.error("[useRespostasPedidos] Falha ao buscar respostas:", error);
    throw error;
  }
  return data as RespostaPedido[];
}

export function useRespostasPedidos() {
  const queryClient = useQueryClient();
  const consulta = useQuery({ queryKey: CHAVE, queryFn: buscarRespostas });
  const idInstancia = useId();

  useEffect(() => {
    const canal = supabase
      .channel(`respostas_pedidos_oracao_mural_${idInstancia}`)
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "respostas_pedidos_oracao" },
        () => {
          void queryClient.invalidateQueries({ queryKey: CHAVE });
        },
      )
      .subscribe();

    return () => {
      void supabase.removeChannel(canal);
    };
  }, [queryClient, idInstancia]);

  return consulta;
}

// Publica uma resposta a um pedido. A RLS garante que só administrador
// consegue de fato inserir — aqui é só a chamada.
export function useResponderPedido() {
  const queryClient = useQueryClient();
  const [respondendo, setRespondendo] = useState(false);

  const responder = async (pedidoId: string, userId: string, nome: string, texto: string) => {
    const textoLimpo = texto.trim();
    if (!textoLimpo) return { erro: "texto_vazio" as const };

    setRespondendo(true);
    const { error } = await supabase
      .from("respostas_pedidos_oracao")
      .insert({ pedido_id: pedidoId, user_id: userId, nome, texto: textoLimpo });
    setRespondendo(false);

    if (error) {
      console.error("[useResponderPedido] Falha ao responder:", error);
      return { erro: "falha_ao_responder" as const };
    }

    void queryClient.invalidateQueries({ queryKey: CHAVE });
    return {};
  };

  return { responder, respondendo };
}

export function useRemoverResposta() {
  const queryClient = useQueryClient();

  return async (id: string) => {
    const { error } = await supabase.from("respostas_pedidos_oracao").delete().eq("id", id);
    if (error) console.error("[useRemoverResposta] Falha ao remover:", error);
    if (!error) void queryClient.invalidateQueries({ queryKey: CHAVE });
    return { erro: error ? ("falha_ao_remover" as const) : undefined };
  };
}
