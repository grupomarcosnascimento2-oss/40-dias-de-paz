import { Heart } from "lucide-react";
import { sombra3d } from "@/lib/estilo3d";

const LINK_DEVOCIONAL = "https://rezandocomesperanca40dias.lovable.app/";

const MENSAGEM_CONVITE = `Oi! ❤️

Quero compartilhar uma coisa que tem feito diferença de verdade na minha vida: um devocional de 40 dias de oração, com a voz do Marcos Nascimento, que uso todo dia há um tempo.

Não é só mais um app — tem um espaço de pedidos de oração onde a gente realmente sente que não está sozinho, e cada dia é rapidinho, não pesa na rotina.

Pensei em você porque me importo com você, e queria te convidar a experimentar também — o primeiro dia é gratuito: ${LINK_DEVOCIONAL}

Se fizer sentido pra você, vai ser uma alegria caminhar isso junto. 🙏`;

// Modal de convite que aparece logo depois da pessoa concluir um dia —
// esse é o momento em que a gratidão está mais presente, e é quando uma
// indicação para alguém amado tem mais chance de ser genuína (não um
// pedido de "divulgação" frio).
export function ModalConviteAposDia({ onContinuar }: { onContinuar: () => void }) {
  const compartilhar = async () => {
    if (navigator.share) {
      try {
        await navigator.share({ text: MENSAGEM_CONVITE });
      } catch {
        // Pessoa cancelou o compartilhamento — sem problema, não faz nada.
      }
      return;
    }
    // Navegadores sem suporte ao compartilhamento nativo (raro, mas
    // acontece em alguns desktops): abre o WhatsApp Web com o texto
    // já pronto, como alternativa.
    window.open(`https://wa.me/?text=${encodeURIComponent(MENSAGEM_CONVITE)}`, "_blank");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-primary/60 px-6 backdrop-blur-sm">
      <div
        className="paper w-full max-w-sm rounded-[2rem] border border-accent/30 p-7 text-center"
        style={sombra3d}
      >
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
          <Heart className="h-5 w-5" />
        </div>
        <h2 className="mt-4 text-2xl text-primary">Mais um dia concluído 🙏</h2>
        <p className="mt-3 text-sm text-foreground/80">
          Existe alguém que você ama que também poderia se alegrar com essa jornada. Que tal
          convidar essa pessoa agora?
        </p>

        <button
          type="button"
          onClick={compartilhar}
          className="mt-6 w-full rounded-full bg-accent px-6 py-3 font-semibold text-accent-foreground ring-1 ring-accent/50 transition-colors hover:bg-accent/90"
        >
          Convidar alguém que eu amo
        </button>
        <button
          type="button"
          onClick={onContinuar}
          className="mt-3 w-full rounded-full px-6 py-2.5 text-sm text-muted-foreground transition-colors hover:bg-secondary"
        >
          Continuar minha jornada
        </button>
      </div>
    </div>
  );
}
