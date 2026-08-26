import { useState } from "react";
import { frasesMural } from "@/lib/muralTopo";

// Mural do topo — faixa fina e clara, para recados curtos e práticos
// (os mesmos textos que futuramente também saem por WhatsApp e push).
// No celular fica fixo, na mesma linha do botão de menu (☰); no desktop
// (onde não há botão flutuante) ele fica no fluxo normal da página.
// O texto se move lentamente da direita para a esquerda, como um
// letreiro, passando pelo centro a cada ciclo. Ao completar cada ciclo,
// a próxima frase da lista entra automaticamente.

export function MuralTopo() {
  const [indice, setIndice] = useState(0);

  if (frasesMural.length === 0) return null;

  const frase = frasesMural[indice % frasesMural.length];

  return (
    <div
      className="fixed inset-x-0 top-0 z-20 h-11 overflow-hidden px-16 md:relative md:inset-auto md:top-auto md:z-auto md:h-9 md:px-4"
      style={{
        background: "linear-gradient(to right, #cbb08a, #d9c3a1, #cbb08a)",
        boxShadow: "0 2px 10px -6px color-mix(in oklab, var(--navy) 40%, transparent)",
      }}
    >
      <p
        key={indice}
        onAnimationIteration={() => setIndice((atual) => (atual + 1) % frasesMural.length)}
        className="absolute top-1/2 animate-[mural-letreiro_26s_linear_infinite] whitespace-nowrap text-sm font-medium tracking-wide text-primary sm:text-base"
        style={{ left: "100%", transform: "translate(0%, -50%)" }}
      >
        {frase}
      </p>
    </div>
  );
}
