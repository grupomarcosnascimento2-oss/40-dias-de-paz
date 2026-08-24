import { createFileRoute } from "@tanstack/react-router";
import { PaginaConteudo } from "@/components/PaginaConteudo";

export const Route = createFileRoute("/apresentacao/familia")({
  head: () => ({
    meta: [{ title: "Família, fé e experiências vividas — 40 Dias Rezando com Marcos Nascimento" }],
  }),
  component: Familia,
});

function Familia() {
  return (
    <PaginaConteudo
      numero="2.2"
      titulo="Família, fé e experiências vividas"
      anterior={{ to: "/apresentacao/caminhada", rotulo: "Minha caminhada" }}
      proximo={{ to: "/forca-da-oracao", rotulo: "Continuar" }}
    >
      <p>
        Minha caminhada também foi marcada pela família, pelos encontros, pelas alegrias, pelas
        dificuldades, pelas pessoas que Deus colocou em meu caminho e, principalmente, pela certeza
        de que ninguém caminha sozinho quando coloca sua vida nas mãos de Deus.
      </p>
      <p>É dessa experiência de tantos anos de caminhada que nasce este livro.</p>
      <p className="text-sm text-muted-foreground">
        O conteúdo completo desta seção nasce das gravações em áudio de Marcos, preservando sua voz
        e suas experiências reais de família e fé ao longo dos anos.
      </p>
    </PaginaConteudo>
  );
}
