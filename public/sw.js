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

// Recebe uma notificação push (enviada pelo servidor) e exibe.
self.addEventListener("push", (event) => {
  let dados = { titulo: "40 Dias Rezando com Marcos Nascimento", corpo: "", url: "/jornada" };
  try {
    if (event.data) dados = { ...dados, ...event.data.json() };
  } catch {
    // Se não vier em JSON, mantém o texto padrão.
  }

  event.waitUntil(
    self.registration.showNotification(dados.titulo, {
      body: dados.corpo,
      icon: "/icon-192.png",
      badge: "/icon-192.png",
      data: { url: dados.url },
    }),
  );
});

// Ao clicar na notificação, abre (ou foca) o devocional na página certa.
self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  const url = event.notification.data?.url || "/jornada";

  event.waitUntil(
    self.clients.matchAll({ type: "window", includeUncontrolled: true }).then((lista) => {
      for (const cliente of lista) {
        if ("focus" in cliente) {
          void cliente.navigate(url);
          return cliente.focus();
        }
      }
      return self.clients.openWindow(url);
    }),
  );
});
