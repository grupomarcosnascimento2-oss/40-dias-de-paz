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
// Usa a API oficial do YouTube (não o postMessage cru) porque ela avisa
// de verdade quando o player está pronto (onReady), em vez de depender
// do onLoad do iframe — que pode disparar antes do player estar
// realmente pronto para receber comandos, causando instabilidade
// (principalmente em recarregamentos de página).
//
// Como este componente só existe dentro da aba "Devocional" da jornada,
// ele é desmontado automaticamente sempre que o usuário sai desta tela:
// navega para outra página ou troca para a aba "Jornada de Oração". O
// player é destruído nesse momento (parando o áudio), e recriado do
// zero ao voltar.
//
// Rodízio de vídeos: o vídeo atual (VIDEO_ATUAL) toca por 10 minutos,
// depois troca para VIDEO_NOVO por 1 minuto, e assim continua girando
// indefinidamente enquanto a TV estiver na tela (ver PLAYLIST abaixo).

const VIDEO_ATUAL = "lEjwi2SkJnM";
const VIDEO_NOVO = "qz8YE61BoXM";

// Rodízio contínuo: o vídeo atual toca por 10 minutos, depois troca para
// o vídeo novo por 1 minuto, e volta a girar assim indefinidamente.
const PLAYLIST = [
  { id: VIDEO_ATUAL, duracaoMs: 10 * 60 * 1000 },
  { id: VIDEO_NOVO, duracaoMs: 1 * 60 * 1000 },
] as const;

type PlayerYouTube = {
  destroy: () => void;
  mute: () => void;
  unMute: () => void;
  playVideo: () => void;
  loadVideoById: (videoId: string) => void;
};

declare global {
  interface Window {
    YT?: {
      Player: new (
        elementId: string,
        opcoes: {
          videoId: string;
          playerVars: Record<string, number>;
          events: {
            onReady: (evento: { target: PlayerYouTube }) => void;
          };
        },
      ) => PlayerYouTube;
    };
    onYouTubeIframeAPIReady?: () => void;
  }
}

let carregandoApi: Promise<void> | undefined;

function carregarApiYouTube(): Promise<void> {
  if (window.YT?.Player) return Promise.resolve();
  if (carregandoApi) return carregandoApi;

  carregandoApi = new Promise((resolve) => {
    const anterior = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = () => {
      anterior?.();
      resolve();
    };
    const script = document.createElement("script");
    script.src = "https://www.youtube.com/iframe_api";
    document.head.appendChild(script);
  });

  return carregandoApi;
}

export function TVOracional() {
  const { ativo, alternar, carregado } = useSom();
  const playerRef = useRef<PlayerYouTube | null>(null);
  const [pronto, setPronto] = useState(false);

  useEffect(() => {
    let cancelado = false;

    carregarApiYouTube().then(() => {
      if (cancelado || !window.YT) return;
      playerRef.current = new window.YT.Player("tv-oracional-player", {
        videoId: VIDEO_ATUAL,
        playerVars: {
          autoplay: 1,
          mute: 1,
          controls: 0,
          disablekb: 1,
          fs: 0,
          iv_load_policy: 3,
          playsinline: 1,
          rel: 0,
          modestbranding: 1,
        },
        events: {
          onReady: () => setPronto(true),
        },
      });
    });

    return () => {
      cancelado = true;
      playerRef.current?.destroy();
      playerRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (!pronto || !carregado) return;
    if (ativo) {
      playerRef.current?.unMute();
    } else {
      playerRef.current?.mute();
    }
    playerRef.current?.playVideo();
  }, [ativo, pronto, carregado]);

  // Guarda o estado de som mais recente numa ref, para o rodízio de
  // vídeos (abaixo) sempre aplicar o som certo ao trocar de vídeo, sem
  // precisar reiniciar o cronômetro de 10min/1min toda vez que alguém
  // liga/desliga o interruptor de som.
  const ativoRef = useRef(ativo);
  useEffect(() => {
    ativoRef.current = ativo;
  }, [ativo]);

  useEffect(() => {
    if (!pronto) return;

    const [primeiro, segundo] = PLAYLIST;
    let atualEhPrimeiro = true;
    let cancelado = false;
    let timeoutId: ReturnType<typeof setTimeout>;

    const agendarProximo = () => {
      const atual = atualEhPrimeiro ? primeiro : segundo;
      timeoutId = setTimeout(() => {
        if (cancelado) return;
        atualEhPrimeiro = !atualEhPrimeiro;
        const proximo = atualEhPrimeiro ? primeiro : segundo;
        playerRef.current?.loadVideoById(proximo.id);
        if (ativoRef.current) {
          playerRef.current?.unMute();
        } else {
          playerRef.current?.mute();
        }
        agendarProximo();
      }, atual.duracaoMs);
    };

    agendarProximo();

    return () => {
      cancelado = true;
      clearTimeout(timeoutId);
    };
  }, [pronto]);

  return (
    <div className="mx-auto max-w-3xl px-6 pt-3">
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
            <div
              id="tv-oracional-player"
              className="pointer-events-none absolute inset-0 h-full w-full"
            />

            {/* Selo de canal — não bloqueia o player */}
            <div className="pointer-events-none absolute left-3 top-3 flex items-center gap-1.5 rounded-full bg-black/30 px-2.5 py-1 backdrop-blur-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              <span className="text-[10px] font-medium uppercase tracking-[0.16em] text-accent">
                Ao vivo
              </span>
            </div>
          </div>

          {/* Rodapé do bezel */}
          <div className="mt-3 flex items-center justify-between px-1">
            <span className="text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
              TV e Rádio Devocional
            </span>
            <InterruptorSom ativo={ativo} alternar={alternar} />
          </div>
        </div>
      </div>
    </div>
  );
}
