import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { ArrowUp, MessageCircle, Pin, PinOff, Trash2 } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { usePerfil } from "@/hooks/usePerfil";
import { podeResponderPedidos } from "@/lib/perfis";
import {
  usePedidosOracao,
  usePublicarPedido,
  useRemoverPedido,
  useFixarPedido,
  type PedidoOracao,
} from "@/hooks/usePedidosOracao";
import {
  useReacoesPedidos,
  useReagir,
  EMOJIS_DISPONIVEIS,
  type Reacao,
} from "@/hooks/useReacoesPedidos";
import {
  useRespostasPedidos,
  useResponderPedido,
  useRemoverResposta,
  type RespostaPedido,
} from "@/hooks/useRespostasPedidos";
import { sombra3d } from "@/lib/estilo3d";

// Mural da Comunidade de Oração — membros logados publicam pedidos de
// oração; a lista atualiza em tempo real (Supabase Realtime). Elementos
// inspirados em chat ao vivo (auto-rolagem para o mais novo, aviso de
// "novo pedido"), mas sem herdar a sensação descartável de um chat de
// transmissão: sem mensagens curtíssimas nem rolagem impossível de
// acompanhar. Moderação: o autor do pedido ou um administrador podem
// remover; só administrador pode fixar um pedido no topo ou responder
// publicamente a um pedido (não é comentário aberto para qualquer um).

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

function contarReacoes(reacoes: Reacao[] | undefined, pedidoId: string) {
  const contagem: Record<string, number> = {};
  for (const r of reacoes ?? []) {
    if (r.pedido_id === pedidoId) contagem[r.emoji] = (contagem[r.emoji] ?? 0) + 1;
  }
  return contagem;
}

function reacaoDoUsuario(reacoes: Reacao[] | undefined, pedidoId: string, userId: string) {
  return reacoes?.find((r) => r.pedido_id === pedidoId && r.user_id === userId)?.emoji;
}

