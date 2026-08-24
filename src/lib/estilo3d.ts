// Estilos de sombra compartilhados para dar profundidade 3D aos cartões,
// mantendo a paleta pergaminho / azul-marinho / dourado do devocional.

export const sombra3d = {
  boxShadow: [
    "inset 0 1px 0 0 color-mix(in oklab, white 55%, transparent)",
    "inset 0 -1px 0 0 color-mix(in oklab, var(--navy) 8%, transparent)",
    "0 16px 32px -20px color-mix(in oklab, var(--navy) 50%, transparent)",
    "0 1px 0 0 color-mix(in oklab, var(--gold) 25%, transparent)",
  ].join(", "),
} as const;

export const sombra3dAberto = {
  boxShadow: [
    "inset 0 2px 4px 0 color-mix(in oklab, var(--navy) 12%, transparent)",
    "inset 0 -1px 0 0 color-mix(in oklab, white 40%, transparent)",
    "0 10px 24px -18px color-mix(in oklab, var(--navy) 45%, transparent)",
    "0 1px 0 0 color-mix(in oklab, var(--gold) 35%, transparent)",
  ].join(", "),
} as const;
