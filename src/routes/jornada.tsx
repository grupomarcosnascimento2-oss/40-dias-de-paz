import * as AccordionPrimitive from "@radix-ui/react-accordion";
import * as TabsPrimitive from "@radix-ui/react-tabs";
import { ChevronDown, Lock } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useAuth } from "@/hooks/useAuth";
import { usePerfil, useIncrementarAcessoDevocional } from "@/hooks/usePerfil";
import { usePedidosNaoVistos } from "@/hooks/usePedidosNaoVistos";
import { CONTROLE_DE_PERFIL_HABILITADO } from "@/lib/perfis";
import { useJornada, diaLiberado } from "@/hooks/useJornada";
import { areas, TOTAL_DIAS } from "@/lib/devocional";
import { sombra3d, sombra3dAberto } from "@/lib/estilo3d";
import { AppShell } from "@/components/AppShell";
import { AtalhosRapidos } from "@/components/AtalhosRapidos";
import { TVOracional } from "@/components/TVOracional";
import { MuralPedidosOracao } from "@/components/MuralPedidosOracao";
import { Cruz } from "@/components/Ornamento";

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

function AnelProgresso({ concluidos, total }: { concluidos: number; total: number }) {
  const pct = total > 0 ? (concluidos / total) * 100 : 0;
  return (
    <div
      className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-full"
      style={{
        background: `conic-gradient(var(--gold) ${pct}%, color-mix(in oklab, var(--navy) 12%, transparent) ${pct}%)`,
        boxShadow:
          "0 3px 8px -3px color-mix(in oklab, var(--navy) 45%, transparent), inset 0 1px 1px 0 color-mix(in oklab, white 40%, transparent)",
      }}
    >
      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-card text-xs font-semibold text-primary shadow-inner">
        {concluidos}/{total}
      </div>
    </div>
  );
}

