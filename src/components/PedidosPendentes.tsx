import { useState } from "react";
import { toast } from "sonner";
import { useAuth } from "@/hooks/useAuth";
import { usePedidosOracao } from "@/hooks/usePedidosOracao";
import { useRespostasPedidos, useResponderPedido } from "@/hooks/useRespostasPedidos";
import { sombra3d } from "@/lib/estilo3d";

function formatarData(iso: string): string {
  return new Date(iso).toLocaleString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
}

// Painel de pedidos de oração que ainda não receberam nenhuma resposta
// — pensado para o administrador (ou um intercessor, mais à frente)
// nunca perder um pedido de vista, sem precisar rolar o mural inteiro
// procurando. Ordenado do mais antigo para o mais novo, como uma fila
// de atendimento: o que está esperando há mais tempo aparece primeiro.
export function PedidosPendentes() {
  const { user } = useAuth();
  const { data: pedidos, isLoading: carregandoPedidos } = usePedidosOracao();
  const { data: respostas, isLoading: carregandoRespostas } = useRespostasPedidos();
  const { responder, respondendo } = useResponderPedido();

  const [abertoId, setAbertoId] = useState<string | null>(null);
  const [texto, setTexto] = useState("");

  const carregando = carregandoPedidos || carregandoRespostas;

  const pendentes = (pedidos ?? [])
    .filter((p) => !(respostas ?? []).some((r) => r.pedido_id === p.id))
    .sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime());

  const enviarResposta = async (pedidoId: string) => {
    if (!user || !texto.trim()) return;
    const nome = (user.user_metadata?.["full_name"] as string | undefined) ?? "Intercessor";
    const resultado = await responder(pedidoId, user.id, nome, texto);
    if (resultado.erro) {
      toast.error("Não conseguimos publicar sua resposta agora. Tente novamente.");
      return;
    }
    setTexto("");
    setAbertoId(null);
    toast.success("Resposta publicada.");
  };

  return (
    <div className="rounded-2xl border border-accent/30 bg-card p-5" style={sombra3d}>
      <div className="flex items-center justify-between">
        <p className="text-xs uppercase tracking-wide text-muted-foreground">
          Pedidos de oração sem resposta
        </p>
        {!carregando && (
          <span className="rounded-full bg-accent/15 px-2.5 py-0.5 text-xs font-semibold text-accent">
            {pendentes.length}
          </span>
        )}
      </div>

      <div className="mt-3 space-y-2">
        {carregando && <p className="text-sm text-muted-foreground">Carregando…</p>}

        {!carregando && pendentes.length === 0 && (
          <p className="text-sm text-muted-foreground">
            Nenhum pedido esperando resposta agora. 🙏
          </p>
        )}

        {pendentes.map((pedido) => (
          <div key={pedido.id} className="rounded-xl border border-border/60 p-3">
            <div className="flex items-baseline justify-between gap-2">
              <p className="text-sm font-medium text-primary">{pedido.nome}</p>
              <p className="shrink-0 text-xs text-muted-foreground">
                {formatarData(pedido.created_at)}
              </p>
            </div>
            <p className="mt-1 text-sm leading-snug text-foreground/85">{pedido.texto}</p>

            {abertoId === pedido.id ? (
              <div className="mt-2.5 space-y-2">
                <textarea
                  value={texto}
                  onChange={(e) => setTexto(e.target.value)}
                  placeholder="Escreva sua resposta..."
                  rows={2}
                  className="w-full resize-none rounded-lg border border-border/60 bg-background/60 p-2 text-sm text-foreground outline-none focus:border-accent/50"
                  autoFocus
                />
                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setAbertoId(null);
                      setTexto("");
                    }}
                    className="rounded-full px-3 py-1.5 text-xs text-muted-foreground hover:bg-secondary"
                  >
                    Cancelar
                  </button>
                  <button
                    type="button"
                    disabled={respondendo || !texto.trim()}
                    onClick={() => enviarResposta(pedido.id)}
                    className="rounded-full bg-primary px-4 py-1.5 text-xs text-primary-foreground ring-1 ring-accent/50 transition-colors hover:bg-navy-soft disabled:opacity-50"
                  >
                    {respondendo ? "Enviando…" : "Publicar resposta"}
                  </button>
                </div>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => setAbertoId(pedido.id)}
                className="mt-2 rounded-full border border-border/60 px-3 py-1 text-xs text-muted-foreground transition-colors hover:bg-secondary"
              >
                Responder
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
