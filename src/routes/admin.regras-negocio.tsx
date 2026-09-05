import { createFileRoute } from "@tanstack/react-router";
import { PaginaAdminPlaceholder } from "@/components/PaginaAdminPlaceholder";

export const Route = createFileRoute("/admin/regras-negocio")({
  head: () => ({
    meta: [{ title: "Regras de Negócio — 40 Dias Rezando com Marcos Nascimento" }],
  }),
  component: () => (
    <PaginaAdminPlaceholder
      titulo="Regras de Negócio"
      descricao="Este espaço ainda está sendo construído. Em breve, você vai poder configurar aqui as regras de negócio do devocional."
    />
  ),
});
