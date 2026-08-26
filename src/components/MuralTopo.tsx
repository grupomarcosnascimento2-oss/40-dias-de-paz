import { fraseMural } from "@/lib/muralTopo";

// Mural do topo — faixa fina e escura, para recados curtos e práticos
// (o mesmo texto que futuramente também sai por WhatsApp e push).
// No celular fica fixo, na mesma linha do botão de menu (☰); no desktop
// (onde não há botão flutuante) ele fica no fluxo normal da página.

export function MuralTopo() {
  if (!fraseMural) return null;

  return (
    <div
      className="fixed inset-x-0 top-0 z-20 flex h-11 items-center justify-center px-16 md:static md:inset-auto md:top-auto md:z-auto md:px-4"
      style={{
        background: "linear-gradient(to right, #6b4a30, #7d5a3d, #6b4a30)",
        boxShadow: "0 2px 10px -6px color-mix(in oklab, var(--navy) 70%, transparent)",
      }}
    >
      <p className="truncate text-center text-xs font-medium tracking-wide text-accent sm:text-sm">
        {fraseMural}
      </p>
    </div>
  );
}
