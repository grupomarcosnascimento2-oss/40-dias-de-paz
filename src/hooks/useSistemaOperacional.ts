import { useEffect, useState } from "react";

// Detecta o sistema operacional do aparelho pelo User-Agent do navegador.
// Só roda no cliente (nunca durante SSR) — por isso começa em `null` e só
// atualiza depois que o componente monta, evitando divergência entre o
// HTML gerado no servidor e o que o navegador realmente exibe.
//
// Detecção por User-Agent nunca é 100% confiável (o usuário pode estar
// num navegador "disfarçado", ou num iPad em modo desktop). Por isso este
// hook deve ser usado só para decisões de preferência/ordem visual —
// nunca para esconder ou bloquear uma opção por completo.

export type SistemaOperacional = "ios" | "android" | "outro";

function detectar(): SistemaOperacional {
  const ua = window.navigator.userAgent;
  if (/iPad|iPhone|iPod/.test(ua)) return "ios";
  if (/Android/.test(ua)) return "android";
  return "outro";
}

export function useSistemaOperacional(): SistemaOperacional | null {
  const [sistema, setSistema] = useState<SistemaOperacional | null>(null);

  useEffect(() => {
    setSistema(detectar());
  }, []);

  return sistema;
}
