import { createFileRoute } from "@tanstack/react-router";
import { PaginaConteudo } from "@/components/PaginaConteudo";

export const Route = createFileRoute("/introducao")({
  head: () => ({
    meta: [{ title: "Introdução — 40 Dias Rezando com Marcos Nascimento" }],
  }),
  component: Introducao,
});

function Introducao() {
  return (
    <PaginaConteudo
      numero="1"
      titulo="Introdução"
      subtitulo="Uma jornada de 40 dias com Deus"
      proximo={{ to: "/apresentacao", rotulo: "Continuar" }}
    >
      <p>
        Este devocional nasceu de um desejo simples: convidar você a parar, respirar e rezar. Não é
        apenas um conjunto de 40 textos religiosos. É uma jornada de 40 dias com Deus.
      </p>
      <p>
        Durante estes dias, você será convidado a parar, respirar, rezar, refletir, confiar e
        transformar. Um dia de cada vez.
      </p>
      <p className="script text-xl text-primary">
        "Eu não quero apenas que você leia estas páginas. Quero que, durante estes 40 dias, você
        experimente a força da oração e descubra novamente o poder de Deus agindo em sua vida."
      </p>
      <p>
        Você não precisa enfrentar tudo sozinho. Coloque sua vida nas mãos de Deus e comece pela
        oração. Talvez Deus não mude imediatamente a situação que você está vivendo — mas a oração
        pode mudar você diante dela.
      </p>
      <p>
        Não tenha pressa. Caminhe um dia de cada vez. Durante 40 dias, coloque sua vida nas mãos de
        Deus e permita que a oração transforme primeiro o seu coração.
      </p>
    </PaginaConteudo>
  );
}
