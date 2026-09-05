import { useEffect } from "react";
import { useNavigate } from "@tanstack/react-router";
import { useAuth } from "@/hooks/useAuth";
import { usePerfil } from "@/hooks/usePerfil";
import { AppShell } from "./AppShell";
import { Cruz } from "./Ornamento";

// Placeholder reutilizável para as seções administrativas ainda não
// construídas (Cadastros, Controle, Regras de Negócio,
// Usuários/Permissionamento) — mesma proteção de acesso do Dashboard:
// exige login E papel administrador de verdade, não só o item de menu
// escondido.
export function PaginaAdminPlaceholder({
  titulo,
  descricao,
}: {
  titulo: string;
  descricao: string;
}) {
  const { user, carregando: carregandoAuth } = useAuth();
  const { data: perfil, isLoading: carregandoPerfil } = usePerfil(user?.id);
  const navigate = useNavigate();

  const souAdministrador = perfil?.papel === "administrador";
  const carregando = carregandoAuth || carregandoPerfil;

  useEffect(() => {
    if (carregando) return;
    if (!user) {
      navigate({ to: "/entrar", replace: true });
      return;
    }
    if (!souAdministrador) {
      navigate({ to: "/jornada", replace: true });
    }
  }, [carregando, user, souAdministrador, navigate]);

  if (carregando || !user || !souAdministrador) {
    return (
      <main className="flex min-h-screen items-center justify-center">
        <p className="text-muted-foreground">Carregando…</p>
      </main>
    );
  }

  return (
    <AppShell>
      <section className="mx-auto max-w-3xl px-6 py-16 text-center">
        <Cruz className="mx-auto h-6 w-6 text-accent" />
        <h1 className="script mt-4 text-3xl text-primary">{titulo}</h1>
        <p className="mx-auto mt-3 max-w-md text-foreground/75">{descricao}</p>
      </section>
    </AppShell>
  );
}
