import { Link } from "@tanstack/react-router";
import { BookOpen, UserRound, CalendarHeart } from "lucide-react";

// Atalhos rápidos — ícones no estilo "ícone de app" (tile quadrado,
// levemente 3D) com legenda abaixo, para acesso direto a páginas-chave.

const atalhos = [
  { icone: BookOpen, legenda: "Introdução", to: "/introducao" },
  { icone: UserRound, legenda: "Marcos Nascimento", to: "/apresentacao" },
  { icone: CalendarHeart, legenda: "Por que 40 dias?", to: "/por-que-40-dias" },
] as const;

export function AtalhosRapidos() {
  return (
    <div className="mx-auto max-w-3xl px-6 pt-6">
      <div className="grid grid-cols-3 gap-4 sm:gap-6">
        {atalhos.map(({ icone: Icone, legenda, to }) => (
          <Link key={to} to={to} className="group flex flex-col items-center gap-2">
            <span
              className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-b from-card to-secondary/60 text-primary transition-transform group-hover:-translate-y-1 group-active:translate-y-0 sm:h-[4.5rem] sm:w-[4.5rem]"
              style={{
                boxShadow: [
                  "inset 0 1px 0 0 color-mix(in oklab, white 55%, transparent)",
                  "inset 0 -1px 0 0 color-mix(in oklab, var(--navy) 10%, transparent)",
                  "0 14px 26px -16px color-mix(in oklab, var(--navy) 55%, transparent)",
                  "0 1px 0 0 color-mix(in oklab, var(--gold) 30%, transparent)",
                ].join(", "),
              }}
            >
              <Icone className="h-7 w-7 text-accent sm:h-8 sm:w-8" strokeWidth={1.75} />
            </span>
            <span className="text-center text-xs font-medium leading-tight text-foreground/85 sm:text-sm">
              {legenda}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
