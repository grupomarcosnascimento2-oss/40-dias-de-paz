import { useEffect, useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useAuth, sair } from "@/hooks/useAuth";
import { useJornada, useLiberarAcesso, diaLiberado } from "@/hooks/useJornada";
import { areas, TOTAL_DIAS } from "@/lib/devocional";
import { Ornamento, Cruz } from "@/components/Ornamento";

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
  const { user, carregando } = useAuth();
  const navigate = useNavigate();
  const { data: jornada, isLoading } = useJornada(user?.id);
  const liberarAcesso = useLiberarAcesso(user?.id);
  const [processandoAcesso, setProcessandoAcesso] = useState(false);

  useEffect(() => {
    if (!carregando && !user) navigate({ to: "/entrar" });
  }, [carregando, user, navigate]);

  if (carregando || isLoading || !jornada) {
    return (
      <main className="flex min-h-screen items-center justify-center">
        <p className="text-muted-foreground">Preparando sua caminhada…</p>
      </main>
    );
  }

  const diasConcluidos = jornada.dias_concluidos ?? 0;
  const proximoDia = Math.min(diasConcluidos + 1, TOTAL_DIAS);

  if (!jornada.tem_acesso) {
    return (
      <main className="flex min-h-screen items-center justify-center px-6 py-16">
        <div className="paper w-full max-w-md rounded-2xl border border-accent/35 p-8 text-center shadow-[var(--shadow-sacred)] sm:p-10">
          <Cruz className="mx-auto h-5 w-5 text-accent" />
          <h1 className="mt-4 text-3xl">Sua conta está pronta</h1>
          <p className="mt-2 text-foreground/80">
            Falta apenas liberar seu acesso à jornada completa dos 40 dias.
          </p>
          <Ornamento className="my-7" />
          <button
            type="button"
            disabled={processandoAcesso}
            onClick={async () => {
              setProcessandoAcesso(true);
              await liberarAcesso.mutateAsync();
              setProcessandoAcesso(false);
            }}
            className="w-full rounded-full bg-primary px-6 py-3.5 text-primary-foreground ring-1 ring-accent/50 transition-colors hover:bg-navy-soft disabled:opacity-60"
          >
            {processandoAcesso ? "Liberando…" : "Liberar minha jornada de 40 dias"}
          </button>
          <p className="mt-5 text-xs text-muted-foreground">
            (Nesta fase do projeto, o acesso é liberado diretamente aqui. O fluxo de pagamento será
            conectado nesta mesma etapa.)
          </p>
        </div>
      </main>
    );
  }

  return (
    <div className="min-h-screen">
      <header className="mx-auto flex max-w-5xl items-center justify-between px-6 pt-10">
        <div>
          <p className="script text-2xl text-accent">Sua caminhada</p>
          <h1 className="text-2xl sm:text-3xl">40 Dias Rezando com Marcos Nascimento</h1>
        </div>
        <button
          type="button"
          onClick={async () => {
            await sair();
            navigate({ to: "/" });
          }}
          className="text-sm text-muted-foreground underline-offset-4 hover:underline"
        >
          Sair
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
