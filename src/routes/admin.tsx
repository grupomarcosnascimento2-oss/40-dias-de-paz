import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { Cruz } from "@/components/Ornamento";

// Painel administrativo — placeholder. Só fica acessível de verdade
// quando CONTROLE_DE_PERFIL_HABILITADO (src/lib/perfis.ts) for ligado e
// o item de menu correspondente passar a aparecer para o administrador.

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [{ title: "Painel administrativo — 40 Dias Rezando com Marcos Nascimento" }],
  }),
  component: Admin,
});

function Admin() {
  return (
    <AppShell>
      <section className="mx-auto max-w-3xl px-6 py-16 text-center">
        <Cruz className="mx-auto h-6 w-6 text-accent" />
        <h1 className="script mt-4 text-3xl text-primary">Painel administrativo</h1>
        <p className="mx-auto mt-3 max-w-md text-foreground/75">
          Este espaço ainda está sendo construído. Em breve, você vai encontrar aqui as ferramentas
          para gerenciar conteúdo, menus e recursos do devocional.
        </p>
      </section>
    </AppShell>
  );
}
