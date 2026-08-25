// Painel informativo — aqui é tratado apenas como texto (sem card, sem
// fundo, sem sombra), para se diferenciar claramente dos cards das áreas
// e do painel de avisos. A combinação de rótulo pequeno em versalete +
// linha em fonte script é o que dá identidade a este espaço.
//
// Conteúdo ainda provisório: o texto real será decidido depois.

export function PainelInformativo() {
  return (
    <div className="mx-auto max-w-3xl px-6 pt-6 text-center sm:text-left">
      <p className="text-xs uppercase tracking-[0.3em] text-accent">Painel informativo</p>
      <p className="script mt-1 text-3xl text-primary sm:text-4xl">
        Em breve, novidades para sua caminhada
      </p>
    </div>
  );
}
