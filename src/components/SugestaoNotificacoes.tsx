import { useEffect, useState } from "react";
import { BellRing, X } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useNotificacoesPush } from "@/hooks/useNotificacoesPush";
import { sombra3d } from "@/lib/estilo3d";

const CHAVE_DISPENSADO = "sugestao_notificacoes_dispensada";

export function SugestaoNotificacoes() {
  const { user } = useAuth();
  const { status, carregando, ativar } = useNotificacoesPush(user?.id);
  const [dispensado, setDispensado] = useState(true);

  useEffect(() => {
    setDispensado(window.localStorage.getItem(CHAVE_DISPENSADO) === "1");
  }, []);

  if (status !== "inativo" || dispensado) return null;

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
          <BellRing className="h-4 w-4" />
        </div>

        <p className="min-w-0 flex-1 text-sm text-foreground/85">
          Quer receber um aviso quando publicarmos algo importante?
        </p>

        <button
          type="button"
          onClick={() => void ativar()}
          disabled={carregando}
          className="shrink-0 rounded-full bg-primary px-4 py-1.5 text-xs text-primary-foreground ring-1 ring-accent/50 transition-colors hover:bg-navy-soft disabled:opacity-60"
        >
          {carregando ? "Ativando…" : "Ativar"}
        </button>

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
