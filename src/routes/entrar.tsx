import { useEffect, useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { lovable } from "@/integrations/lovable/index";
import { useAuth } from "@/hooks/useAuth";
import { useSistemaOperacional } from "@/hooks/useSistemaOperacional";
import { useRastrearPresencaVisitante } from "@/hooks/usePresencaGlobal";
import { sincronizarPerfilAposLogin } from "@/lib/sincronizarPerfilAposLogin.functions";
import { Ornamento, Cruz } from "@/components/Ornamento";

export const Route = createFileRoute("/entrar")({
  head: () => ({
    meta: [
      { title: "Entrar — 40 Dias Rezando com Marcos Nascimento" },
      {
        name: "description",
        content: "Entre com Google ou Apple para começar sua caminhada de 40 dias com Deus.",
      },
      { property: "og:title", content: "Entrar — 40 Dias Rezando" },
      {
        property: "og:description",
        content: "Entre para começar sua caminhada de 40 dias com Deus.",
      },
    ],
  }),
  component: Entrar,
});

function Entrar() {
  const { user, carregando } = useAuth();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [entrando, setEntrando] = useState<string | null>(null);
  const [confirmandoAcesso, setConfirmandoAcesso] = useState(false);
  const sistema = useSistemaOperacional();

  useEffect(() => {
    if (carregando || !user) return;

    let cancelado = false;
    setConfirmandoAcesso(true);

    (async () => {
      // Depois do login, confere na planilha de pagamentos (via Apps
      // Script) se este e-mail já pagou — se sim, promove o perfil para
      // "membro"; se não, permanece "visitante" (papel padrão). Essa
      // checagem acontece aqui, uma vez por login.
      await sincronizarPerfilAposLogin({ data: { userId: user.id, email: user.email ?? "" } });
      if (cancelado) return;
      await queryClient.invalidateQueries({ queryKey: ["perfil", user.id] });
      navigate({ to: "/jornada" });
    })();

    return () => {
      cancelado = true;
    };
  }, [carregando, user, navigate, queryClient]);

  const entrarCom = async (provedor: "google" | "apple") => {
    setEntrando(provedor);
    const resultado = await lovable.auth.signInWithOAuth(provedor, {
      redirect_uri: `${window.location.origin}/entrar`,
    });

    if (resultado.error) {
      setEntrando(null);
      toast.error("Não conseguimos entrar agora. Tente novamente em instantes.");
      return;
    }
    if (resultado.redirected) return;
    navigate({ to: "/jornada" });
  };

  // No iPhone/iPad, Apple aparece primeiro e em destaque; no Android,
  // Google aparece primeiro e em destaque. Em qualquer outro caso
  // (computador, ou antes da detecção rodar), mantém a ordem padrão.
  // As duas opções continuam sempre disponíveis — a detecção só decide
  // a ordem/destaque visual, nunca esconde uma opção.
  const preferido = sistema === "ios" ? "apple" : "google";
  const provedores: Array<"google" | "apple"> =
    preferido === "apple" ? ["apple", "google"] : ["google", "apple"];

  const rotulos: Record<"google" | "apple", string> = {
    google: "Continuar com e-mail do Google",
    apple: "Continuar com e-mail da Apple",
  };

  return (
    <main className="flex min-h-screen items-center justify-center px-6 py-16">
      <div className="paper w-full max-w-md rounded-2xl border border-accent/35 p-8 text-center shadow-[var(--shadow-sacred)] sm:p-10">
        <Cruz className="mx-auto h-5 w-5 text-accent" />
        <h1 className="mt-4 text-3xl">Entre para começar</h1>
        <p className="script mt-1 text-2xl text-accent">sua caminhada de 40 dias com Deus</p>

        <Ornamento className="my-7" />

        {confirmandoAcesso ? (
          <p className="py-3 text-sm text-muted-foreground">Confirmando seu acesso…</p>
        ) : (
          <div className="space-y-3">
            {provedores.map((provedor) => {
              const destaque = provedor === preferido;
              return (
                <button
                  key={provedor}
                  type="button"
                  disabled={entrando !== null}
                  onClick={() => entrarCom(provedor)}
                  className={
                    destaque
                      ? "w-full rounded-full bg-primary px-6 py-3.5 text-primary-foreground ring-1 ring-accent/50 transition-colors hover:bg-navy-soft disabled:opacity-60"
                      : "w-full rounded-full border border-accent/50 bg-card px-6 py-3.5 text-primary transition-colors hover:bg-secondary disabled:opacity-60"
                  }
                >
                  {entrando === provedor ? "Abrindo…" : rotulos[provedor]}
                </button>
              );
            })}
          </div>
        )}

        <p className="mt-7 text-sm text-muted-foreground">
          Sua caminhada fica guardada na sua conta. Você pode voltar de onde parou, em qualquer
          aparelho.
        </p>
      </div>
    </main>
  );
}
