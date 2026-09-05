import { useListaPresenca } from "@/hooks/usePresencaGlobal";
import { sombra3d } from "@/lib/estilo3d";

const ROTULO_PAPEL: Record<string, string> = {
  administrador: "Administrador",
  intercessor: "Intercessor",
  membro: "Membro",
  visitante: "Visitante",
};

// Lista de quem está conectado agora, com nome (quando a pessoa já
// logou) e papel. Visitantes que ainda nem fizeram login (ex: só
// abriram a tela de entrada) aparecem sem nome, porque nesse momento o
// sistema realmente não sabe quem são.
export function PessoasConectadas() {
  const lista = useListaPresenca(true);

  return (
    <div className="rounded-2xl border border-accent/30 bg-card p-5" style={sombra3d}>
      <p className="text-xs uppercase tracking-wide text-muted-foreground">
        Quem está conectado agora
      </p>

      <div className="mt-3 space-y-1.5">
        {lista.length === 0 && (
          <p className="text-sm text-muted-foreground">Ninguém conectado no momento.</p>
        )}

        {lista.map((pessoa, indice) => (
          <div
            key={`${pessoa.user_id}_${indice}`}
            className="flex items-center justify-between gap-2 rounded-lg border border-border/50 px-3 py-2"
          >
            <p className="truncate text-sm text-foreground/85">
              {pessoa.nome ?? <span className="italic text-muted-foreground">Sem nome ainda</span>}
            </p>
            <span className="shrink-0 rounded-full bg-accent/15 px-2 py-0.5 text-xs font-medium text-accent">
              {ROTULO_PAPEL[pessoa.papel] ?? pessoa.papel}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
