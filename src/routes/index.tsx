import { useEffect } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useAuth } from "@/hooks/useAuth";

// Rota inicial: quem já está logado vai direto para a jornada; quem
// ainda não entrou vai para a tela de login.

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  const { user, carregando } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (carregando) return;
    navigate({ to: user ? "/jornada" : "/entrar", replace: true });
  }, [carregando, user, navigate]);

  return (
    <main className="flex min-h-screen items-center justify-center">
      <p className="text-muted-foreground">Preparando…</p>
    </main>
  );
}
