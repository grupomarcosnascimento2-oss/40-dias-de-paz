import { Play, Radio } from "lucide-react";
import { Cruz } from "./Ornamento";
import { InterruptorSom } from "./InterruptorSom";
import { sombra3d } from "@/lib/estilo3d";

// TV Oracional — vitrine visual no formato de uma TV moderna, para
// futuramente exibir vídeos gravados e transmitir áudios de oração.
// Mais adiante, vai abrigar também transmissões ao vivo (streaming).
// Por enquanto é só a vitrine: o conteúdo real ainda não está pronto.

export function TVOracional() {
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
          <div
            className="relative aspect-video overflow-hidden rounded-2xl"
            style={{
              background: "radial-gradient(ellipse at center, #1c2848 0%, #0d1326 78%)",
            }}
          >
            {/* Linhas sutis, efeito de tela antiga */}
            <div
              className="pointer-events-none absolute inset-0 opacity-15"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(to bottom, transparent 0px, transparent 3px, rgba(255,255,255,0.5) 4px)",
              }}
            />

            {/* Selo de canal */}
            <div className="absolute left-3 top-3 flex items-center gap-1.5 rounded-full bg-black/30 px-2.5 py-1 backdrop-blur-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              <span className="text-[10px] font-medium uppercase tracking-[0.16em] text-accent">
                TV Oracional
              </span>
            </div>

            {/* Conteúdo central */}
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 px-6 text-center">
              <span className="flex h-14 w-14 animate-pulse items-center justify-center rounded-full bg-accent/15 ring-1 ring-accent/50">
                <Play className="h-6 w-6 translate-x-0.5 text-accent" fill="currentColor" />
              </span>
              <p className="script text-xl text-accent sm:text-2xl">Em breve</p>
              <p className="max-w-xs text-xs text-primary-foreground/70 sm:text-sm">
                Vídeos e transmissões de oração — e, no futuro, também ao vivo.
              </p>
            </div>
          </div>

          {/* Rodapé do bezel */}
          <div className="mt-3 flex items-center justify-between px-1">
            <div className="flex items-center gap-1.5 text-muted-foreground">
              <Radio className="h-3.5 w-3.5" />
              <span className="text-[10px] uppercase tracking-[0.14em]">Áudio oracional</span>
            </div>
            <InterruptorSom />
          </div>
        </div>
      </div>
    </div>
  );
}
