import { useEffect } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { useAuth } from "@/hooks/useAuth";
import { usePerfil } from "@/hooks/usePerfil";
import { useContagemPorPapel, useAberturasHoje } from "@/hooks/useMetricasAdmin";
import {
  useContagemPresencaAoVivo,
  useContagemPresencaTotal,
} from "@/hooks/usePresencaGlobal";
import { Users } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { GerenciarAvisos } from "@/components/GerenciarAvisos";
import { PedidosPendentes } from "@/components/PedidosPendentes";
import { Cruz } from "@/components/Ornamento";
import { sombra3d } from "@/lib/estilo3d";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";

// Dashboard do administrador. Protegido de verdade: exige login E papel
// "administrador" — quem não for admin é redirecionado (não basta o
// item de menu estar escondido, a rota em si também precisa proteger).

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [{ title: "Dashboard — 40 Dias Rezando com Marcos Nascimento" }],
  }),
  component: Admin,
});

function Admin() {
  const { user, carregando: carregandoAuth } = useAuth();
  const { data: perfil, isLoading: carregandoPerfil } = usePerfil(user?.id);
  const navigate = useNavigate();

  const souAdministrador = perfil?.papel === "administrador";
  const carregando = carregandoAuth || carregandoPerfil;

  useEffect(() => {
    if (carregando) return;
    if (!user) {
      navigate({ to: "/entrar", replace: true });
      return;
    }
    if (!souAdministrador) {
      navigate({ to: "/jornada", replace: true });
    }
  }, [carregando, user, souAdministrador, navigate]);

  const { data: quantidadeAdministradores } = useContagemPorPapel(
    "administrador",
    souAdministrador,
  );
  const { data: quantidadeMembros, isLoading: carregandoMembros } = useContagemPorPapel(
    "membro",
    souAdministrador,
  );
  const { data: quantidadeVisitantes } = useContagemPorPapel("visitante", souAdministrador);
  const membrosSimultaneos = useContagemPresencaAoVivo(souAdministrador);
  const pessoasConectadas = useContagemPresencaTotal(souAdministrador);
  const { data: acessosHoje } = useAberturasHoje(souAdministrador);

  const dadosGrafico = [
    { papel: "Administrador", quantidade: quantidadeAdministradores ?? 0 },
    { papel: "Membros", quantidade: quantidadeMembros ?? 0 },
    { papel: "Visitantes", quantidade: quantidadeVisitantes ?? 0 },
  ];

  const configuracaoGrafico = {
    quantidade: { label: "Pessoas", color: "var(--accent)" },
  } satisfies ChartConfig;

  if (carregando || !user || !souAdministrador) {
    return (
      <main className="flex min-h-screen items-center justify-center">
        <p className="text-muted-foreground">Preparando o dashboard…</p>
      </main>
    );
  }

  return (
    <AppShell>
      <div className="mx-auto max-w-5xl px-6 py-12">
        <div className="text-center md:text-left">
          <Cruz className="mx-auto h-6 w-6 text-accent md:mx-0" />
          <h1 className="script mt-4 text-3xl text-primary">Dashboard</h1>
          <p className="mt-2 text-foreground/75">
            Visão geral do devocional — informações estratégicas e de gestão.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-[1fr_320px]">
          {/* Conteúdo principal — ferramentas de gestão */}
          <section className="space-y-6">
            <PedidosPendentes />
            <GerenciarAvisos />
          </section>

          {/* Painel lateral — informações estratégicas e gerenciais */}
          <aside className="space-y-4">
            <h2 className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
              Visão geral
            </h2>

            <div className="rounded-2xl border border-accent/30 bg-card p-5" style={sombra3d}>
              <p className="text-xs uppercase tracking-wide text-muted-foreground">
                Quantidade de membros
              </p>
              <p className="mt-1 text-3xl font-semibold text-primary">
                {carregandoMembros ? "…" : quantidadeMembros}
              </p>
            </div>

            <div className="rounded-2xl border border-accent/30 bg-card p-5" style={sombra3d}>
              <div className="flex items-center gap-1.5">
                <Users className="h-4 w-4 text-accent" aria-hidden="true" />
                <p className="text-xs uppercase tracking-wide text-muted-foreground">
                  Pessoas conectadas agora
                </p>
              </div>
              <p className="mt-1 text-3xl font-semibold text-primary">
                {pessoasConectadas ?? "…"}
              </p>
            </div>

            <div className="rounded-2xl border border-accent/30 bg-card p-5" style={sombra3d}>
              <div className="flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                <p className="text-xs uppercase tracking-wide text-muted-foreground">
                  Membros simultâneos agora
                </p>
              </div>
              <p className="mt-1 text-3xl font-semibold text-primary">
                {membrosSimultaneos ?? "…"}
              </p>
            </div>

            <div className="rounded-2xl border border-accent/30 bg-card p-5" style={sombra3d}>
              <p className="text-xs uppercase tracking-wide text-muted-foreground">
                Vezes que o app foi aberto hoje
              </p>
              <p className="mt-1 text-3xl font-semibold text-primary">{acessosHoje ?? "…"}</p>
            </div>

            <div className="rounded-2xl border border-accent/30 bg-card p-5" style={sombra3d}>
              <p className="text-xs uppercase tracking-wide text-muted-foreground">
                Pessoas por perfil
              </p>
              <ChartContainer config={configuracaoGrafico} className="mt-3 h-40 w-full">
                <BarChart data={dadosGrafico} layout="vertical" margin={{ left: 0 }}>
                  <CartesianGrid horizontal={false} stroke="var(--border)" />
                  <XAxis type="number" hide />
                  <YAxis
                    type="category"
                    dataKey="papel"
                    tickLine={false}
                    axisLine={false}
                    width={90}
                    fontSize={12}
                  />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="quantidade" fill="var(--color-quantidade)" radius={6} />
                </BarChart>
              </ChartContainer>
            </div>
          </aside>
        </div>
      </div>
    </AppShell>
  );
}
