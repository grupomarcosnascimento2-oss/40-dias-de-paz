import { createFileRoute } from "@tanstack/react-router";
import { PaginaAdminPlaceholder } from "@/components/PaginaAdminPlaceholder";

export const Route = createFileRoute("/admin/cadastros")({
  head: () => ({
    meta: [{ title: "Cadastros — 40 Dias Rezando com Marcos Nascimento" }],
  }),
  component: () => (
    <PaginaAdminPlaceholder
      titulo="Cadastros"
      descricao="Este espaço ainda está sendo construído. Em breve, você vai poder gerenciar aqui os cadastros do devocional."
    />
  ),
});
