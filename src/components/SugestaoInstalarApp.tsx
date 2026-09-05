import { useEffect, useState } from "react";
import { Share, SquarePlus, X } from "lucide-react";
import { useInstalarApp } from "@/hooks/useInstalarApp";
import { sombra3d } from "@/lib/estilo3d";

const CHAVE_DISPENSADO = "sugestao_instalar_dispensada";

export function SugestaoInstalarApp() {
  const { tipo, instalar } = useInstalarApp();
  const [dispensado, setDispensado] = useState(true);

  useEffect(() => {
    setDispensado(window.localStorage.getItem(CHAVE_DISPENSADO) === "1");
  }, []);

  if (tipo === null || dispensado) return null;

  const dispensar = () => {
    window.localStorage.setItem(CHAVE_DISPENSADO, "1");
    setDispensado(true);
  };

  return (
    <div className="mx-auto max-w-3xl px-6 pt-3">
      <div
        className="flex items-center gap-3 rounded-2xl border border-accent/30 bg-card p-3.5"
        style={sombra3d}
      >
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
          <SquarePlus className="h-4 w-4" />
        </div>

        <div className="min-w-0 flex-1">
          {tipo === "android" ? (
            <p className="text-sm text-foreground/85">
              Adicione o Devocional à sua tela inicial, para acessar mais rápido.
            </p>
          ) : (
            <p className="flex flex-wrap items-center gap-1 text-sm text-foreground/85">
              Toque em <Share className="inline h-3.5 w-3.5 text-accent" /> e depois em
              <strong>"Adicionar à Tela de Início"</strong>.
            </p>
          )}
        </div>

        {tipo === "android" ? (
          <button
            type="button"
            onClick={() => {
              void instalar();
              dispensar();
            }}
            className="shrink-0 rounded-full bg-primary px-4 py-1.5 text-xs text-primary-foreground ring-1 ring-accent/50 transition-colors hover:bg-navy-soft"
          >
            Instalar
          </button>
        ) : null}

        <button
          type="button"
          onClick={dispensar}
          aria-label="Dispensar sugestão"
          className="shrink-0 rounded-full p-1.5 text-muted-foreground transition-colors hover:bg-secondary"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