function Jornada() {
  const { user, carregando: carregandoAuth } = useAuth();
  const navigate = useNavigate();
  const { data: jornada, isLoading: carregandoJornada } = useJornada(user?.id);
  const {
    data: perfil,
    isLoading: carregandoPerfil,
    isError: erroPerfil,
  } = usePerfil(CONTROLE_DE_PERFIL_HABILITADO ? user?.id : undefined);
  const incrementarAcesso = useIncrementarAcessoDevocional();
  const [abaExternaEscolhida, setAbaExternaEscolhida] = useState<string | null>(null);
  const [abaInterna, setAbaInterna] = useState("caminhada");
  const { naoVistos: pedidosNaoVistos, marcarComoVisto: marcarPedidosComoVistos } =
    usePedidosNaoVistos(user?.id);
  const jaIncrementouRef = useRef(false);

  useEffect(() => {
    if (!carregandoAuth && !user) navigate({ to: "/entrar", replace: true });
  }, [carregandoAuth, user, navigate]);

  const carregandoTudo =
    carregandoAuth ||
    !user ||
    carregandoJornada ||
    (CONTROLE_DE_PERFIL_HABILITADO && carregandoPerfil);

  const souVisitante = CONTROLE_DE_PERFIL_HABILITADO && perfil?.papel === "visitante";
  const acessosDevocional = perfil?.acessos_devocional ?? 0;

  // A partir da 2ª visita à aba Devocional, o visitante fica bloqueado
  // e sempre vê o convite para virar membro em vez do conteúdo. A
  // checagem usa o valor já salvo (antes de incrementar): 0 = primeira
  // visita, permitida; 1 ou mais = visita seguinte, bloqueada.
  const bloqueadoPorAcessos = souVisitante && acessosDevocional >= 1;

  // Visitante cai direto em "Jornada de Oração"; membro/administrador
  // caem em "Devocional", como sempre. Depois que a pessoa troca de aba
  // manualmente, essa escolha prevalece.
  const abaExterna = abaExternaEscolhida ?? (souVisitante ? "jornadaOracao" : "quarentaDias");

  // Registra a primeira visita do visitante à aba Devocional, uma única
  // vez por sessão — assim, na próxima vez que ele entrar (mesmo dias
  // depois), acessosDevocional já vem >= 1 e ele é bloqueado de cara.
  useEffect(() => {
    if (carregandoTudo || !user) return;
    if (!souVisitante || bloqueadoPorAcessos) return;
    if (abaExterna !== "quarentaDias") return;
    if (jaIncrementouRef.current) return;
    jaIncrementouRef.current = true;
    void incrementarAcesso(user.id, acessosDevocional);
  }, [
    carregandoTudo,
    souVisitante,
    bloqueadoPorAcessos,
    abaExterna,
    user,
    acessosDevocional,
    incrementarAcesso,
  ]);

  const jaMarcouPedidosVistosRef = useRef(false);
  useEffect(() => {
    if (abaInterna === "comunidade") {
      if (!jaMarcouPedidosVistosRef.current) {
        jaMarcouPedidosVistosRef.current = true;
        marcarPedidosComoVistos();
      }
    } else {
      jaMarcouPedidosVistosRef.current = false;
    }
  }, [abaInterna, marcarPedidosComoVistos]);

  if (erroPerfil) {
    return (
      <main className="flex min-h-screen items-center justify-center px-6 text-center">
        <div>
          <p className="text-foreground/80">
            Não conseguimos carregar sua conta agora. Isso costuma ser passageiro.
          </p>
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="mt-4 rounded-full bg-primary px-6 py-3 text-primary-foreground ring-1 ring-accent/50 transition-colors hover:bg-navy-soft"
          >
            Tentar de novo
          </button>
        </div>
      </main>
    );
  }

  if (carregandoTudo) {
    return (
      <main className="flex min-h-screen items-center justify-center">
        <p className="text-muted-foreground">Preparando sua caminhada…</p>
      </main>
    );
  }

  const diasConcluidos = jornada?.dias_concluidos ?? 0;

  const proximoDia = Math.min(diasConcluidos + 1, TOTAL_DIAS);
  const areaDoProximoDia = Math.ceil(proximoDia / 5) - 1;

  return (
    <AppShell>
      <div className="min-h-screen">
        <TabsPrimitive.Root value={abaExterna} onValueChange={setAbaExternaEscolhida}>
          <TabsPrimitive.List className="mx-auto flex max-w-3xl items-end gap-1.5 overflow-x-auto border-b border-accent/25 px-6 pt-6">
            <TabsPrimitive.Trigger
              value="quarentaDias"
              className="script relative -mb-px shrink-0 translate-y-0.5 rounded-t-2xl border border-b-0 border-transparent bg-secondary/50 px-5 py-2.5 text-xl text-black shadow-[inset_0_-2px_5px_0_rgba(31,42,82,0.08)] transition-all data-[state=active]:z-10 data-[state=active]:-translate-y-0.5 data-[state=active]:border-accent/40 data-[state=active]:bg-card data-[state=active]:shadow-[0_-10px_22px_-14px_rgba(31,42,82,0.55),inset_0_1px_0_0_rgba(255,255,255,0.6),0_1px_0_0_rgba(184,137,43,0.35)]"
            >
              Devocional
            </TabsPrimitive.Trigger>
            <TabsPrimitive.Trigger
              value="jornadaOracao"
              className="script relative -mb-px shrink-0 translate-y-0.5 rounded-t-2xl border border-b-0 border-transparent bg-secondary/50 px-5 py-2.5 text-xl text-black shadow-[inset_0_-2px_5px_0_rgba(31,42,82,0.08)] transition-all data-[state=active]:z-10 data-[state=active]:-translate-y-0.5 data-[state=active]:border-accent/40 data-[state=active]:bg-card data-[state=active]:shadow-[0_-10px_22px_-14px_rgba(31,42,82,0.55),inset_0_1px_0_0_rgba(255,255,255,0.6),0_1px_0_0_rgba(184,137,43,0.35)]"
            >
              Jornada de Oração
            </TabsPrimitive.Trigger>
          </TabsPrimitive.List>

          <TabsPrimitive.Content value="quarentaDias">
            {bloqueadoPorAcessos ? (
              <section className="mx-auto max-w-md px-6 py-20 text-center">
                <Lock className="mx-auto h-6 w-6 text-accent" />
                <h1 className="script mt-4 text-3xl text-primary">Quero ser membro</h1>
                <p className="mx-auto mt-3 max-w-md text-foreground/75">
                  Você já experimentou o Dia 1 da nossa jornada. Para continuar com acesso completo
                  aos 40 dias, à TV Oracional e à comunidade, torne-se membro.
                </p>
                <a
                  href="https://rezandocomesperanca40dias.lovable.app/"
                  className="mt-6 inline-block rounded-full bg-primary px-6 py-3 text-primary-foreground ring-1 ring-accent/50 transition-colors hover:bg-navy-soft"
                >
                  Quero ser membro
                </a>
              </section>
            ) : (
              <>
                <TVOracional />

                <TabsPrimitive.Root
                  value={abaInterna}
                  onValueChange={setAbaInterna}
                  className="mt-6"
                >
                  <TabsPrimitive.List className="mx-auto flex max-w-3xl items-end gap-1.5 overflow-x-auto border-b border-accent/25 px-6">
                    <TabsPrimitive.Trigger
                      value="caminhada"
                      className="script relative -mb-px shrink-0 translate-y-0.5 rounded-t-2xl border border-b-0 border-transparent bg-secondary/50 px-5 py-2.5 text-xl text-black shadow-[inset_0_-2px_5px_0_rgba(31,42,82,0.08)] transition-all data-[state=active]:z-10 data-[state=active]:-translate-y-0.5 data-[state=active]:border-accent/40 data-[state=active]:bg-card data-[state=active]:shadow-[0_-10px_22px_-14px_rgba(31,42,82,0.55),inset_0_1px_0_0_rgba(255,255,255,0.6),0_1px_0_0_rgba(184,137,43,0.35)]"
                    >
                      40 Dias de Oração
                    </TabsPrimitive.Trigger>
                    <TabsPrimitive.Trigger
                      value="comunidade"
                      className="script relative -mb-px shrink-0 translate-y-0.5 rounded-t-2xl border border-b-0 border-transparent bg-secondary/50 px-5 py-2.5 text-xl text-black shadow-[inset_0_-2px_5px_0_rgba(31,42,82,0.08)] transition-all data-[state=active]:z-10 data-[state=active]:-translate-y-0.5 data-[state=active]:border-accent/40 data-[state=active]:bg-card data-[state=active]:shadow-[0_-10px_22px_-14px_rgba(31,42,82,0.55),inset_0_1px_0_0_rgba(255,255,255,0.6),0_1px_0_0_rgba(184,137,43,0.35)]"
                    >
                      Pedidos de Oração
                      {pedidosNaoVistos > 0 && !souVisitante && (
                        <span className="absolute -right-1.5 top-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-red-600 px-1 text-xs font-bold text-white ring-2 ring-background">
                          {pedidosNaoVistos > 99 ? "99+" : pedidosNaoVistos}
                        </span>
                      )}
                    </TabsPrimitive.Trigger>
                    <TabsPrimitive.Trigger
                      value="agenda"
                      className="script relative -mb-px shrink-0 translate-y-0.5 rounded-t-2xl border border-b-0 border-transparent bg-secondary/50 px-5 py-2.5 text-xl text-black shadow-[inset_0_-2px_5px_0_rgba(31,42,82,0.08)] transition-all data-[state=active]:z-10 data-[state=active]:-translate-y-0.5 data-[state=active]:border-accent/40 data-[state=active]:bg-card data-[state=active]:shadow-[0_-10px_22px_-14px_rgba(31,42,82,0.55),inset_0_1px_0_0_rgba(255,255,255,0.6),0_1px_0_0_rgba(184,137,43,0.35)]"
                    >
                      Agenda de eventos
                    </TabsPrimitive.Trigger>
                  </TabsPrimitive.List>

                  <TabsPrimitive.List className="mx-auto mt-2 flex max-w-3xl items-end gap-1.5 overflow-x-auto border-b border-accent/25 px-6">
                    <TabsPrimitive.Trigger
                      value="acompanhamento"
                      className="script relative -mb-px shrink-0 translate-y-0.5 rounded-t-2xl border border-b-0 border-transparent bg-secondary/50 px-5 py-2.5 text-xl text-black shadow-[inset_0_-2px_5px_0_rgba(31,42,82,0.08)] transition-all data-[state=active]:z-10 data-[state=active]:-translate-y-0.5 data-[state=active]:border-accent/40 data-[state=active]:bg-card data-[state=active]:shadow-[0_-10px_22px_-14px_rgba(31,42,82,0.55),inset_0_1px_0_0_rgba(255,255,255,0.6),0_1px_0_0_rgba(184,137,43,0.35)]"
                    >
                      Acompanhamento espiritual
                    </TabsPrimitive.Trigger>
                    <TabsPrimitive.Trigger
                      value="testemunhos"
                      className="script relative -mb-px shrink-0 translate-y-0.5 rounded-t-2xl border border-b-0 border-transparent bg-secondary/50 px-5 py-2.5 text-xl text-black shadow-[inset_0_-2px_5px_0_rgba(31,42,82,0.08)] transition-all data-[state=active]:z-10 data-[state=active]:-translate-y-0.5 data-[state=active]:border-accent/40 data-[state=active]:bg-card data-[state=active]:shadow-[0_-10px_22px_-14px_rgba(31,42,82,0.55),inset_0_1px_0_0_rgba(255,255,255,0.6),0_1px_0_0_rgba(184,137,43,0.35)]"
                    >
                      Testemunhos
                    </TabsPrimitive.Trigger>
                  </TabsPrimitive.List>

                  <TabsPrimitive.Content value="caminhada">
                    <AtalhosRapidos />

                    <header className="mx-auto flex max-w-3xl items-center justify-between px-6 pt-6">
                      <div>
                        <h1 className="text-2xl sm:text-3xl">
                          40 Dias Rezando com Marcos Nascimento
                        </h1>
                      </div>
                    </header>

                    {souVisitante && (
                      <section className="mx-auto max-w-3xl px-6 pt-6">
                        <div
                          className="rounded-2xl border border-accent/40 bg-accent/10 p-4 text-center sm:p-5"
                          style={sombra3d}
                        >
                          <p className="text-sm text-foreground/85">
                            Você está experimentando o <strong>Dia 1</strong> como visitante.
                            Torne-se membro para desbloquear os 40 dias completos.
                          </p>
                        </div>
                      </section>
                    )}

                    <section className="mx-auto max-w-3xl px-6 pt-8">
                      <div
                        className="rounded-3xl border border-accent/30 bg-gradient-to-b from-card to-secondary/50 p-6 sm:p-7"
                        style={sombra3d}
                      >
                        <div className="flex flex-wrap items-center justify-between gap-4">
                          <div className="flex items-center gap-4">
                            <AnelProgresso concluidos={diasConcluidos} total={TOTAL_DIAS} />
                            <p className="text-foreground/85">
                              Você concluiu{" "}
                              <span className="font-semibold text-primary">
                                {diasConcluidos} de {TOTAL_DIAS}
                              </span>{" "}
                              dias.
                            </p>
                          </div>
                          {diasConcluidos < TOTAL_DIAS && (
                            <Link
                              to="/dia/$numero"
                              params={{ numero: String(proximoDia) }}
                              className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm text-primary-foreground ring-1 ring-accent/50 transition-transform hover:-translate-y-0.5 hover:bg-navy-soft"
                              style={{
                                boxShadow:
                                  "0 10px 20px -8px color-mix(in oklab, var(--navy) 55%, transparent)",
                              }}
                            >
                              <Cruz className="h-3.5 w-3.5 text-accent" />
                              {diasConcluidos === 0
                                ? "Começar o Dia 1"
                                : `Continuar — Dia ${proximoDia}`}
                            </Link>
                          )}
                        </div>
                      </div>
                    </section>

                    <section className="mx-auto max-w-3xl px-6 pb-12 pt-4">
                      <AccordionPrimitive.Root
                        type="multiple"
                        defaultValue={[
                          areas[Math.max(areaDoProximoDia, 0)]?.nome ?? areas[0]?.nome ?? "",
                        ]}
                        className="space-y-4"
                      >
                        {areas.map((area, areaIndex) => {
                          const inicio = areaIndex * 5 + 1;
                          const fim = areaIndex * 5 + 5;
                          const concluidosNaArea = area.dias.filter(
                            (d) => d.numero <= diasConcluidos,
                          ).length;

                          return (
                            <AccordionPrimitive.Item
                              key={area.nome}
                              value={area.nome}
                              className="group overflow-hidden rounded-2xl border border-accent/25 bg-gradient-to-b from-card to-secondary/40 transition-all data-[state=open]:from-card data-[state=open]:to-card"
                              style={sombra3d}
                            >
                              <AccordionPrimitive.Header>
                                <AccordionPrimitive.Trigger className="flex w-full items-center gap-4 px-5 py-4 text-left transition-transform hover:-translate-y-0.5 sm:px-6 sm:py-5">
                                  <AnelProgresso concluidos={concluidosNaArea} total={5} />

                                  <div className="min-w-0 flex-1">
                                    <p className="text-xs uppercase tracking-[0.2em] text-accent">
                                      Área {areaIndex + 1} · Dias {inicio}–{fim}
                                    </p>
                                    <h2 className="mt-0.5 truncate text-xl text-primary sm:text-2xl">
                                      {area.nome}
                                    </h2>
                                    <p className="mt-0.5 truncate text-sm text-muted-foreground group-data-[state=open]:hidden">
                                      {area.descricao}
                                    </p>
                                  </div>

                                  <ChevronDown
                                    className="h-5 w-5 shrink-0 text-accent transition-transform duration-300 group-data-[state=open]:rotate-180"
                                    aria-hidden="true"
                                  />
                                </AccordionPrimitive.Trigger>
                              </AccordionPrimitive.Header>

                              <AccordionPrimitive.Content className="overflow-hidden data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
                                <div
                                  className="border-t border-accent/20 px-5 pb-5 pt-4 sm:px-6 sm:pb-6"
                                  style={sombra3dAberto}
                                >
                                  <p className="mb-4 text-sm text-muted-foreground">
                                    {area.descricao}
                                  </p>
                                  <ul className="grid gap-3 sm:grid-cols-5">
                                    {area.dias.map((dia) => {
                                      const concluido = dia.numero <= diasConcluidos;
                                      const liberadoPorProgresso = diaLiberado(
                                        dia.numero,
                                        diasConcluidos,
                                      );
                                      const liberado =
                                        liberadoPorProgresso && (!souVisitante || dia.numero === 1);
                                      const conteudo = (
                                        <>
                                          <p className="text-xs uppercase tracking-[0.18em] text-accent/90">
                                            Dia {dia.numero}
                                          </p>
                                          <p className="mt-1 text-sm leading-snug text-foreground/90">
                                            {dia.titulo}
                                          </p>
                                          <p className="mt-3 flex items-center gap-1 text-xs font-medium text-muted-foreground">
                                            {souVisitante && !liberado && (
                                              <Lock className="h-3 w-3" />
                                            )}
                                            {concluido
                                              ? "Concluído"
                                              : liberado
                                                ? "Disponível"
                                                : souVisitante
                                                  ? "Só para membros"
                                                  : "Em breve"}
                                          </p>
                                        </>
                                      );

                                      return liberado ? (
                                        <Link
                                          key={dia.numero}
                                          to="/dia/$numero"
                                          params={{ numero: String(dia.numero) }}
                                          className={`rounded-xl border p-4 transition-transform hover:-translate-y-0.5 ${
                                            concluido
                                              ? "border-accent/60 bg-secondary/60"
                                              : "border-border/70 bg-card"
                                          }`}
                                          style={sombra3d}
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
                              </AccordionPrimitive.Content>
                            </AccordionPrimitive.Item>
                          );
                        })}
                      </AccordionPrimitive.Root>
                    </section>

                    <footer className="border-t border-border/60 py-8 text-center text-sm text-muted-foreground">
                      <Cruz className="mx-auto mb-3 h-3.5 w-3.5 text-accent" />
                      <p>Que a paz de Deus esteja com você.</p>
                    </footer>
                  </TabsPrimitive.Content>

                  <TabsPrimitive.Content value="comunidade">
                    {souVisitante ? (
                      <section className="mx-auto max-w-3xl px-6 py-16 text-center">
                        <Lock className="mx-auto h-6 w-6 text-accent" />
                        <h2 className="script mt-4 text-3xl text-primary">Pedidos de Oração</h2>
                        <p className="mx-auto mt-3 max-w-md text-foreground/75">
                          Esse espaço é exclusivo para membros. Torne-se membro para publicar e
                          acompanhar os pedidos de oração da comunidade.
                        </p>
                      </section>
                    ) : (
                      <MuralPedidosOracao />
                    )}
                  </TabsPrimitive.Content>

                  <TabsPrimitive.Content value="acompanhamento">
                    <section className="mx-auto max-w-3xl px-6 py-16 text-center">
                      <Cruz className="mx-auto h-6 w-6 text-accent" />
                      <h2 className="script mt-4 text-3xl text-primary">
                        Acompanhamento espiritual
                      </h2>
                      <p className="mx-auto mt-3 max-w-md text-foreground/75">
                        Em breve, você vai poder agendar aqui um encontro individual em vídeochamada
                        com <span className="font-semibold text-red-400">Marcos Nascimento</span>,
                        para um acompanhamento espiritual mais próximo e pessoal. Estamos preparando
                        esse espaço com todo cuidado — fique de olho.
                      </p>
                    </section>
                  </TabsPrimitive.Content>

                  <TabsPrimitive.Content value="agenda">
                    <section className="mx-auto max-w-3xl px-6 py-16 text-center">
                      <Cruz className="mx-auto h-6 w-6 text-accent" />
                      <h2 className="script mt-4 text-3xl text-primary">Agenda de eventos</h2>
                      <p className="mx-auto mt-3 max-w-md text-foreground/75">
                        Este espaço ainda está sendo construído. Em breve, você vai encontrar aqui a
                        agenda de eventos.
                      </p>
                    </section>
                  </TabsPrimitive.Content>

                  <TabsPrimitive.Content value="testemunhos">
                    <section className="mx-auto max-w-3xl px-6 py-16 text-center">
                      <Cruz className="mx-auto h-6 w-6 text-accent" />
                      <h2 className="script mt-4 text-3xl text-primary">Testemunhos</h2>
                      <p className="mx-auto mt-3 max-w-md text-foreground/75">
                        Este espaço ainda está sendo construído. Em breve, você vai encontrar aqui
                        testemunhos de pessoas que viveram essa jornada.
                      </p>
                    </section>
                  </TabsPrimitive.Content>
                </TabsPrimitive.Root>
              </>
            )}
          </TabsPrimitive.Content>

          <TabsPrimitive.Content value="jornadaOracao">
            <TVOracional />

            <section className="mx-auto max-w-3xl px-6 pb-2 pt-4 text-center">
              <p className="mx-auto max-w-md text-foreground/75">
                A Jornada de Oração é um movimento de intercessão pelas pessoas. Deixe aqui o seu
                pedido de oração — nossa equipe estará intercedendo por você.
              </p>
            </section>

            <MuralPedidosOracao />
          </TabsPrimitive.Content>
        </TabsPrimitive.Root>
      </div>
    </AppShell>
  );
}
