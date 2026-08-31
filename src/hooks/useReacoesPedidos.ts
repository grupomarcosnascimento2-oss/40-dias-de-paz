import { useEffect } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export type Reacao = { pedido_id: string; user_id: string; emoji: string };

const CHAVE = ["reacoes_pedidos_oracao"] as const;

// Conjunto fixo de emojis disponíveis — mantém a experiência simples e
// consistente com o tom do devocional (nada de reações agressivas ou
// fora de contexto).
export const EMOJIS_DISPONIVEIS = ["🙏", "❤️", "🕊️", "🙌"] as const;

async function buscarReacoes(): Promise<Reacao[]> {
  const { data, error } = await supabase
    .from("reacoes_pedidos_oracao")
    .select("pedido_id, user_id, emoji");

  if (error) {
    console.error("[useReacoesPedidos] Falha ao buscar reações:", error);
    throw error;
  }
  return data as Reacao[];
}

export function useReacoesPedidos() {
  const queryClient = useQueryClient();
  const consulta = useQuery({ queryKey: CHAVE, queryFn: buscarReacoes });

  useEffect(() => {
    const canal = supabase
      .channel("reacoes_pedidos_oracao_mural")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "reacoes_pedidos_oracao" },
        () => {
          void queryClient.invalidateQueries({ queryKey: CHAVE });
        },
      )
      .subscribe();

    return () => {
      void supabase.removeChannel(canal);
    };
  }, [queryClient]);

  return consulta;
}

// Reage (ou troca a reação) de um usuário a um pedido. Clicar de novo no
// mesmo emoji remove a reação (alternar/desligar).
export function useReagir() {
  const queryClient = useQueryClient();

  return async (
    pedidoId: string,
    userId: string,
    emoji: string,
    reacaoAtual: string | undefined,
  ) => {
    let erro;

    if (reacaoAtual === emoji) {
      ({ error: erro } = await supabase
        .from("reacoes_pedidos_oracao")
        .delete()
        .eq("pedido_id", pedidoId)
        .eq("user_id", userId));
    } else {
      ({ error: erro } = await supabase
        .from("reacoes_pedidos_oracao")
        .upsert(
          { pedido_id: pedidoId, user_id: userId, emoji },
          { onConflict: "pedido_id,user_id" },
        ));
    }

    if (erro) {
      console.error("[useReagir] Falha ao reagir:", erro);
      return { erro: "falha_ao_reagir" as const };
    }

    void queryClient.invalidateQueries({ queryKey: CHAVE });
    return {};
  };
}
