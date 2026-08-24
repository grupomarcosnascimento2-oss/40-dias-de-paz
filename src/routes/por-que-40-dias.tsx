import { createFileRoute } from "@tanstack/react-router";
import { PaginaConteudo } from "@/components/PaginaConteudo";

export const Route = createFileRoute("/por-que-40-dias")({
  head: () => ({
    meta: [{ title: "Por que 40 dias? — 40 Dias Rezando com Marcos Nascimento" }],
  }),
  component: PorQue40Dias,
});

function PorQue40Dias() {
  return (
    <PaginaConteudo
      numero="5"
      titulo="Por que 40 dias?"
      subtitulo="O significado bíblico do número 40"
      anterior={{ to: "/palavra-ao-leitor", rotulo: "Uma palavra ao leitor" }}
      proximo={{ to: "/como-viver", rotulo: "Continuar" }}
    >
      <p>O número 40 aparece muitas vezes na Bíblia. Não é um número escolhido por acaso.</p>
      <p>
        Ao longo das Escrituras, períodos de quarenta dias ou quarenta anos aparecem relacionados a
        preparação, provação, transformação, amadurecimento da fé, encontro com Deus e preparação
        para uma nova etapa.
      </p>
      <p>
        Foi durante 40 dias e 40 noites que Noé permaneceu na arca enquanto Deus conduzia uma grande
        transformação sobre a terra. Moisés permaneceu 40 dias e 40 noites no Monte Sinai, em um
        profundo encontro com Deus, antes de receber as tábuas da Aliança. O povo de Israel caminhou
        durante 40 anos pelo deserto, aprendendo a confiar em Deus.
      </p>
      <p>
        E talvez o exemplo mais forte para nós esteja na vida de Jesus. Antes de iniciar sua missão
        pública, Jesus foi conduzido pelo Espírito ao deserto, onde permaneceu 40 dias, em jejum e
        oração, enfrentando tentações e preparando-se para sua missão.
      </p>
      <p>
        Não significa que quarenta seja um número mágico. O significado está naquilo que fazemos
        durante a caminhada: uma oportunidade para parar, olhar para dentro, colocar a vida diante
        de Deus, fortalecer a fé e preparar o coração para uma vida nova.
      </p>
      <p>
        Não importa onde você esteja hoje. O importante é começar. Um dia de cada vez. Uma oração de
        cada vez. Uma reflexão de cada vez. Porque grandes mudanças também começam com pequenos
        passos.
      </p>
    </PaginaConteudo>
  );
}
