import { useEffect, useRef, useState } from "react";
import { Cruz } from "./Ornamento";
import { InterruptorSom } from "./InterruptorSom";
import { useSom } from "@/hooks/useSom";
import { sombra3d } from "@/lib/estilo3d";

// TV Oracional — vitrine visual no formato de uma TV moderna, exibindo
// um vídeo do YouTube. O som é controlado pelo mesmo interruptor global
// usado no resto do app (useSom): quando ligado, o vídeo toca com áudio;
// quando desligado, fica mudo.
//
// O vídeo começa em autoplay silencioso (garantido em qualquer
// navegador) e, assim que a página do player carrega, tentamos ativar o
// som automaticamente se o interruptor estiver ligado — a abordagem mais
// confiável para autoplay com áudio.
//
// Como este componente só existe dentro da aba "Devocional" da jornada,
// ele é desmontado automaticamente (e o vídeo para sozinho) sempre que o
// usuário sai desta tela: navega para outra página (dia de oração,
// páginas de conteúdo) ou troca para a aba "Jornada de Oração". Ao
// voltar para cá, o componente remonta e o vídeo recomeça.

const VIDEO_ID = "lEjwi2SkJnM";

function enviarComando(iframe: HTMLIFrameElement | null, func: "playVideo" | "mute" | "unMute") {
  iframe?.contentWindow?.postMessage(JSON.stringify({ event: "command", func, args: [] }), "*");
}

export function TVOracional() {
  const { ativo, alternar, carregado } = useSom();
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [pronto, setPronto] = useState(false);

  useEffect(() => {
    if (!pronto || !carregado) return;
    enviarComando(iframeRef.current, ativo ? "unMute" : "mute");
    enviarComando(iframeRef.current, "playVideo");
  }, [ativo, pronto, carregado]);

  return (
    <div className="mx-auto max-w-3xl px-6 pt-8">
      <div className="relative mx-auto max-w-xl pt-6">
        {/* Antena decorativa, com uma cruz no topo */}
        <div className="absolute -top-2 left-1/2 h-9 w-16 -translate-x-1/2">
          <span className="absolute left-1/2 top-2 h-8 w-[2px] origin-bottom -translate-x-1/2 -rotate-[26deg] bg-accent/60" />
          <span className="absolute left-1/2 top-2 h-8 w-[2px] origin-bottom -translate-x-1/2 rotate-[26deg] bg-accent/60" />
          <Cruz className="absolute left-1/2 top-0 h-4 w-4 -translate-x-1/2 text-accent" />
        </div>

        {/* Corpo / bezel da TV */}
        <div
          className="relative rounded-[2rem] border-2 bg-gradient-to-b from-card to-secondary/60 p-3 sm:p-4"
          style={{ ...sombra3d, borderColor: "#cbb08a" }}
        >
          {/* Tela */}
          <div className="relative aspect-video overflow-hidden rounded-2xl bg-black">
            <iframe
              ref={iframeRef}
              className="absolute inset-0 h-full w-full"
              src={`https://www.youtube-nocookie.com/embed/${VIDEO_ID}?autoplay=1&mute=1&enablejsapi=1&playsinline=1&rel=0&modestbranding=1`}
              title="TV Oracional"
              allow="autoplay; encrypted-media; picture-in-picture"
              allowFullScreen
              onLoad={() => setPronto(true)}
            />

            {/* Selo de canal — não bloqueia os controles do player */}
            <div className="pointer-events-none absolute left-3 top-3 flex items-center gap-1.5 rounded-full bg-black/30 px-2.5 py-1 backdrop-blur-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              <span className="text-[10px] font-medium uppercase tracking-[0.16em] text-accent">
                TV Oracional
              </span>
            </div>
          </div>

          {/* Rodapé do bezel */}
          <div className="mt-3 flex items-center justify-between px-1">
            <span className="text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
              Áudio oracional
            </span>
            <InterruptorSom ativo={ativo} alternar={alternar} />
          </div>
        </div>
      </div>
    </div>
  );
}
