import { createFileRoute, Link } from "@tanstack/react-router";
import { useJornadaDev, diaLiberado } from "@/hooks/useJornadaDev";
import { areas, TOTAL_DIAS } from "@/lib/devocional";
import { Ornamento, Cruz } from "@/components/Ornamento";

// MODO DE DESENVOLVIMENTO — sem login e sem gate de pagamento, para agilizar
// as melhorias do app. Ver nota em src/hooks/useJornadaDev.ts.

export const Route = createFileRoute("/jornada")({
  head: () => ({
    meta: [
      { title: "Sua jornada — 40 Dias Rezando com Marcos Nascimento" },
      {
        name: "description",
        content: "Acompanhe sua caminhada de 40 dias de oração, um dia de cada vez.",
      },
    ],
  }),
  component: Jornada,
});

function Jornada() {
  const { diasConcluidos, carregado, reiniciarProgresso } = useJornadaDev();

  if (!carregado) {
    return (
      <main className="flex min-h-screen items-center justify-center">
        <p className="text-muted-foreground">Preparando sua caminhada…</p>
      </main>
    );
  }

  const proximoDia = Math.min(diasConcluidos + 1, TOTAL_DIAS);

  return (
    <div className="min-h-screen">
      <header className="mx-auto flex max-w-5xl items-center justify-between px-6 pt-10">
        <div>
          <p className="script text-2xl text-accent">Sua caminhada</p>
          <h1 className="text-2xl sm:text-3xl">40 Dias Rezando com Marcos Nascimento</h1>
        </div>
        <button
          type="button"
          onClick={reiniciarProgresso}
          className="text-sm text-muted-foreground underline-offset-4 hover:underline"
        >
          Reiniciar progresso (dev)
        </button>
      </header>

      <section className="mx-auto max-w-5xl px-6 pt-8">
        <div className="paper rounded-2xl border border-accent/35 p-6 shadow-[var(--shadow-card)] sm:p-7">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="text-foreground/85">
              Você concluiu{" "}
              <span className="font-semibold text-primary">
                {diasConcluidos} de {TOTAL_DIAS}
              </span>{" "}
              dias.
            </p>
            {diasConcluidos < TOTAL_DIAS && (
              <Link
                to="/dia/$numero"
                params={{ numero: String(proximoDia) }}
                className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm text-primary-foreground ring-1 ring-accent/50 transition-colors hover:bg-navy-soft"
              >
                <Cruz className="h-3.5 w-3.5 text-accent" />
                {diasConcluidos === 0 ? "Começar o Dia 1" : `Continuar — Dia ${proximoDia}`}
              </Link>
            )}
          </div>
          <div className="mt-4 h-2 w-full overflow-hidden rounded-full bg-secondary">
            <div
              className="h-full rounded-full bg-accent transition-all"
              style={{ width: `${(diasConcluidos / TOTAL_DIAS) * 100}%` }}
            />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 py-12">
        <Ornamento className="mb-10" />
        <div className="space-y-10">
          {areas.map((area, areaIndex) => (
            <div key={area.nome}>
              <p className="text-xs uppercase tracking-[0.22em] text-accent">
                Dias {areaIndex * 5 + 1}–{areaIndex * 5 + 5}
              </p>
              <h2 className="mt-1 text-2xl">{area.nome}</h2>
              <p className="mt-1 text-sm text-muted-foreground">{area.descricao}</p>

              <ul className="mt-5 grid gap-3 sm:grid-cols-5">
                {area.dias.map((dia) => {
                  const concluido = dia.numero <= diasConcluidos;
                  const liberado = diaLiberado(dia.numero, diasConcluidos);
                  const conteudo = (
                    <>
                      <p className="text-xs uppercase tracking-[0.18em] text-accent/90">
                        Dia {dia.numero}
                      </p>
                      <p className="mt-1 text-sm leading-snug text-foreground/90">{dia.titulo}</p>
                      <p className="mt-3 text-xs font-medium text-muted-foreground">
                        {concluido ? "Concluído" : liberado ? "Disponível" : "Em breve"}
                      </p>
                    </>
                  );

                  return liberado ? (
                    <Link
                      key={dia.numero}
                      to="/dia/$numero"
                      params={{ numero: String(dia.numero) }}
                      className={`paper rounded-xl border p-4 shadow-[var(--shadow-card)] transition-colors hover:bg-secondary/60 ${
                        concluido ? "border-accent/60" : "border-border/70"
                      }`}
                    >
                      {conteudo}
                    </Link>
                  ) : (
                    <div
                      key={dia.numero}
                      className="rounded-xl border border-border/50 p-4 opacity-50"
                      aria-disabled="true"
                    >
                      {conteudo}
                    </div>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <footer className="border-t border-border/60 py-8 text-center text-sm text-muted-foreground">
        <Cruz className="mx-auto mb-3 h-3.5 w-3.5 text-accent" />
        <p>Que a paz de Deus esteja com você.</p>
      </footer>
    </div>
  );
}
