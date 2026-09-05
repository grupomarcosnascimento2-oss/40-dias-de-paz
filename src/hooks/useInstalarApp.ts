import { useEffect, useState } from "react";
import { useSistemaOperacional } from "./useSistemaOperacional";

// Detecta se o devocional pode ser sugerido para instalação na tela
// inicial, e como fazer isso:
// - Android/Chrome: evento nativo beforeinstallprompt, disparado pelo
//   próprio navegador quando os critérios de instalação são atendidos
//   (manifesto + service worker + engajamento mínimo). Chamando
//   .prompt() nesse evento, o próprio Android mostra o diálogo nativo.
// - iOS/Safari: não existe evento equivalente — a Apple só permite via
//   Compartilhar → Adicionar à Tela de Início, manual. Aqui só
//   detectamos que é iOS, para mostrar o passo a passo.
// Em ambos os casos, se o app já estiver rodando instalado (modo
// standalone), não sugerimos nada.

type EventoInstalacao = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
};

function estaInstalado(): boolean {
  if (typeof window === "undefined") return false;
  const standaloneNavegador = window.matchMedia("(display-mode: standalone)").matches;
  const standaloneIOS = (window.navigator as unknown as { standalone?: boolean }).standalone;
  return standaloneNavegador || Boolean(standaloneIOS);
}

export function useInstalarApp() {
  const sistema = useSistemaOperacional();
  const [eventoAndroid, setEventoAndroid] = useState<EventoInstalacao | null>(null);
  const [instalado, setInstalado] = useState(false);

  useEffect(() => {
    setInstalado(estaInstalado());

    const aoDisparar = (evento: Event) => {
      evento.preventDefault();
      setEventoAndroid(evento as EventoInstalacao);
    };

    window.addEventListener("beforeinstallprompt", aoDisparar);
    return () => window.removeEventListener("beforeinstallprompt", aoDisparar);
  }, []);

  const instalar = async () => {
    if (!eventoAndroid) return;
    await eventoAndroid.prompt();
    setEventoAndroid(null);
  };

  const tipo: "android" | "ios" | null = instalado
    ? null
    : eventoAndroid
      ? "android"
      : sistema === "ios"
        ? "ios"
        : null;

  return { tipo, instalar };
}
