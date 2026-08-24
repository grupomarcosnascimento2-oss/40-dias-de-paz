import { createFileRoute } from "@tanstack/react-router";
import { PaginaConteudo } from "@/components/PaginaConteudo";

export const Route = createFileRoute("/apresentacao/caminhada")({
  head: () => ({
    meta: [
      {
        title: "Minha caminhada com Deus e com a Igreja — 40 Dias Rezando com Marcos Nascimento",
      },
    ],
  }),
  component: Caminhada,
});

function Caminhada() {
  return (
    <PaginaConteudo
      numero="2.1"
      titulo="Minha caminhada com Deus e com a Igreja"
      anterior={{ to: "/apresentacao", rotulo: "Apresentação" }}
      proximo={{ to: "/apresentacao/familia", rotulo: "Continuar" }}
    >
      <p>
        Foi assim que descobri, cada vez mais, a força da oração. A oração não fez desaparecer todos
        os problemas da minha vida. Mas mudou a maneira como enfrento cada um deles.
      </p>
      <p>Aprendi que Deus continua sendo Deus quando a porta se fecha.</p>
      <p>Continua sendo Deus quando a resposta demora.</p>
      <p>Continua sendo Deus quando as lágrimas caem.</p>
      <p>E continua sendo Deus quando não entendemos o caminho.</p>
      <p className="text-sm text-muted-foreground">
        O conteúdo completo desta seção nasce das gravações em áudio de Marcos, preservando sua voz
        e suas experiências reais de décadas de caminhada dentro da Igreja.
      </p>
    </PaginaConteudo>
  );
}
