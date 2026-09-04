import { useEffect, useState } from "react";
import type { RealtimeChannel } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import type { Papel } from "@/lib/perfis";

// Rastreia quem está com o app aberto agora, usando o recurso de
// "Presence" do Supabase Realtime — o mesmo motor de tempo real usado no
// mural de pedidos de oração, mas aqui usado para saber quem está
// conectado neste exato momento, não para escutar mudanças numa tabela.
//
// IMPORTANTE: o Supabase Realtime não permite duas inscrições
// independentes no mesmo nome de canal a partir do mesmo cliente (dá
// erro em produção) — por isso, ao contrário dos outros hooks deste
// projeto, aqui existe só UM canal compartilhado (módulo, não por
// componente), criado uma única vez e reaproveitado por todos os hooks
// abaixo, não importa quantos estejam ativos ao mesmo tempo na página.

const NOME_CANAL = "presenca_global";

type PresencaPessoa = { user_id: string; papel: Papel };
type OuvinteSync = (estado: Record<string, PresencaPessoa[]>) => void;

let canalCompartilhado: RealtimeChannel | null = null;
let statusInscricao: "aguardando" | "inscrito" = "aguardando";
const ouvintesSync = new Set<OuvinteSync>();
const filaDeRastreio: PresencaPessoa[] = [];

function obterCanalCompartilhado(): RealtimeChannel {
  if (canalCompartilhado) return canalCompartilhado;

  canalCompartilhado = supabase.channel(NOME_CANAL);

  canalCompartilhado.on("presence", { event: "sync" }, () => {
    const estado = canalCompartilhado!.presenceState<PresencaPessoa>();
    ouvintesSync.forEach((ouvinte) => ouvinte(estado));
  });

  canalCompartilhado.subscribe((status) => {
    if (status === "SUBSCRIBED") {
      statusInscricao = "inscrito";
      // Qualquer presença que tentou se anunciar antes do canal ficar
      // pronto é enviada agora, em vez de perdida.
      filaDeRastreio.splice(0).forEach((presenca) => {
        void canalCompartilhado!.track(presenca);
      });
    }
  });

  return canalCompartilhado;
}

function rastrearPresenca(presenca: PresencaPessoa) {
  const canal = obterCanalCompartilhado();
  if (statusInscricao === "inscrito") {
    void canal.track(presenca);
  } else {
    filaDeRastreio.push(presenca);
  }
}

function assinarSync(ouvinte: OuvinteSync): () => void {
  obterCanalCompartilhado();
  ouvintesSync.add(ouvinte);
  return () => ouvintesSync.delete(ouvinte);
}

// Anuncia a presença do usuário logado enquanto o app estiver aberto.
// Chamado uma única vez, num componente que fica montado durante toda a
// sessão logada (o AppShell, que envolve todas as páginas internas).
//
// Também registra ultimo_acesso e uma linha em logs_acesso (uma vez
// por sessão), usados no Dashboard para contar acessos de hoje.
export function useRastrearPresenca(userId: string | undefined, papel: Papel | undefined) {
  useEffect(() => {
    if (!userId || !papel) return;

    void supabase
      .from("perfis")
      .update({ ultimo_acesso: new Date().toISOString() })
      .eq("user_id", userId);
    void supabase.from("logs_acesso").insert({ user_id: userId, papel });

    rastrearPresenca({ user_id: userId, papel });
  }, [userId, papel]);
}

// Anuncia a presença de quem abre a landing page (a tela de entrada),
// mesmo sem estar logado. Como não há user_id nesse momento, usamos uma
// chave anônima aleatória, válida só enquanto a aba estiver aberta.
export function useRastrearPresencaVisitante(ativo: boolean = true) {
  useEffect(() => {
    if (!ativo || typeof window === "undefined") return;

    const chaveAnonima = `visitante_${Math.random().toString(36).slice(2)}`;
    rastrearPresenca({ user_id: chaveAnonima, papel: "visitante" });
  }, [ativo]);
}

// Conta quantos usuários com papel "membro" estão presentes agora no
// canal compartilhado. Usado no Dashboard — só entra em ação quando
// "habilitado" for true (ex: só para o administrador).
export function useContagemPresencaAoVivo(habilitado: boolean) {
  const [quantidade, setQuantidade] = useState<number | null>(null);

  useEffect(() => {
    if (!habilitado) return;

    return assinarSync((estado) => {
      const todos = Object.values(estado).flat();
      setQuantidade(todos.filter((pessoa) => pessoa.papel === "membro").length);
    });
  }, [habilitado]);

  return quantidade;
}

// Conta todas as pessoas conectadas agora — membros, visitantes,
// intercessores e administrador, sem filtrar por papel.
export function useContagemPresencaTotal(habilitado: boolean) {
  const [quantidade, setQuantidade] = useState<number | null>(null);

  useEffect(() => {
    if (!habilitado) return;

    return assinarSync((estado) => {
      setQuantidade(Object.values(estado).flat().length);
    });
  }, [habilitado]);

  return quantidade;
}
