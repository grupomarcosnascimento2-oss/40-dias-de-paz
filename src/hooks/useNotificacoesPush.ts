import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

// Chave pública VAPID — segura para ficar no código do cliente (é
// assim que o protocolo Web Push funciona: a chave pública identifica
// o servidor que pode mandar notificação, a privada — essa sim
// secreta, guardada como variável de ambiente do servidor — assina
// cada envio).
const CHAVE_PUBLICA_VAPID =
  "BN6DSMqhQTZtPbwt8EEbXRIIX6ZQX4NEjk1ZPeusMt3-uqdtFvOhIpivAAlr2v8Oc1_cSSAiKdhlvWEJIosZjGk";

function base64UrlParaUint8Array(base64Url: string): Uint8Array {
  const preenchimento = "=".repeat((4 - (base64Url.length % 4)) % 4);
  const base64 = (base64Url + preenchimento).replace(/-/g, "+").replace(/_/g, "/");
  const bruto = window.atob(base64);
  const saida = new Uint8Array(bruto.length);
  for (let i = 0; i < bruto.length; i++) saida[i] = bruto.charCodeAt(i);
  return saida;
}

export type StatusNotificacoes = "indisponivel" | "negado" | "inativo" | "ativo";

export function useNotificacoesPush(userId: string | undefined) {
  const [status, setStatus] = useState<StatusNotificacoes>("inativo");
  const [carregando, setCarregando] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined" || !("Notification" in window) || !userId) {
      setStatus("indisponivel");
      return;
    }
    if (Notification.permission === "denied") {
      setStatus("negado");
      return;
    }

    void (async () => {
      const registro = await navigator.serviceWorker.ready;
      const inscricao = await registro.pushManager.getSubscription();
      setStatus(inscricao ? "ativo" : "inativo");
    })();
  }, [userId]);

  const ativar = async () => {
    if (!userId) return;
    setCarregando(true);
    try {
      const permissao = await Notification.requestPermission();
      if (permissao !== "granted") {
        setStatus("negado");
        return;
      }

      const registro = await navigator.serviceWorker.ready;

      // Se já existir uma inscrição (possivelmente com uma chave VAPID
      // antiga, de antes de trocarmos as chaves), desfaz primeiro — o
      // navegador não cria uma nova inscrição com chave diferente
      // enquanto uma antiga ainda estiver ativa; ele só devolveria a
      // mesma de sempre, presa na chave velha.
      const inscricaoAntiga = await registro.pushManager.getSubscription();
      if (inscricaoAntiga) {
        await supabase.from("push_subscriptions").delete().eq("endpoint", inscricaoAntiga.endpoint);
        await inscricaoAntiga.unsubscribe();
      }

      const inscricao = await registro.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: base64UrlParaUint8Array(CHAVE_PUBLICA_VAPID) as BufferSource,
      });

      const dados = inscricao.toJSON();
      if (!dados.endpoint || !dados.keys?.["p256dh"] || !dados.keys?.["auth"]) {
        console.error("[useNotificacoesPush] Inscrição incompleta, não foi possível salvar.");
        return;
      }

      const { error } = await supabase.from("push_subscriptions").upsert(
        {
          user_id: userId,
          endpoint: dados.endpoint,
          p256dh: dados.keys["p256dh"],
          auth: dados.keys["auth"],
        },
        { onConflict: "endpoint" },
      );

      if (error) {
        console.error("[useNotificacoesPush] Falha ao salvar inscrição:", error);
        return;
      }
      setStatus("ativo");
    } finally {
      setCarregando(false);
    }
  };

  return { status, carregando, ativar };
}
