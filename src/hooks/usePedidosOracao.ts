import { useEffect, useId, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { Papel } from "@/lib/perfis";

export type PedidoOracao = {
  id: string;
  user_id: string;
  nome: string;
  texto: string;
  papel: Papel;
  fixado: boolean;
  created_at: string;
};

const CHAVE = ["pedidos_oracao"] as const;

async function buscarPedidos(): Promise<PedidoOracao[]> {
  const { data, error } = await supabase
    .from("pedidos_oracao")
    .select("id, user_id, nome, texto, papel, fixado, created_at")
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

  // Nome do canal único por instância deste hook (via useId) — o hook
  // pode estar ativo em mais de um componente ao mesmo tempo (ex: o
  // mural completo e o contador de não vistos, ambos na tela de
  // Jornada de Oração), e dois canais com o mesmo nome causavam erro
  // em produção.
  const idInstancia = useId();

  // Atualização em tempo real: assim que alguém publica, remove ou fixa
  // um pedido, todo mundo com o mural aberto vê a mudança sem recarregar.
  useEffect(() => {
    const canal = supabase
      .channel(`pedidos_oracao_mural_${idInstancia}`)
      .on("postgres_changes", { event: "*", schema: "public", table: "pedidos_oracao" }, () => {
        void queryClient.invalidateQueries({ queryKey: CHAVE });
      })
      .subscribe();

    return () => {
      void supabase.removeChannel(canal);
    };
  }, [queryClient, idInstancia]);

  return consulta;
}

export function usePublicarPedido() {
  const queryClient = useQueryClient();
  const [publicando, setPublicando] = useState(false);

  const publicar = async (userId: string, nome: string, papel: Papel, texto: string) => {
    const textoLimpo = texto.trim();
    if (!textoLimpo) return { erro: "texto_vazio" as const };

    setPublicando(true);
    const { error } = await supabase
      .from("pedidos_oracao")
      .insert({ user_id: userId, nome, papel, texto: textoLimpo });
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

// Fixa um pedido no topo (sempre visível, não rola). Só um pedido fica
// fixado por vez: ao fixar um novo, o anterior é desafixado. A segurança
// de verdade (só administrador pode) está garantida na RLS — este hook
// só existe para quem já passou por essa checagem na tela.
export function useFixarPedido() {
  const queryClient = useQueryClient();

  const fixar = async (id: string, jaFixado: boolean) => {
    if (!jaFixado) {
      const { error: erroDesafixar } = await supabase
        .from("pedidos_oracao")
        .update({ fixado: false })
        .eq("fixado", true);
      if (erroDesafixar) {
        console.error("[useFixarPedido] Falha ao desafixar o anterior:", erroDesafixar);
      }
    }

    const { error } = await supabase
      .from("pedidos_oracao")
      .update({ fixado: !jaFixado })
      .eq("id", id);

    if (error) {
      console.error("[useFixarPedido] Falha ao fixar/desafixar:", error);
      return { erro: "falha_ao_fixar" as const };
    }

    void queryClient.invalidateQueries({ queryKey: CHAVE });
    return {};
  };

  return fixar;
}
