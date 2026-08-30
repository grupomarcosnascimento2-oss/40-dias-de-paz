import { useState } from "react";
import { toast } from "sonner";
import { Trash2 } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { usePerfil } from "@/hooks/usePerfil";
import {
  usePedidosOracao,
  usePublicarPedido,
  useRemoverPedido,
  type PedidoOracao,
} from "@/hooks/usePedidosOracao";
import { sombra3d } from "@/lib/estilo3d";

// Mural da Comunidade de Oração — membros logados publicam pedidos de
// oração; a lista atualiza em tempo real (Supabase Realtime) para quem
// estiver com o mural aberto. Moderação: o autor do pedido ou um
// administrador podem remover um pedido (checado no próprio banco de
// dados, não só na tela).

function tempoRelativo(dataIso: string): string {
  const segundos = Math.floor((Date.now() - new Date(dataIso).getTime()) / 1000);
  if (segundos < 60) return "agora mesmo";
  const minutos = Math.floor(segundos / 60);
  if (minutos < 60) return `há ${minutos} min`;
  const horas = Math.floor(minutos / 60);
  if (horas < 24) return `há ${horas} h`;
  const dias = Math.floor(horas / 24);
  if (dias === 1) return "ontem";
  return `há ${dias} dias`;
}

export function MuralPedidosOracao() {
  const { user } = useAuth();
  const { data: perfil } = usePerfil(user?.id);
  const { data: pedidos, isLoading } = usePedidosOracao();
  const { publicar, publicando } = usePublicarPedido();
  const remover = useRemoverPedido();
  const [texto, setTexto] = useState("");

  const souAdministrador = perfil?.papel === "administrador";

  const enviarPedido = async () => {
    if (!user) return;
    const nome = (user.user_metadata?.["full_name"] as string | undefined) ?? "Um membro";
    const resultado = await publicar(user.id, nome, texto);
    if (resultado.erro) {
      toast.error("Não conseguimos publicar seu pedido agora. Tente novamente.");
      return;
    }
    setTexto("");
  };

  const removerPedido = async (id: string) => {
    const resultado = await remover(id);
    if (resultado.erro) toast.error("Não conseguimos remover este pedido agora.");
  };

  return (
    <section className="mx-auto max-w-3xl px-6 py-12">
      <p className="mx-auto max-w-md text-center text-foreground/75">
        Nossa equipe está intercedendo em oração por cada pedido compartilhado aqui.
      </p>

      {user && (
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
          <div className="mt-3 flex justify-end">
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

      <div className="mt-8 max-h-[26rem] space-y-3 overflow-y-auto rounded-2xl border border-border/50 bg-background/40 p-3 sm:max-h-[30rem]">
        {isLoading && <p className="text-center text-sm text-muted-foreground">Carregando…</p>}

        {!isLoading && pedidos?.length === 0 && (
          <p className="text-center text-sm text-muted-foreground">
            Ainda não há pedidos publicados. Seja o primeiro a compartilhar.
          </p>
        )}

        {pedidos?.map((pedido: PedidoOracao) => {
          const podeRemover = user && (user.id === pedido.user_id || souAdministrador);
          return (
            <div
              key={pedido.id}
              className="rounded-xl border border-border/70 bg-card p-4"
              style={sombra3d}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="text-sm font-medium text-primary">{pedido.nome}</p>
                  <p className="mt-1 text-sm leading-relaxed text-foreground/85">{pedido.texto}</p>
                  <p className="mt-2 text-xs text-muted-foreground">
                    {tempoRelativo(pedido.created_at)}
                  </p>
                </div>
                {podeRemover && (
                  <button
                    type="button"
                    onClick={() => removerPedido(pedido.id)}
                    aria-label="Remover pedido"
                    title="Remover pedido"
                    className="shrink-0 rounded-full p-1.5 text-muted-foreground transition-colors hover:bg-secondary hover:text-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
