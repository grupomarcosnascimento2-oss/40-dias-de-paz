import { useEffect } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useAuth } from "@/hooks/useAuth";
import { usePerfil } from "@/hooks/usePerfil";
import { useContagemPorPapel } from "@/hooks/useMetricasAdmin";
import { AppShell } from "@/components/AppShell";
import { Cruz } from "@/components/Ornamento";
import { sombra3d } from "@/lib/estilo3d";

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

  const { data: quantidadeMembros, isLoading: carregandoMembros } = useContagemPorPapel(
    "membro",
    souAdministrador,
  );

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
          {/* Conteúdo principal — espaço para futuras ferramentas de gestão */}
          <section
            className="rounded-2xl border border-accent/30 bg-card p-6 text-foreground/75"
            style={sombra3d}
          >
            <p>
              Este espaço vai reunir, aos poucos, as ferramentas para gerenciar conteúdo, menus e
              recursos do devocional.
            </p>
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
          </aside>
        </div>
      </div>
    </AppShell>
  );
}
