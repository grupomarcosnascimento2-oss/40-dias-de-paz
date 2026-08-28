import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { AppShell } from "./AppShell";
import { Ornamento, Cruz } from "./Ornamento";

export function PaginaConteudo({
  numero,
  titulo,
  subtitulo,
  children,
  anterior,
  proximo,
}: {
  numero: string;
  titulo: string;
  subtitulo?: string;
  children: ReactNode;
  anterior?: { to: string; rotulo: string };
  proximo?: { to: string; rotulo: string };
}) {
  return (
    <AppShell>
      <div className="mx-auto max-w-2xl px-6 py-12 sm:py-16">
        <p className="text-xs uppercase tracking-[0.22em] text-accent">{numero}</p>
        <h1 className="mt-1 text-3xl sm:text-4xl">{titulo}</h1>
        {subtitulo && <p className="script mt-1 text-2xl text-accent">{subtitulo}</p>}
        <Ornamento className="my-7 justify-start" />

        <div
          className="paper space-y-4 rounded-2xl border border-border/70 p-6 leading-relaxed text-foreground/90 shadow-[var(--shadow-card)] sm:p-8"
          style={{
            boxShadow:
              "inset 0 1px 0 0 color-mix(in oklab, white 55%, transparent), 0 16px 32px -22px color-mix(in oklab, var(--navy) 45%, transparent)",
          }}
        >
          {children}
        </div>

        <div className="mt-8 flex flex-wrap items-end justify-between gap-3">
          <div className="flex flex-col gap-1.5">
            <Link to="/jornada" className="text-sm text-muted-foreground hover:underline">
              ← Início
            </Link>
            {anterior && (
              <Link to={anterior.to} className="text-sm text-muted-foreground hover:underline">
                ← {anterior.rotulo}
              </Link>
            )}
          </div>
          {proximo && (
            <Link
              to={proximo.to}
              className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm text-primary-foreground ring-1 ring-accent/50 transition-transform hover:-translate-y-0.5 hover:bg-navy-soft"
              style={{
                boxShadow: "0 10px 20px -8px color-mix(in oklab, var(--navy) 55%, transparent)",
              }}
            >
              <Cruz className="h-3.5 w-3.5 text-accent" />
              {proximo.rotulo}
            </Link>
          )}
        </div>
      </div>
    </AppShell>
  );
}
