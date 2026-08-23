import { useEffect, useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
import { lovable } from "@/integrations/lovable/index";
import { useAuth } from "@/hooks/useAuth";
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
  const [entrando, setEntrando] = useState<string | null>(null);

  useEffect(() => {
    if (!carregando && user) navigate({ to: "/jornada" });
  }, [carregando, user, navigate]);

  const entrarCom = async (provedor: "google" | "apple") => {
    setEntrando(provedor);
    const resultado = await lovable.auth.signInWithOAuth(provedor, {
      redirect_uri: window.location.origin,
    });

    if (resultado.error) {
      setEntrando(null);
      toast.error("Não conseguimos entrar agora. Tente novamente em instantes.");
      return;
    }
    if (resultado.redirected) return;
    navigate({ to: "/jornada" });
  };

  return (
    <main className="flex min-h-screen items-center justify-center px-6 py-16">
      <div className="paper w-full max-w-md rounded-2xl border border-accent/35 p-8 text-center shadow-[var(--shadow-sacred)] sm:p-10">
        <Cruz className="mx-auto h-5 w-5 text-accent" />
        <h1 className="mt-4 text-3xl">Entre para começar</h1>
        <p className="script mt-1 text-2xl text-accent">sua caminhada de 40 dias com Deus</p>

        <Ornamento className="my-7" />

        <div className="space-y-3">
          <button
            type="button"
            disabled={entrando !== null}
            onClick={() => entrarCom("google")}
            className="w-full rounded-full border border-accent/50 bg-card px-6 py-3.5 text-primary transition-colors hover:bg-secondary disabled:opacity-60"
          >
            {entrando === "google" ? "Abrindo…" : "Continuar com Google"}
          </button>
          <button
            type="button"
            disabled={entrando !== null}
            onClick={() => entrarCom("apple")}
            className="w-full rounded-full bg-primary px-6 py-3.5 text-primary-foreground ring-1 ring-accent/50 transition-colors hover:bg-navy-soft disabled:opacity-60"
          >
            {entrando === "apple" ? "Abrindo…" : "Continuar com Apple"}
          </button>
        </div>

        <p className="mt-7 text-sm text-muted-foreground">
          Sua caminhada fica guardada na sua conta. Você pode voltar de onde parou, em qualquer
          aparelho.
        </p>
      </div>
    </main>
  );
}
