import { fraseMural } from "@/lib/muralTopo";

// Mural do topo — faixa fina e escura, para recados curtos e práticos
// (o mesmo texto que futuramente também sai por WhatsApp e push).
// Propositalmente sem espessura: só o suficiente para uma frase.

export function MuralTopo() {
  if (!fraseMural) return null;

  return (
    <div
      className="w-full py-1.5"
      style={{
        background: "linear-gradient(to right, #6b4a30, #7d5a3d, #6b4a30)",
        boxShadow: "0 2px 10px -6px color-mix(in oklab, var(--navy) 70%, transparent)",
      }}
    >
      <p className="px-4 text-center text-xs font-medium tracking-wide text-accent sm:text-sm">
        {fraseMural}
      </p>
    </div>
  );
}
