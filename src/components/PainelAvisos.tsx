import { useEffect, useState } from "react";
import { Megaphone, Info, TriangleAlert, BellRing, Hourglass, X } from "lucide-react";
import { type TipoAviso } from "@/lib/avisos";
import { useAvisos, type AvisoDb } from "@/hooks/useAvisos";
import type { Papel } from "@/lib/perfis";

const CHAVE_DISPENSADOS = "avisos_dispensados";

// Janela de tempo em que um membro é considerado "novo" para fins de
// aviso de boas-vindas — ajustável aqui, num único lugar.
const JANELA_NOVO_MEMBRO_DIAS = 7;

const estiloPorTipo: Record<
  TipoAviso,
  {
    icone: typeof Info;
    rotulo: string;
    corTexto: string;
    corBorda: string;
    corFundo: string;
    corChip: string;
    pulsar?: boolean;
  }
> = {
  noticia: {
    icone: Megaphone,
    rotulo: "Notícia",
    corTexto: "text-primary",
    corBorda: "border-primary/30",
    corFundo: "bg-primary/[0.06]",
    corChip: "bg-primary",
  },
  comunicado: {
    icone: Info,
    rotulo: "Comunicado",
    corTexto: "text-accent",
    corBorda: "border-accent/40",
    corFundo: "bg-accent/[0.07]",
    corChip: "bg-accent",
  },
  aviso: {
    icone: BellRing,
    rotulo: "Aviso",
    corTexto: "text-accent",
    corBorda: "border-accent/50",
    corFundo: "bg-accent/[0.09]",
    corChip: "bg-accent",
  },
  alerta: {
    icone: TriangleAlert,
    rotulo: "Alerta",
    corTexto: "text-destructive",
    corBorda: "border-destructive/50",
    corFundo: "bg-destructive/[0.08]",
    corChip: "bg-destructive",
    pulsar: true,
  },
  evento: {
    icone: Hourglass,
    rotulo: "Evento",
    corTexto: "text-primary",
    corBorda: "border-primary/40",
    corFundo: "bg-primary/[0.08]",
    corChip: "bg-primary",
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

export function PainelAvisos({
  papel,
  tornouSeMembroEm,
}: {
  papel: Papel | undefined;
  tornouSeMembroEm: string | null | undefined;
}) {
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

  const souMembro = papel === "membro";
  const souNovoMembro =
    souMembro &&
    Boolean(tornouSeMembroEm) &&
    Date.now() - new Date(tornouSeMembroEm as string).getTime() <
      JANELA_NOVO_MEMBRO_DIAS * 24 * 60 * 60 * 1000;

  const visiveis = carregado
    ? (avisos ?? []).filter((a) => {
        if (!a.ativo || dispensados.includes(a.id)) return false;
        if (a.publico === "membros") return souMembro;
        if (a.publico === "novos_membros") return souNovoMembro;
        if (a.publico === "visitante") return papel === "visitante";
        return true;
      })
    : [];

  if (visiveis.length === 0) return null;

  return (
    <div className="mx-auto max-w-3xl space-y-3 px-6 pt-6">
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
      className={`animate-in fade-in slide-in-from-top-2 flex items-start gap-3.5 rounded-2xl border-2 p-4 duration-300 sm:p-5 ${estilo.corBorda} ${estilo.corFundo}`}
      style={{
        boxShadow:
          "inset 0 1px 0 0 color-mix(in oklab, white 55%, transparent), 0 14px 26px -16px color-mix(in oklab, var(--navy) 45%, transparent)",
      }}
      role="status"
    >
      <div className="relative shrink-0">
        {estilo.pulsar && (
          <span
            className={`absolute inset-0 animate-ping rounded-full opacity-60 ${estilo.corChip}`}
          />
        )}
        <div
          className={`relative flex h-11 w-11 items-center justify-center rounded-full text-white ${estilo.corChip}`}
          style={{ boxShadow: "0 4px 10px -3px color-mix(in oklab, var(--navy) 55%, transparent)" }}
        >
          <Icone className="h-5 w-5" aria-hidden="true" />
        </div>
      </div>
      <div className="min-w-0 flex-1 pt-0.5">
        <p className={`text-xs font-bold uppercase tracking-[0.16em] ${estilo.corTexto}`}>
          {estilo.rotulo}
        </p>
        {aviso.titulo && (
          <p className="mt-1 text-base font-semibold leading-snug text-foreground">
            {aviso.titulo}
          </p>
        )}
        <p className="mt-1 text-sm leading-snug text-foreground/75">{aviso.mensagem}</p>
        {aviso.tipo === "evento" && aviso.data_evento && (
          <ContagemRegressiva dataAlvo={aviso.data_evento} />
        )}
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

// Calcula e mostra "Faltam X dias, Y horas, Z minutos e W segundos" até
// a data-alvo, atualizando a cada segundo. Depois que a data passa,
// mostra que o evento já começou, em vez de números negativos.
function ContagemRegressiva({ dataAlvo }: { dataAlvo: string }) {
  const [agora, setAgora] = useState(() => Date.now());

  useEffect(() => {
    const id = setInterval(() => setAgora(Date.now()), 1_000);
    return () => clearInterval(id);
  }, []);

  const diferenca = new Date(dataAlvo).getTime() - agora;

  if (diferenca <= 0) {
    return <p className="mt-2 text-sm font-semibold text-primary">🎉 O evento já começou!</p>;
  }

  const dias = Math.floor(diferenca / (24 * 60 * 60 * 1000));
  const horas = Math.floor((diferenca / (60 * 60 * 1000)) % 24);
  const minutos = Math.floor((diferenca / (60 * 1000)) % 60);
  const segundos = Math.floor((diferenca / 1000) % 60);

  const partes: string[] = [];
  if (dias > 0) partes.push(`${dias} dia${dias === 1 ? "" : "s"}`);
  if (horas > 0 || dias > 0) partes.push(`${horas} hora${horas === 1 ? "" : "s"}`);
  if (minutos > 0 || horas > 0 || dias > 0) {
    partes.push(`${minutos} minuto${minutos === 1 ? "" : "s"}`);
  }
  partes.push(`${segundos} segundo${segundos === 1 ? "" : "s"}`);

  return (
    <p className="mt-2 text-sm font-semibold tabular-nums text-primary">
      ⏳ Faltam {partes.join(", ")}
    </p>
  );
}
