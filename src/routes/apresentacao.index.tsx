import { createFileRoute } from "@tanstack/react-router";
import { PaginaConteudo } from "@/components/PaginaConteudo";

export const Route = createFileRoute("/apresentacao/")({
  head: () => ({
    meta: [{ title: "Apresentação — 40 Dias Rezando com Marcos Nascimento" }],
  }),
  component: Apresentacao,
});

function Apresentacao() {
  return (
    <PaginaConteudo
      numero="2"
      titulo="Apresentação"
      subtitulo="Quem é Marcos Nascimento"
      anterior={{ to: "/introducao", rotulo: "Introdução" }}
      proximo={{ to: "/apresentacao/caminhada", rotulo: "Continuar" }}
    >
      <p className="script text-xl text-primary">Antes de começarmos a rezar...</p>
      <p>Meu nome é Marcos Nascimento.</p>
      <p>
        Há muitas décadas, minha história tem sido construída dentro da Igreja, ao lado de pessoas,
        famílias, comunidades e irmãos que me ensinaram que a fé não é algo que se vive apenas
        quando tudo está bem.
      </p>
      <p>
        Ao longo dessa caminhada, aprendi que existem momentos em que temos respostas para quase
        tudo. Mas também existem momentos em que a única coisa que podemos fazer é dobrar os joelhos
        e dizer: "Senhor, eu preciso de Ti."
      </p>
      <p>
        Não escrevo estas páginas como alguém que já venceu todas as batalhas. Escrevo como alguém
        que aprendeu a não lutar sozinho.
      </p>
      <p>
        Durante os próximos 40 dias, quero convidar você a fazer uma experiência. Vamos parar um
        pouco. Vamos respirar. Vamos abrir o coração. Vamos conversar com Deus.
      </p>
    </PaginaConteudo>
  );
}