function CartaoPedido({
  pedido,
  userId,
  podeRemover,
  souAdministrador,
  podeResponder,
  reacoes,
  respostas,
  onRemover,
  onFixar,
  onReagir,
  onResponder,
  onRemoverResposta,
}: {
  pedido: PedidoOracao;
  userId: string | undefined;
  podeRemover: boolean;
  souAdministrador: boolean;
  podeResponder: boolean;
  reacoes: Reacao[] | undefined;
  respostas: RespostaPedido[] | undefined;
  onRemover: () => void;
  onFixar: () => void;
  onReagir: (emoji: string) => void;
  onResponder: (texto: string) => Promise<void>;
  onRemoverResposta: (respostaId: string) => void;
}) {
  const destacado = pedido.papel === "administrador" || pedido.papel === "intercessor";
  const contagem = contarReacoes(reacoes, pedido.id);
  const minhaReacao = userId ? reacaoDoUsuario(reacoes, pedido.id, userId) : undefined;
  const respostasDoPedido = respostas?.filter((r) => r.pedido_id === pedido.id) ?? [];

  const [mostrarCaixaResposta, setMostrarCaixaResposta] = useState(false);
  const [textoResposta, setTextoResposta] = useState("");
  const [enviandoResposta, setEnviandoResposta] = useState(false);

  const enviarResposta = async () => {
    setEnviandoResposta(true);
    await onResponder(textoResposta);
    setEnviandoResposta(false);
    setTextoResposta("");
    setMostrarCaixaResposta(false);
  };

  return (
    <div
      className={`rounded-xl border p-3 ${
        destacado ? "border-red-300 bg-red-50/70" : "border-border/70 bg-card"
      }`}
      style={sombra3d}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="flex flex-wrap items-baseline gap-x-2">
            <p className={`text-sm font-medium ${destacado ? "text-red-700" : "text-primary"}`}>
              {pedido.nome}
            </p>
            {destacado && (
              <span className="rounded-full bg-red-600 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-white">
                Intercessor
              </span>
            )}
            <span className="text-xs text-muted-foreground">
              {tempoRelativo(pedido.created_at)}
            </span>
          </div>
          <p className="mt-0.5 text-sm leading-snug text-foreground/85">{pedido.texto}</p>
        </div>
        <div className="flex shrink-0 items-center gap-1">
          {souAdministrador && (
            <button
              type="button"
              onClick={onFixar}
              aria-label={pedido.fixado ? "Desafixar pedido" : "Fixar pedido"}
              title={pedido.fixado ? "Desafixar pedido" : "Fixar pedido"}
              className="rounded-full p-1.5 text-muted-foreground transition-colors hover:bg-secondary hover:text-primary"
            >
              {pedido.fixado ? <PinOff className="h-4 w-4" /> : <Pin className="h-4 w-4" />}
            </button>
          )}
          {podeRemover && (
            <button
              type="button"
              onClick={onRemover}
              aria-label="Remover pedido"
              title="Remover pedido"
              className="rounded-full p-1.5 text-muted-foreground transition-colors hover:bg-secondary hover:text-destructive"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>

      <div className="mt-2 flex flex-wrap items-center gap-1.5">
        {EMOJIS_DISPONIVEIS.map((emoji) => {
          const quantidade = contagem[emoji] ?? 0;
          const ativo = minhaReacao === emoji;
          return (
            <button
              key={emoji}
              type="button"
              onClick={() => onReagir(emoji)}
              className={`flex items-center gap-1 rounded-full border px-2 py-0.5 text-xs transition-colors ${
                ativo
                  ? "border-accent bg-accent/20 text-primary"
                  : "border-border/60 text-muted-foreground hover:bg-secondary"
              }`}
            >
              <span>{emoji}</span>
              {quantidade > 0 && <span>{quantidade}</span>}
            </button>
          );
        })}

        {podeResponder && (
          <button
            type="button"
            onClick={() => setMostrarCaixaResposta((v) => !v)}
            className="flex items-center gap-1 rounded-full border border-border/60 px-2 py-0.5 text-xs text-muted-foreground transition-colors hover:bg-secondary"
          >
            <MessageCircle className="h-3.5 w-3.5" />
            Responder
          </button>
        )}
      </div>

      {respostasDoPedido.length > 0 && (
        <div className="mt-2 space-y-2 border-l-2 border-red-300 pl-3">
          {respostasDoPedido.map((resposta) => (
            <div key={resposta.id} className="flex items-start justify-between gap-2">
              <div className="min-w-0">
                <div className="flex flex-wrap items-baseline gap-x-2">
                  <p className="text-xs font-medium text-red-700">{resposta.nome}</p>
                  <span className="text-[11px] text-muted-foreground">
                    {tempoRelativo(resposta.created_at)}
                  </span>
                </div>
                <p className="text-sm leading-snug text-foreground/85">{resposta.texto}</p>
              </div>
              {(souAdministrador || resposta.user_id === userId) && (
                <button
                  type="button"
                  onClick={() => onRemoverResposta(resposta.id)}
                  aria-label="Remover resposta"
                  title="Remover resposta"
                  className="shrink-0 rounded-full p-1 text-muted-foreground transition-colors hover:bg-secondary hover:text-destructive"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              )}
            </div>
          ))}
        </div>
      )}

      {mostrarCaixaResposta && (
        <div className="mt-2 border-l-2 border-red-300 pl-3">
          <textarea
            value={textoResposta}
            onChange={(e) => setTextoResposta(e.target.value)}
            placeholder="Responder como equipe do devocional..."
            rows={2}
            className="w-full resize-none rounded-lg border border-border/60 bg-background/60 p-2 text-sm text-foreground outline-none focus:border-accent/50"
          />
          <div className="mt-1.5 flex justify-end gap-2">
            <button
              type="button"
              onClick={() => {
                setMostrarCaixaResposta(false);
                setTextoResposta("");
              }}
              className="rounded-full px-3 py-1 text-xs text-muted-foreground hover:bg-secondary"
            >
              Cancelar
            </button>
            <button
              type="button"
              disabled={enviandoResposta || !textoResposta.trim()}
              onClick={enviarResposta}
              className="rounded-full bg-red-600 px-3 py-1 text-xs text-white transition-colors hover:bg-red-700 disabled:opacity-50"
            >
              {enviandoResposta ? "Enviando…" : "Enviar resposta"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export function MuralPedidosOracao() {
  const { user } = useAuth();
  const { data: perfil } = usePerfil(user?.id);
  const { data: pedidos, isLoading } = usePedidosOracao();
  const { data: reacoes } = useReacoesPedidos();
  const { data: respostas } = useRespostasPedidos();
  const { publicar, publicando } = usePublicarPedido();
  const remover = useRemoverPedido();
  const fixar = useFixarPedido();
  const reagir = useReagir();
  const { responder } = useResponderPedido();
  const removerResposta = useRemoverResposta();
  const [texto, setTexto] = useState("");
  const [temNovoPedido, setTemNovoPedido] = useState(false);

  const listaRef = useRef<HTMLDivElement>(null);
  const primeiroIdRef = useRef<string | null>(null);

  const souAdministrador = perfil?.papel === "administrador";
  const podeResponder = podeResponderPedidos(perfil?.papel);

  const pedidoFixado = pedidos?.find((p) => p.fixado);
  const pedidosDaLista = pedidos?.filter((p) => !p.fixado) ?? [];

  // Auto-rolagem: se a pessoa está perto do topo (lendo os mais novos),
  // rola sozinho para o pedido mais recente. Se ela rolou para baixo
  // (lendo pedidos antigos), só avisa que chegou algo novo, sem
  // atrapalhar a leitura.
  useEffect(() => {
    const novoPrimeiroId = pedidosDaLista[0]?.id ?? null;
    const mudou = novoPrimeiroId && novoPrimeiroId !== primeiroIdRef.current;
    const jaTinhaCarregado = primeiroIdRef.current !== null;

    if (mudou && jaTinhaCarregado) {
      const container = listaRef.current;
      const pertoDoTopo = !container || container.scrollTop < 60;
      if (pertoDoTopo) {
        container?.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        setTemNovoPedido(true);
      }
    }
    primeiroIdRef.current = novoPrimeiroId;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pedidosDaLista[0]?.id]);

  const irParaONovo = () => {
    listaRef.current?.scrollTo({ top: 0, behavior: "smooth" });
    setTemNovoPedido(false);
  };

  const enviarPedido = async () => {
    if (!user) return;
    const nome = (user.user_metadata?.["full_name"] as string | undefined) ?? "Um membro";
    const papel = perfil?.papel ?? "membro";
    const resultado = await publicar(user.id, nome, papel, texto);
    if (resultado.erro) {
      toast.error("Não conseguimos publicar seu pedido agora. Tente novamente.");
      return;
    }
    setTexto("");
    listaRef.current?.scrollTo({ top: 0, behavior: "smooth" });
  };

  const removerPedido = async (id: string) => {
    const resultado = await remover(id);
    if (resultado.erro) toast.error("Não conseguimos remover este pedido agora.");
  };

  const fixarPedido = async (id: string, jaFixado: boolean) => {
    const resultado = await fixar(id, jaFixado);
    if (resultado.erro) toast.error("Não conseguimos fixar este pedido agora.");
  };

  const reagirAoPedido = async (pedidoId: string, emoji: string) => {
    if (!user) return;
    const atual = reacaoDoUsuario(reacoes, pedidoId, user.id);
    const resultado = await reagir(pedidoId, user.id, emoji, atual);
    if (resultado.erro) toast.error("Não conseguimos registrar sua reação agora.");
  };

  const responderPedido = async (pedidoId: string, texto: string) => {
    if (!user) return;
    const nome = (user.user_metadata?.["full_name"] as string | undefined) ?? "Equipe";
    const resultado = await responder(pedidoId, user.id, nome, texto);
    if (resultado.erro) toast.error("Não conseguimos publicar a resposta agora.");
  };

  const removerRespostaPedido = async (respostaId: string) => {
    const resultado = await removerResposta(respostaId);
    if (resultado.erro) toast.error("Não conseguimos remover esta resposta agora.");
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

      {pedidoFixado && (
        <div
          className="relative mx-auto mt-6 rounded-xl border-2 border-accent bg-accent/10 p-3"
          style={sombra3d}
        >
          <div className="mb-1 flex items-center gap-1.5">
            <Pin className="h-3.5 w-3.5 text-accent" />
            <span className="text-[10px] font-semibold uppercase tracking-wide text-accent">
              Fixado
            </span>
          </div>
          <CartaoPedido
            pedido={pedidoFixado}
            userId={user?.id}
            podeRemover={Boolean(user && (user.id === pedidoFixado.user_id || souAdministrador))}
            souAdministrador={souAdministrador}
            podeResponder={podeResponder}
            reacoes={reacoes}
            respostas={respostas}
            onRemover={() => removerPedido(pedidoFixado.id)}
            onFixar={() => fixarPedido(pedidoFixado.id, pedidoFixado.fixado)}
            onReagir={(emoji) => reagirAoPedido(pedidoFixado.id, emoji)}
            onResponder={(texto) => responderPedido(pedidoFixado.id, texto)}
            onRemoverResposta={removerRespostaPedido}
          />
        </div>
      )}

      <div className="relative mt-4">
        {temNovoPedido && (
          <button
            type="button"
            onClick={irParaONovo}
            className="absolute left-1/2 top-2 z-10 flex -translate-x-1/2 items-center gap-1.5 rounded-full bg-primary px-4 py-1.5 text-xs text-primary-foreground shadow-md ring-1 ring-accent/50"
          >
            <ArrowUp className="h-3.5 w-3.5" />
            Novo pedido chegou
          </button>
        )}

        <div
          ref={listaRef}
          className="max-h-[26rem] space-y-2 overflow-y-auto rounded-2xl border border-border/50 bg-background/40 p-3 sm:max-h-[30rem]"
        >
          {isLoading && <p className="text-center text-sm text-muted-foreground">Carregando…</p>}

          {!isLoading && pedidosDaLista.length === 0 && !pedidoFixado && (
            <p className="text-center text-sm text-muted-foreground">
              Ainda não há pedidos publicados. Seja o primeiro a compartilhar.
            </p>
          )}

          {pedidosDaLista.map((pedido) => (
            <CartaoPedido
              key={pedido.id}
              pedido={pedido}
              userId={user?.id}
              podeRemover={Boolean(user && (user.id === pedido.user_id || souAdministrador))}
              souAdministrador={souAdministrador}
              podeResponder={podeResponder}
              reacoes={reacoes}
              respostas={respostas}
              onRemover={() => removerPedido(pedido.id)}
              onFixar={() => fixarPedido(pedido.id, pedido.fixado)}
              onReagir={(emoji) => reagirAoPedido(pedido.id, emoji)}
              onResponder={(texto) => responderPedido(pedido.id, texto)}
              onRemoverResposta={removerRespostaPedido}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
