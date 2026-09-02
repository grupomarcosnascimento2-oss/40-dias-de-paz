import { useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
import { lovable } from "@/integrations/lovable/index";
import { useSistemaOperacional } from "@/hooks/useSistemaOperacional";
import { useRegistrarLead } from "@/hooks/useLeadsCaptacao";
import { Ornamento, Cruz } from "@/components/Ornamento";

// Página leve e acolhedora, fora do fluxo comercial da landing page —
// pensada para o momento em que alguém chega precisando de oração,
// não de uma oferta. Captura nome/e-mail/WhatsApp (para o administrador
// poder acompanhar essa pessoa depois, se quiser) e, na sequência,
// convida a entrar com Google/Apple para já deixar o pedido de oração
// na Jornada de Oração — reaproveita o mesmo fluxo de login de
// entrar.tsx (redirect_uri para /entrar, que já sincroniza o perfil).

export const Route = createFileRoute("/oracao-urgente")({
  head: () => ({
    meta: [
      { title: "Deixe seu pedido de oração — 40 Dias Rezando com Marcos Nascimento" },
      {
        name: "description",
        content: "Um espaço de acolhimento para deixar seu pedido de oração agora.",
      },
    ],
  }),
  component: OracaoUrgente,
});

function OracaoUrgente() {
  const navigate = useNavigate();
  const registrarLead = useRegistrarLead();
  const sistema = useSistemaOperacional();

  const [etapa, setEtapa] = useState<"formulario" | "entrar">("formulario");
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [enviando, setEnviando] = useState(false);
  const [entrando, setEntrando] = useState<string | null>(null);

  const enviar = async () => {
    if (!nome.trim() || !email.trim()) return;
    setEnviando(true);
    const resultado = await registrarLead(nome.trim(), email.trim(), whatsapp);
    setEnviando(false);
    if (resultado.erro) {
      toast.error("Não conseguimos registrar agora. Tente novamente em instantes.");
      return;
    }
    setEtapa("entrar");
  };

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

  const preferido = sistema === "ios" ? "apple" : "google";
  const provedores: Array<"google" | "apple"> =
    preferido === "apple" ? ["apple", "google"] : ["google", "apple"];
  const rotulos: Record<"google" | "apple", string> = {
    google: "Continuar com Google",
    apple: "Continuar com Apple",
  };

  return (
    <main className="flex min-h-screen items-center justify-center px-6 py-16">
      <div className="paper w-full max-w-md rounded-[2rem] border border-accent/30 p-8 text-center shadow-[var(--shadow-sacred)] sm:p-10">
        <Cruz className="mx-auto h-6 w-6 text-accent" />
        <h1 className="mt-4 text-3xl text-primary">Você não precisa passar por isso sozinho</h1>
        <p className="script mt-1 text-2xl text-accent">deixe aqui o seu pedido de oração</p>

        <Ornamento className="my-7" />

        {etapa === "formulario" ? (
          <div className="space-y-3 text-left">
            <p className="mb-2 text-center text-sm text-foreground/75">
              Conte pra gente quem é você. Em seguida, você já vai poder escrever seu pedido de
              oração.
            </p>
            <input
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              placeholder="Seu nome"
              className="w-full rounded-xl border border-border/60 bg-background/60 p-3 text-sm text-foreground outline-none focus:border-accent/50"
            />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Seu e-mail"
              className="w-full rounded-xl border border-border/60 bg-background/60 p-3 text-sm text-foreground outline-none focus:border-accent/50"
            />
            <input
              value={whatsapp}
              onChange={(e) => setWhatsapp(e.target.value)}
              placeholder="Seu WhatsApp (opcional)"
              className="w-full rounded-xl border border-border/60 bg-background/60 p-3 text-sm text-foreground outline-none focus:border-accent/50"
            />
            <button
              type="button"
              disabled={enviando || !nome.trim() || !email.trim()}
              onClick={enviar}
              className="w-full rounded-full bg-accent px-6 py-3.5 text-accent-foreground ring-1 ring-accent/50 transition-colors hover:bg-accent/90 disabled:opacity-60"
            >
              {enviando ? "Enviando…" : "Continuar"}
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            <p className="mb-2 text-sm text-foreground/75">
              Obrigado, {nome.split(" ")[0]}. Agora, entre com sua conta para deixar seu pedido de
              oração:
            </p>
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
          Nossa equipe está aqui para interceder por você, com carinho e sem pressa.
        </p>
      </div>
    </main>
  );
}
