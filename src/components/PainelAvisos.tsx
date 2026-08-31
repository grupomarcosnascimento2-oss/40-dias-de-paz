import { useEffect, useState } from "react";
import { Megaphone, Info, TriangleAlert, BellRing, X } from "lucide-react";
import { type TipoAviso } from "@/lib/avisos";
import { useAvisos, type AvisoDb } from "@/hooks/useAvisos";

const CHAVE_DISPENSADOS = "avisos_dispensados";

const estiloPorTipo: Record<
  TipoAviso,
  { icone: typeof Info; rotulo: string; corTexto: string; corBorda: string; corFundo: string }
> = {
  noticia: {
    icone: Megaphone,
    rotulo: "Notícia",
    corTexto: "text-primary",
    corBorda: "border-l-primary",
    corFundo: "from-card to-secondary/40",
  },
  comunicado: {
    icone: Info,
    rotulo: "Comunicado",
    corTexto: "text-primary",
    corBorda: "border-l-accent",
    corFundo: "from-card to-secondary/40",
  },
  aviso: {
    icone: BellRing,
    rotulo: "Aviso",
    corTexto: "text-primary",
    corBorda: "border-l-accent",
    corFundo: "from-card to-secondary/50",
  },
  alerta: {
    icone: TriangleAlert,
    rotulo: "Alerta",
    corTexto: "text-destructive",
    corBorda: "border-l-destructive",
    corFundo: "from-card to-destructive/10",
  },
};

function lerDispensados(): string[] {
  try {
    const salvo = window.localStorage.getItem(CHAVE_DISPENSADOS);
    return salvo ? (JSON.parse(salvo) as string[]) : [];
  } catch {
    return [];
  }
}

export function PainelAvisos() {
  const { data: avisos } = useAvisos();
  const [dispensados, setDispensados] = useState<string[]>([]);
  const [carregado, setCarregado] = useState(false);

  useEffect(() => {
    setDispensados(lerDispensados());
    setCarregado(true);
  }, []);

  const dispensar = (id: string) => {
    setDispensados((atual) => {
      const novo = [...atual, id];
      window.localStorage.setItem(CHAVE_DISPENSADOS, JSON.stringify(novo));
      return novo;
    });
  };

  const visiveis = carregado
    ? (avisos ?? []).filter((a) => a.ativo && !dispensados.includes(a.id))
    : [];

  if (visiveis.length === 0) return null;

  return (
    <div className="mx-auto max-w-3xl space-y-2 px-6 pt-6">
      {visiveis.map((aviso) => (
        <ItemAviso key={aviso.id} aviso={aviso} onFechar={() => dispensar(aviso.id)} />
      ))}
    </div>
  );
}

function ItemAviso({ aviso, onFechar }: { aviso: AvisoDb; onFechar: () => void }) {
  const estilo = estiloPorTipo[aviso.tipo];
  const Icone = estilo.icone;

  return (
    <div
      className={`flex items-start gap-3 rounded-xl border-l-4 bg-gradient-to-b p-4 ${estilo.corBorda} ${estilo.corFundo}`}
      style={{
        boxShadow:
          "inset 0 1px 0 0 color-mix(in oklab, white 50%, transparent), 0 10px 20px -14px color-mix(in oklab, var(--navy) 40%, transparent)",
      }}
      role="status"
    >
      <Icone className={`mt-0.5 h-5 w-5 shrink-0 ${estilo.corTexto}`} aria-hidden="true" />
      <div className="min-w-0 flex-1">
        <p className={`text-xs font-semibold uppercase tracking-[0.14em] ${estilo.corTexto}`}>
          {estilo.rotulo}
        </p>
        <p className="mt-0.5 text-sm font-medium text-foreground/90">{aviso.titulo}</p>
        <p className="mt-0.5 text-sm text-muted-foreground">{aviso.mensagem}</p>
      </div>
      <button
        type="button"
        onClick={onFechar}
        aria-label="Dispensar aviso"
        className="shrink-0 rounded-full p-1.5 text-muted-foreground transition-colors hover:bg-secondary"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
}
