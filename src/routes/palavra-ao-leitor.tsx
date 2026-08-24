import { createFileRoute } from "@tanstack/react-router";
import { PaginaConteudo } from "@/components/PaginaConteudo";

export const Route = createFileRoute("/palavra-ao-leitor")({
  head: () => ({
    meta: [{ title: "Uma palavra ao leitor — 40 Dias Rezando com Marcos Nascimento" }],
  }),
  component: PalavraAoLeitor,
});

function PalavraAoLeitor() {
  return (
    <PaginaConteudo
      numero="4"
      titulo="Uma palavra ao leitor"
      anterior={{ to: "/forca-da-oracao", rotulo: "A força da oração" }}
      proximo={{ to: "/por-que-40-dias", rotulo: "Continuar" }}
    >
      <p>Este livro não é para ser apenas lido.</p>
      <p>Você não precisa ter muito tempo.</p>
      <p>Não precisa saber rezar bonito.</p>
      <p>Não precisa conhecer palavras difíceis.</p>
      <p>Você só precisa abrir o coração.</p>
      <p>
        Durante 40 dias, reserve alguns minutos para Deus. Leia devagar. Pare quando uma frase tocar
        seu coração. Converse com Deus. Conte a Ele o que você está vivendo. E, principalmente, não
        tenha medo de pedir.
      </p>
      <p>
        Deus conhece suas necessidades antes mesmo que você fale, mas a oração transforma também
        aquele que reza.
      </p>
      <p>A proposta é que você não termine os 40 dias apenas pensando "terminei um livro".</p>
      <p className="script text-xl text-primary">
        Mas: "Minha relação com Deus foi fortalecida durante esses 40 dias."
      </p>
    </PaginaConteudo>
  );
}
