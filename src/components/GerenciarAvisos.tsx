import { useState } from "react";
import { toast } from "sonner";
import { Trash2 } from "lucide-react";
import {
  useAvisos,
  useCriarAviso,
  useAlternarAviso,
  useRemoverAviso,
  type PublicoAviso,
} from "@/hooks/useAvisos";
import type { TipoAviso } from "@/lib/avisos";
import { sombra3d } from "@/lib/estilo3d";

const OPCOES_TIPO: { valor: TipoAviso; rotulo: string }[] = [
  { valor: "comunicado", rotulo: "Comunicado" },
  { valor: "noticia", rotulo: "Notícia" },
  { valor: "aviso", rotulo: "Aviso" },
  { valor: "alerta", rotulo: "Alerta" },
];

const OPCOES_PUBLICO: { valor: PublicoAviso; rotulo: string }[] = [
  { valor: "todos", rotulo: "Todos" },
  { valor: "novos_membros", rotulo: "Novos membros (boas-vindas)" },
  { valor: "membros", rotulo: "Todos os membros" },
];

// Gerenciamento de avisos — exibido no Dashboard, só para administrador.
// Cria, ativa/desativa e remove os avisos que aparecem no painel do topo
// do app (PainelAvisos.tsx) para todo mundo logado.
export function GerenciarAvisos() {
  const { data: avisos, isLoading } = useAvisos();
  const criarAviso = useCriarAviso();
  const alternarAviso = useAlternarAviso();
  const removerAviso = useRemoverAviso();

  const [tipo, setTipo] = useState<TipoAviso>("comunicado");
  const [publico, setPublico] = useState<PublicoAviso>("todos");
  const [titulo, setTitulo] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [publicando, setPublicando] = useState(false);

  const publicar = async () => {
    if (!titulo.trim() || !mensagem.trim()) return;
    setPublicando(true);
    const resultado = await criarAviso(tipo, titulo.trim(), mensagem.trim(), publico);
    setPublicando(false);
    if (resultado.erro) {
      toast.error("Não conseguimos publicar o aviso agora. Tente novamente.");
      return;
    }
    setTitulo("");
    setMensagem("");
  };

  const alternar = async (id: string, ativoAtual: boolean) => {
    const resultado = await alternarAviso(id, !ativoAtual);
    if (resultado.erro) toast.error("Não conseguimos atualizar este aviso agora.");
  };

  const remover = async (id: string) => {
    const resultado = await removerAviso(id);
    if (resultado.erro) toast.error("Não conseguimos remover este aviso agora.");
  };

  return (
    <div className="rounded-2xl border border-accent/30 bg-card p-5" style={sombra3d}>
      <p className="text-xs uppercase tracking-wide text-muted-foreground">Gerenciar avisos</p>

      <div className="mt-3 space-y-2">
        <select
          value={tipo}
          onChange={(e) => setTipo(e.target.value as TipoAviso)}
          className="w-full rounded-lg border border-border/60 bg-background/60 p-2 text-sm text-foreground outline-none focus:border-accent/50"
        >
          {OPCOES_TIPO.map((opcao) => (
            <option key={opcao.valor} value={opcao.valor}>
              {opcao.rotulo}
            </option>
          ))}
        </select>
        <select
          value={publico}
          onChange={(e) => setPublico(e.target.value as PublicoAviso)}
          className="w-full rounded-lg border border-border/60 bg-background/60 p-2 text-sm text-foreground outline-none focus:border-accent/50"
        >
          {OPCOES_PUBLICO.map((opcao) => (
            <option key={opcao.valor} value={opcao.valor}>
              {opcao.rotulo}
            </option>
          ))}
        </select>
        <input
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
          placeholder="Título do aviso"
          className="w-full rounded-lg border border-border/60 bg-background/60 p-2 text-sm text-foreground outline-none focus:border-accent/50"
        />
        <textarea
          value={mensagem}
          onChange={(e) => setMensagem(e.target.value)}
          placeholder="Mensagem"
          rows={2}
          className="w-full resize-none rounded-lg border border-border/60 bg-background/60 p-2 text-sm text-foreground outline-none focus:border-accent/50"
        />
        <div className="flex justify-end">
          <button
            type="button"
            disabled={publicando || !titulo.trim() || !mensagem.trim()}
            onClick={publicar}
            className="rounded-full bg-primary px-5 py-2 text-sm text-primary-foreground ring-1 ring-accent/50 transition-colors hover:bg-navy-soft disabled:opacity-50"
          >
            {publicando ? "Publicando…" : "Publicar aviso"}
          </button>
        </div>
      </div>

      <div className="mt-4 space-y-2 border-t border-border/50 pt-4">
        {isLoading && <p className="text-sm text-muted-foreground">Carregando…</p>}
        {!isLoading && avisos?.length === 0 && (
          <p className="text-sm text-muted-foreground">Nenhum aviso criado ainda.</p>
        )}
        {avisos?.map((aviso) => (
          <div
            key={aviso.id}
            className="flex items-start justify-between gap-2 rounded-lg border border-border/50 p-2.5"
          >
            <div className="min-w-0">
              <p className="text-xs font-medium text-muted-foreground">
                {OPCOES_TIPO.find((o) => o.valor === aviso.tipo)?.rotulo}
                {" · "}
                {OPCOES_PUBLICO.find((o) => o.valor === aviso.publico)?.rotulo}
                {!aviso.ativo && " · desativado"}
              </p>
              <p className="truncate text-sm font-medium text-primary">{aviso.titulo}</p>
            </div>
            <div className="flex shrink-0 items-center gap-1">
              <button
                type="button"
                onClick={() => alternar(aviso.id, aviso.ativo)}
                className="rounded-full px-2.5 py-1 text-xs text-muted-foreground transition-colors hover:bg-secondary"
              >
                {aviso.ativo ? "Desativar" : "Ativar"}
              </button>
              <button
                type="button"
                onClick={() => remover(aviso.id)}
                aria-label="Remover aviso"
                title="Remover aviso"
                className="rounded-full p-1.5 text-muted-foreground transition-colors hover:bg-secondary hover:text-destructive"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
