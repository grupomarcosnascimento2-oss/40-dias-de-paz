import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { Cruz } from "@/components/Ornamento";

// Dashboard do administrador — placeholder. Item de menu chamado
// "Dashboard" (renomeado de "Painel administrativo"), sempre em primeiro
// no menu do administrador. Só fica acessível de verdade quando
// CONTROLE_DE_PERFIL_HABILITADO (src/lib/perfis.ts) estiver ligado e o
// usuário logado tiver papel "administrador".

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [{ title: "Dashboard — 40 Dias Rezando com Marcos Nascimento" }],
  }),
  component: Admin,
});

function Admin() {
  return (
    <AppShell>
      <section className="mx-auto max-w-3xl px-6 py-16 text-center">
        <Cruz className="mx-auto h-6 w-6 text-accent" />
        <h1 className="script mt-4 text-3xl text-primary">Dashboard</h1>
        <p className="mx-auto mt-3 max-w-md text-foreground/75">
          Este espaço ainda está sendo construído. Em breve, você vai encontrar aqui as ferramentas
          para gerenciar conteúdo, menus e recursos do devocional.
        </p>
      </section>
    </AppShell>
  );
}
