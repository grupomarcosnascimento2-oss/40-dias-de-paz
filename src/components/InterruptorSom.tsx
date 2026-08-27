import { Volume2, VolumeX } from "lucide-react";
import { useSom } from "@/hooks/useSom";

// Interruptor de som — discreto, no canto superior direito, na mesma
// linha do botão de menu e do mural. "Ligado" reproduz conteúdo
// (orações, TV Oracional); "Desligado" silencia.

export function InterruptorSom() {
  const { ativo, alternar, carregado } = useSom();

  if (!carregado) return null;

  return (
    <button
      type="button"
      onClick={alternar}
      aria-pressed={ativo}
      aria-label={ativo ? "Desativar som" : "Ativar som"}
      title={ativo ? "Som ativado" : "Som desativado"}
      className="flex h-9 items-center gap-1.5 rounded-full px-2"
    >
      <span
        className={`relative inline-flex h-5 w-9 shrink-0 items-center rounded-full transition-colors ${
          ativo ? "bg-accent" : "bg-secondary"
        }`}
        style={{
          boxShadow: "inset 0 1px 2px 0 color-mix(in oklab, var(--navy) 25%, transparent)",
        }}
      >
        <span
          className={`inline-block h-3.5 w-3.5 transform rounded-full bg-card transition-transform ${
            ativo ? "translate-x-4" : "translate-x-1"
          }`}
          style={{ boxShadow: "0 1px 2px 0 color-mix(in oklab, var(--navy) 35%, transparent)" }}
        />
      </span>
      {ativo ? (
        <Volume2 className="h-4 w-4 text-primary" />
      ) : (
        <VolumeX className="h-4 w-4 text-muted-foreground" />
      )}
    </button>
  );
}
