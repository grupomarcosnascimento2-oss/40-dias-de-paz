import { createFileRoute } from "@tanstack/react-router";
import { PaginaConteudo } from "@/components/PaginaConteudo";

export const Route = createFileRoute("/como-viver")({
  head: () => ({
    meta: [{ title: "Como viver esta jornada de 40 dias — 40 Dias Rezando com Marcos Nascimento" }],
  }),
  component: ComoViver,
});

const passos = [
  "Encontrar um lugar tranquilo.",
  "Fazer o sinal da cruz.",
  "Ler a Palavra de Deus.",
  "Ler a reflexão devagar.",
  "Fazer a oração.",
  "Conversar espontaneamente com Deus.",
  "Assumir o propósito do dia.",
  "Guardar no coração a frase final.",
];

function ComoViver() {
  return (
    <PaginaConteudo
      numero="6"
      titulo="Como viver esta jornada de 40 dias"
      anterior={{ to: "/por-que-40-dias", rotulo: "Por que 40 dias?" }}
      proximo={{ to: "/jornada", rotulo: "Iniciar minha jornada" }}
    >
      <p>A jornada foi pensada para ser simples. Reserve alguns minutos por dia.</p>
      <ol className="ml-5 list-decimal space-y-2 marker:text-accent">
        {passos.map((passo) => (
          <li key={passo}>{passo}</li>
        ))}
      </ol>
      <p>Não é necessário fazer tudo rapidamente. A proposta é caminhar. Um dia de cada vez.</p>
    </PaginaConteudo>
  );
}
