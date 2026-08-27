import { useEffect, useRef, useState } from "react";
import { Pause, Play, RotateCcw } from "lucide-react";

function tempo(segundos: number) {
  if (!Number.isFinite(segundos)) return "--:--";
  const m = Math.floor(segundos / 60);
  const s = Math.floor(segundos % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

export function PlayerOracao({ src, oracao }: { src?: string; titulo: string; oracao?: string[] }) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [tocando, setTocando] = useState(false);
  const [atual, setAtual] = useState(0);
  const [duracao, setDuracao] = useState(0);

  useEffect(() => {
    setTocando(false);
    setAtual(0);
    setDuracao(0);
  }, [src]);

  const alternar = () => {
    const el = audioRef.current;
    if (!el) return;
    if (tocando) {
      el.pause();
      setTocando(false);
    } else {
      void el.play();
      setTocando(true);
    }
  };

  const progresso = duracao > 0 ? (atual / duracao) * 100 : 0;

  return (
    <section className="paper relative rounded-2xl border border-accent/35 p-6 shadow-[var(--shadow-sacred)] sm:p-8">
      <div className="flex items-start justify-between gap-4">
        <p className="text-xs uppercase tracking-[0.2em] text-accent">Oração do Dia</p>

        <button
          type="button"
          onClick={alternar}
          disabled={!src}
          aria-label={tocando ? "Pausar a oração" : "Ouvir a oração"}
          className="flex shrink-0 flex-col items-center gap-1 disabled:cursor-not-allowed disabled:opacity-60"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-primary-foreground ring-1 ring-accent/50 transition-transform hover:scale-105">
            {tocando ? (
              <Pause className="h-4 w-4" fill="currentColor" />
            ) : (
              <Play className="ml-0.5 h-4 w-4" fill="currentColor" />
            )}
          </span>
          <span className="text-center text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
            Oração em áudio
          </span>
        </button>
      </div>

      {oracao && oracao.length > 0 && (
        <div className="mt-4 space-y-3 text-foreground/90">
          {oracao.map((paragrafo, i) => (
            <p key={i} className="leading-relaxed">
              {paragrafo}
            </p>
          ))}
        </div>
      )}

      {src ? (
        <>
          <audio
            ref={audioRef}
            src={src}
            preload="metadata"
            onTimeUpdate={(e) => setAtual(e.currentTarget.currentTime)}
            onLoadedMetadata={(e) => setDuracao(e.currentTarget.duration)}
            onEnded={() => setTocando(false)}
          />
          <div className="mt-7 flex items-center gap-4">
            <button
              type="button"
              onClick={alternar}
              aria-label={tocando ? "Pausar a oração" : "Ouvir a oração"}
              className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground ring-1 ring-accent/60 transition-transform hover:scale-105"
            >
              {tocando ? (
                <Pause className="h-6 w-6" fill="currentColor" />
              ) : (
                <Play className="ml-1 h-6 w-6" fill="currentColor" />
              )}
            </button>

            <div className="flex-1">
              <div className="h-1.5 w-full rounded-full bg-secondary">
                <div
                  className="h-1.5 rounded-full bg-accent transition-[width]"
                  style={{ width: `${progresso}%` }}
                />
              </div>
              <div className="mt-2 flex justify-between text-xs tracking-wide text-muted-foreground">
                <span>{tempo(atual)}</span>
                <span>{tempo(duracao)}</span>
              </div>
            </div>

            <button
              type="button"
              aria-label="Ouvir novamente desde o início"
              onClick={() => {
                if (audioRef.current) audioRef.current.currentTime = 0;
              }}
              className="text-muted-foreground transition-colors hover:text-accent"
            >
              <RotateCcw className="h-5 w-5" />
            </button>
          </div>
        </>
      ) : (
        <div className="mt-7 flex items-center gap-4 rounded-xl border border-dashed border-accent/40 bg-secondary/50 p-4">
          <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-accent/40 text-accent">
            <Play className="ml-1 h-5 w-5" fill="currentColor" />
          </span>
          <p className="text-sm leading-relaxed text-muted-foreground">
            O áudio desta oração está sendo preparado com carinho e será disponibilizado em breve
            nesta mesma página.
          </p>
        </div>
      )}
    </section>
  );
}
