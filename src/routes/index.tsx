import { createFileRoute, Link } from "@tanstack/react-router";
import capa from "@/assets/capa-devocional.jpg";
import { Ornamento, Cruz } from "@/components/Ornamento";
import { areas } from "@/lib/devocional";

const titulo = "40 Dias Rezando com Marcos Nascimento";
const descricao =
  "Um devocional de 40 dias para fortalecer a fé em todas as circunstâncias da vida: Palavra, oração em áudio e um propósito simples a cada dia.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "40 Dias Rezando com Marcos Nascimento — Devocional" },
      { name: "description", content: descricao },
      { property: "og:title", content: titulo },
      { property: "og:description", content: descricao },
    ],
  }),
  component: Inicio,
});

function Inicio() {
  return (
    <div className="min-h-screen">
      <main>
        <section className="mx-auto grid max-w-5xl items-center gap-12 px-6 py-16 sm:py-24 md:grid-cols-2">
          <div className="order-2 md:order-1">
            <p className="script text-3xl text-accent">Um convite à oração</p>
            <h1 className="mt-2 text-5xl leading-[1.05] sm:text-6xl">
              <span className="block font-bold">40</span>
              <span className="block text-accent">Dias</span>
              <span className="script block text-5xl sm:text-6xl">Rezando</span>
              <span className="mt-3 block text-xl font-normal text-primary/80 sm:text-2xl">
                com <span className="script text-accent">Marcos Nascimento</span>
              </span>
            </h1>

            <Ornamento className="my-7 justify-start" />

            <p className="max-w-md text-lg text-foreground/85">
              Um devocional para fortalecer a fé em todas as circunstâncias da vida. Quarenta dias
              simples, um de cada vez, com a Palavra de Deus, uma oração em áudio e um propósito
              para levar no coração.
            </p>
            <p className="mt-4 max-w-md text-foreground/75">
              Não é uma tarefa a cumprir. É um espaço reservado para você respirar, rezar e
              descansar em Deus — mesmo nos dias mais apertados.
            </p>

            <Link
              to="/entrar"
              className="mt-9 inline-flex items-center gap-3 rounded-full bg-primary px-8 py-4 text-primary-foreground shadow-[var(--shadow-sacred)] ring-1 ring-accent/50 transition-colors hover:bg-navy-soft"
            >
              <Cruz className="h-4 w-4 text-accent" />
              Iniciar minha jornada de 40 dias
            </Link>
          </div>

          <div className="order-1 md:order-2">
            <img
              src={capa}
              width={1024}
              height={1280}
              alt="Marcos Nascimento em oração, com as mãos postas diante de uma cruz dourada"
              className="mx-auto w-full max-w-sm rounded-2xl border border-accent/40 shadow-[var(--shadow-sacred)]"
            />
          </div>
        </section>

        <section className="mx-auto max-w-4xl px-6 pb-24">
          <Ornamento className="mb-10" />
          <h2 className="text-center text-3xl">Oito áreas para a sua caminhada</h2>
          <p className="mt-3 text-center text-muted-foreground">
            Cinco dias em cada uma delas, para percorrer com calma.
          </p>
          <ul className="mt-10 grid gap-4 sm:grid-cols-2">
            {areas.map((area, i) => (
              <li
                key={area.nome}
                className="paper rounded-2xl border border-border/70 p-5 shadow-[var(--shadow-card)]"
              >
                <p className="text-xs uppercase tracking-[0.22em] text-accent">
                  Dias {i * 5 + 1}–{i * 5 + 5}
                </p>
                <h3 className="mt-1 text-xl">{area.nome}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{area.descricao}</p>
              </li>
            ))}
          </ul>
        </section>
      </main>

      <footer className="border-t border-border/60 py-8 text-center text-sm text-muted-foreground">
        <Cruz className="mx-auto mb-3 h-3.5 w-3.5 text-accent" />
        <p>40 Dias Rezando com Marcos Nascimento</p>
        <p className="mt-1">Que a paz de Deus esteja com você.</p>
      </footer>
    </div>
  );
}
