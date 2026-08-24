import { createFileRoute } from "@tanstack/react-router";
import { PaginaConteudo } from "@/components/PaginaConteudo";

export const Route = createFileRoute("/forca-da-oracao")({
  head: () => ({
    meta: [
      {
        title: "A força da oração na minha caminhada — 40 Dias Rezando com Marcos Nascimento",
      },
    ],
  }),
  component: ForcaDaOracao,
});

function ForcaDaOracao() {
  return (
    <PaginaConteudo
      numero="3"
      titulo="A força da oração na minha caminhada"
      anterior={{ to: "/apresentacao/familia", rotulo: "Família, fé e experiências" }}
      proximo={{ to: "/palavra-ao-leitor", rotulo: "Continuar" }}
    >
      <p>
        A oração não fez desaparecer todos os problemas da minha vida. Mas mudou a maneira como
        enfrento cada um deles.
      </p>
      <p>
        Foi assim que descobri, cada vez mais, que Deus continua sendo Deus quando a porta se fecha,
        quando a resposta demora, quando as lágrimas caem e quando não entendemos o caminho.
      </p>
      <p className="script text-xl text-primary">"Senhor, fica comigo."</p>
      <p>
        Talvez aquilo que você esteja procurando em tantos lugares possa começar com essa simples
        oração.
      </p>
    </PaginaConteudo>
  );
}
