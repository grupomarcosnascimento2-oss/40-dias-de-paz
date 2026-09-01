import { usePedidosOracao } from "@/hooks/usePedidosOracao";
import { sombra3d } from "@/lib/estilo3d";
import { Cruz } from "./Ornamento";

// Mural do visitante — mostra uma prévia real dos pedidos de oração da
// comunidade (mesmos dados dos Pedidos de Oração dos membros), mas
// sem caixa de publicar, sem reações e sem remover: é só leitura, com
// foco em mostrar que a comunidade é viva e convidar a pessoa a virar
// membro para participar de verdade.
//
// Link do CTA: aponta para a landing page de vendas do devocional.

const LINK_TORNAR_SE_MEMBRO = "https://rezandocomesperanca40dias.lovable.app/";

export function MuralVisitanteOracao() {
  const { data: pedidos, isLoading } = usePedidosOracao();
  const previa = (pedidos ?? []).filter((p) => !p.fixado).slice(0, 5);

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

      <div className="mt-8 space-y-2 rounded-2xl border border-border/50 bg-background/40 p-3">
        {isLoading && <p className="text-center text-sm text-muted-foreground">Carregando…</p>}

        {!isLoading && previa.length === 0 && (
          <p className="text-center text-sm text-muted-foreground">
            Em breve, os pedidos da comunidade aparecerão aqui.
          </p>
        )}

        {previa.map((pedido) => (
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
          Torne-se membro para publicar seus próprios pedidos e receber o apoio em oração da nossa
          comunidade.
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
