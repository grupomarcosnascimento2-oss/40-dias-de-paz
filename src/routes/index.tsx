import { createFileRoute, redirect } from "@tanstack/react-router";

// MODO DE DESENVOLVIMENTO — landing page e login desativados por enquanto para
// agilizar as melhorias do app. A rota inicial cai direto na jornada.
// Para religar a landing + login, restaurar o conteúdo anterior deste arquivo
// (ver histórico do git) e trocar o alvo do botão de volta para "/entrar".

export const Route = createFileRoute("/")({
  beforeLoad: () => {
    throw redirect({ to: "/jornada" });
  },
});
