import { useState } from "react";
import { toast } from "sonner";
import { useAuth } from "@/hooks/useAuth";
import { usePerfil } from "@/hooks/usePerfil";
import { usePedidosOracao, usePublicarPedido, type PedidoOracao } from "@/hooks/usePedidosOracao";
import { sombra3d } from "@/lib/estilo3d";
import { Cruz } from "./Ornamento";

// Mural do visitante — mostra os pedidos de oração reais da comunidade
// (mesmos dados dos Pedidos de Oração dos membros) e deixa o visitante
// publicar pedidos próprios livremente durante as primeiras 24 horas
// desde o primeiro acesso (perfis.created_at). Depois dessa janela, ele
// continua vendo tudo normalmente, mas a caixa de publicar é
// substituída pelo convite para virar membro.
//
// Sem reações, resposta ou moderação aqui — essas ações continuam
// exclusivas de membro/administrador/intercessor.
//
// Link do CTA: aponta para a landing page de vendas do devocional.

const JANELA_VISITANTE_HORAS = 24;
const LINK_TORNAR_SE_MEMBRO = "https://rezandocomesperanca40dias.lovable.app/";

export function MuralVisitanteOracao() {
  const { user } = useAuth();
  const { data: perfil } = usePerfil(user?.id);
  const { data: pedidos, isLoading } = usePedidosOracao();
  const { publicar, publicando } = usePublicarPedido();
  const [texto, setTexto] = useState("");

  const listaVisivel = (pedidos ?? []).filter((p: PedidoOracao) => !p.fixado);

  const dentroDaJanela = perfil
    ? Date.now() - new Date(perfil.created_at).getTime() < JANELA_VISITANTE_HORAS * 60 * 60 * 1000
    : false;
  const janelaEncerrada = Boolean(perfil) && !dentroDaJanela;

  const enviarPedido = async () => {
    if (!user) return;
    const nome = (user.user_metadata?.["full_name"] as string | undefined) ?? "Um visitante";
    const papel = perfil?.papel ?? "visitante";
    const resultado = await publicar(user.id, nome, papel, texto);
    if (resultado.erro) {
      toast.error("Não conseguimos publicar seu pedido agora. Tente novamente.");
      return;
    }
    setTexto("");
  };

  return (
    <section className="mx-auto max-w-3xl px-6 py-12">
      <div className="text-center">
        <Cruz className="mx-auto h-6 w-6 text-accent" />
        <h2 className="script mt-4 text-3xl text-primary">Pedidos de Oração</h2>
        <p className="mx-auto mt-3 max-w-md text-foreground/75">
          Veja pedidos reais de pessoas que já fazem parte da nossa comunidade — nossa equipe está
          intercedendo por cada um deles.
        </p>
      </div>

      {user && dentroDaJanela && (
        <div
          className="mx-auto mt-6 rounded-2xl border border-accent/30 bg-card p-4 sm:p-5"
          style={sombra3d}
        >
          <textarea
            value={texto}
            onChange={(e) => setTexto(e.target.value)}
            placeholder="Compartilhe seu pedido de oração..."
            rows={3}
            className="w-full resize-none rounded-xl border border-border/60 bg-background/60 p-3 text-sm text-foreground outline-none focus:border-accent/50"
          />
          <div className="mt-3 flex items-center justify-between">
            <p className="text-xs text-muted-foreground">
              Você pode publicar pedidos como visitante nas suas primeiras 24 horas aqui.
            </p>
            <button
              type="button"
              disabled={publicando || !texto.trim()}
              onClick={enviarPedido}
              className="rounded-full bg-primary px-6 py-2.5 text-sm text-primary-foreground ring-1 ring-accent/50 transition-colors hover:bg-navy-soft disabled:opacity-50"
            >
              {publicando ? "Publicando…" : "Publicar"}
            </button>
          </div>
        </div>
      )}

      <div className="mt-6 max-h-[26rem] space-y-2 overflow-y-auto rounded-2xl border border-border/50 bg-background/40 p-3 sm:max-h-[30rem]">
        {isLoading && <p className="text-center text-sm text-muted-foreground">Carregando…</p>}

        {!isLoading && listaVisivel.length === 0 && (
          <p className="text-center text-sm text-muted-foreground">
            Em breve, os pedidos da comunidade aparecerão aqui.
          </p>
        )}

        {listaVisivel.map((pedido) => (
          <div
            key={pedido.id}
            className="rounded-xl border border-border/70 bg-card p-3"
            style={sombra3d}
          >
            <p className="text-sm font-medium text-primary">{pedido.nome}</p>
            <p className="mt-0.5 text-sm leading-snug text-foreground/85">{pedido.texto}</p>
          </div>
        ))}
      </div>

      <div
        className="mx-auto mt-8 max-w-md rounded-2xl border-2 border-accent bg-accent/10 p-6 text-center"
        style={sombra3d}
      >
        <p className="text-foreground/85">
          {janelaEncerrada
            ? "Suas primeiras 24 horas para publicar pedidos como visitante já passaram. Torne-se membro para publicar sem limite e receber o apoio contínuo da nossa comunidade."
            : "Torne-se membro para publicar sem limite e receber o apoio em oração da nossa comunidade."}
        </p>
        <a
          href={LINK_TORNAR_SE_MEMBRO}
          className="mt-4 inline-block rounded-full bg-primary px-6 py-3 text-sm text-primary-foreground ring-1 ring-accent/50 transition-colors hover:bg-navy-soft"
        >
          Quero ser membro
        </a>
      </div>
    </section>
  );
}
