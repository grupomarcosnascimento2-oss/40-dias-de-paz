import { createFileRoute } from "@tanstack/react-router";
import { PaginaAdminPlaceholder } from "@/components/PaginaAdminPlaceholder";

export const Route = createFileRoute("/admin/controle")({
  head: () => ({
    meta: [{ title: "Controle — 40 Dias Rezando com Marcos Nascimento" }],
  }),
  component: () => (
    <PaginaAdminPlaceholder
      titulo="Controle"
      descricao="Este espaço ainda está sendo construído. Em breve, você vai encontrar aqui as ferramentas de controle do devocional."
    />
  ),
});
