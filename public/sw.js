// Service worker mínimo — existe só para o Chrome/Android considerar o
// site "instalável" (critério necessário para o beforeinstallprompt
// funcionar). Não faz cache de nada: o devocional é dinâmico, com
// conteúdo que muda (avisos, pedidos de oração, progresso), então
// cachear indiscriminadamente causaria conteúdo desatualizado.

self.addEventListener("install", () => {
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener("fetch", () => {
  // Propositalmente vazio — deixa cada requisição seguir direto para a
  // rede, sem interceptar nem cachear.
});
