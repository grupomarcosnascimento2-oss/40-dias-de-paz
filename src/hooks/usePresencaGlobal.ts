import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { Papel } from "@/lib/perfis";

// Rastreia quem está com o app aberto agora, usando o recurso de
// "Presence" do Supabase Realtime — o mesmo motor de tempo real usado no
// mural de pedidos de oração, mas aqui usado para saber quem está
// conectado neste exato momento, não para escutar mudanças numa tabela.

const CANAL_PRESENCA = "presenca_global";

type PresencaPessoa = { user_id: string; papel: Papel };

// Anuncia a presença do usuário logado enquanto o app estiver aberto.
// Chamado uma única vez, num componente que fica montado durante toda a
// sessão logada (o AppShell, que envolve todas as páginas internas).
// Ao fechar/sair, a presença é removida automaticamente pelo Supabase.
//
// Também registra ultimo_acesso (uma vez por sessão), usado no
// Dashboard para contar quantos acessos aconteceram hoje no total.
export function useRastrearPresenca(userId: string | undefined, papel: Papel | undefined) {
  useEffect(() => {
    if (!userId || !papel) return;

    void supabase
      .from("perfis")
      .update({ ultimo_acesso: new Date().toISOString() })
      .eq("user_id", userId);

    const canal = supabase.channel(CANAL_PRESENCA, {
      config: { presence: { key: userId } },
    });

    canal.subscribe((status) => {
      if (status === "SUBSCRIBED") {
        const presenca: PresencaPessoa = { user_id: userId, papel };
        void canal.track(presenca);
      }
    });

    return () => {
      void supabase.removeChannel(canal);
    };
  }, [userId, papel]);
}

// Conta quantos usuários com papel "membro" estão presentes agora no
// canal compartilhado. Usado no Dashboard — só entra em ação quando
// "habilitado" for true (ex: só para o administrador).
export function useContagemPresencaAoVivo(habilitado: boolean) {
  const [quantidade, setQuantidade] = useState<number | null>(null);

  useEffect(() => {
    if (!habilitado) return;

    const canal = supabase.channel(CANAL_PRESENCA);

    canal.on("presence", { event: "sync" }, () => {
      const estado = canal.presenceState<PresencaPessoa>();
      const todos = Object.values(estado).flat();
      const membros = todos.filter((pessoa) => pessoa.papel === "membro");
      setQuantidade(membros.length);
    });

    canal.subscribe();

    return () => {
      void supabase.removeChannel(canal);
    };
  }, [habilitado]);

  return quantidade;
}
