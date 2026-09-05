import { createFileRoute } from "@tanstack/react-router";
import { PaginaAdminPlaceholder } from "@/components/PaginaAdminPlaceholder";

export const Route = createFileRoute("/admin/usuarios")({
  head: () => ({
    meta: [{ title: "Usuários/Permissionamento — 40 Dias Rezando com Marcos Nascimento" }],
  }),
  component: () => (
    <PaginaAdminPlaceholder
      titulo="Usuários/Permissionamento"
      descricao="Este espaço ainda está sendo construído. Em breve, você vai poder gerenciar aqui usuários e permissões do devocional."
    />
  ),
});
