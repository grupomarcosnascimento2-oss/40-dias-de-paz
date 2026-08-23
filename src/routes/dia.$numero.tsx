import { useEffect, useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
import { useAuth } from "@/hooks/useAuth";
import { useJornada, useConcluirDia, diaLiberado } from "@/hooks/useJornada";
import { getDia, getAreaDoDia, TOTAL_DIAS } from "@/lib/devocional";
import { PlayerOracao } from "@/components/PlayerOracao";
import { Ornamento, Cruz } from "@/components/Ornamento";

export const Route = createFileRoute("/dia/$numero")({
  head: ({ params }) => {
    const dia = getDia(Number(params.numero));
    return {
      meta: [
        {
          title: dia
            ? `Dia ${dia.numero} — ${dia.titulo} — 40 Dias Rezando com Marcos Nascimento`
            : "Dia — 40 Dias Rezando com Marcos Nascimento",
        },
        {
          name: "description",
          content: dia?.palavra ?? "Um dia de oração na jornada dos 40 dias.",
        },
      ],
    };
  },
  component: DiaOracional,
});

function DiaOracional() {
  const { numero } = Route.useParams();
  const numeroDoDia = Number(numero);
  const dia = getDia(numeroDoDia);
  const area = getAreaDoDia(numeroDoDia);

  const { user, carregando } = useAuth();
  const navigate = useNavigate();
  const { data: jornada, isLoading } = useJornada(user?.id);
  const concluirDia = useConcluirDia(user?.id);
  const [concluindo, setConcluindo] = useState(false);

  useEffect(() => {
    if (!carregando && !user) navigate({ to: "/entrar" });
  }, [carregando, user, navigate]);

  if (carregando || isLoading || !jornada || !dia) {
    return (
      <main className="flex min-h-screen items-center justify-center">
        <p className="text-muted-foreground">Preparando o dia de oração…</p>
      </main>
    );
  }

  if (!jornada.tem_acesso) {
    navigate({ to: "/jornada" });
    return null;
  }

  const diasConcluidos = jornada.dias_concluidos ?? 0;
  const liberado = diaLiberado(numeroDoDia, diasConcluidos);
  const jaConcluido = numeroDoDia <= diasConcluidos;
  const proximoNumero = Math.min(numeroDoDia + 1, TOTAL_DIAS);

  if (!liberado) {
    return (
      <main className="flex min-h-screen items-center justify-center px-6 py-16">
        <div className="paper w-full max-w-md rounded-2xl border border-accent/35 p-8 text-center shadow-[var(--shadow-sacred)]">
          <Cruz className="mx-auto h-5 w-5 text-accent" />
          <h1 className="mt-4 text-2xl">Um passo de cada vez</h1>
          <p className="mt-2 text-foreground/80">
            Este dia ainda não foi liberado. Continue sua caminhada a partir de onde você parou.
          </p>
          <Link
            to="/jornada"
            className="mt-6 inline-block rounded-full bg-primary px-6 py-3 text-primary-foreground ring-1 ring-accent/50 transition-colors hover:bg-navy-soft"
          >
            Voltar para minha jornada
          </Link>
        </div>
      </main>
    );
  }

  const concluir = async () => {
    setConcluindo(true);
    await concluirDia.mutateAsync(numeroDoDia);
    setConcluindo(false);
    toast.success("Que a paz de Deus fique com você hoje.");
    if (numeroDoDia < TOTAL_DIAS) {
      navigate({ to: "/dia/$numero", params: { numero: String(proximoNumero) } });
    } else {
      navigate({ to: "/jornada" });
    }
  };

  return (
    <div className="min-h-screen">
      <header className="mx-auto max-w-3xl px-6 pt-10">
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <Link to="/jornada" className="hover:underline">
            ← Minha jornada
          </Link>
          <span>
            Dia {dia.numero} de {TOTAL_DIAS}
          </span>
        </div>

        <div className="mt-6 text-center">
          {area && <p className="text-xs uppercase tracking-[0.22em] text-accent">{area.nome}</p>}
          <h1 className="mt-2 text-3xl sm:text-4xl">{dia.titulo}</h1>
          <Ornamento className="my-6" />
        </div>
      </header>

      <main className="mx-auto max-w-3xl space-y-6 px-6 pb-24">
        <section className="paper rounded-2xl border border-border/70 p-6 shadow-[var(--shadow-card)] sm:p-7">
          <p className="text-xs uppercase tracking-[0.2em] text-accent">Palavra de Deus</p>
          <p className="mt-2 font-[family-name:var(--font-display)] text-xl leading-snug text-primary sm:text-2xl">
            "{dia.palavra}"
          </p>
          <p className="mt-2 text-sm text-muted-foreground">{dia.referencia}</p>
        </section>

        <PlayerOracao {...(dia.audioUrl ? { src: dia.audioUrl } : {})} titulo={dia.titulo} />

        <section className="paper rounded-2xl border border-border/70 p-6 shadow-[var(--shadow-card)] sm:p-7">
          <p className="text-xs uppercase tracking-[0.2em] text-accent">Propósito do dia</p>
          <p className="mt-2 text-lg text-foreground/90">{dia.proposito}</p>
        </section>

        <div className="grid gap-3 sm:grid-cols-2">
          <button
            type="button"
            disabled
            className="cursor-not-allowed rounded-xl border border-border/60 p-4 text-left opacity-60"
            title="Em breve disponível"
          >
            <p className="text-sm font-medium text-foreground/80">🎬 Vídeo do dia</p>
            <p className="mt-1 text-xs text-muted-foreground">Em breve disponível</p>
          </button>
          <button
            type="button"
            disabled
            className="cursor-not-allowed rounded-xl border border-border/60 p-4 text-left opacity-60"
            title="Em breve disponível"
          >
            <p className="text-sm font-medium text-foreground/80">🕊️ Testemunhos</p>
            <p className="mt-1 text-xs text-muted-foreground">Em breve disponível</p>
          </button>
        </div>

        <section className="paper rounded-2xl border border-accent/40 p-7 text-center shadow-[var(--shadow-sacred)]">
          <p className="text-xs uppercase tracking-[0.22em] text-accent">Para guardar no coração</p>
          <p className="script mt-3 text-3xl leading-snug text-primary sm:text-4xl">{dia.frase}</p>
        </section>

        <div className="pt-2 text-center">
          {jaConcluido ? (
            <Link
              to="/jornada"
              className="inline-flex items-center gap-2 rounded-full bg-secondary px-8 py-4 text-primary ring-1 ring-accent/40 transition-colors hover:bg-secondary/80"
            >
              <Cruz className="h-4 w-4 text-accent" />
              Voltar para minha jornada
            </Link>
          ) : (
            <button
              type="button"
              disabled={concluindo}
              onClick={concluir}
              className="inline-flex items-center gap-2 rounded-full bg-primary px-8 py-4 text-primary-foreground shadow-[var(--shadow-sacred)] ring-1 ring-accent/50 transition-colors hover:bg-navy-soft disabled:opacity-60"
            >
              <Cruz className="h-4 w-4 text-accent" />
              {concluindo ? "Um momento…" : "Concluí a oração de hoje"}
            </button>
          )}
        </div>
      </main>
    </div>
  );
}
