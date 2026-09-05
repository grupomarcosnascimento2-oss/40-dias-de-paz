import { useEffect, useState, type ReactNode } from "react";
import { Link, useLocation, useNavigate } from "@tanstack/react-router";
import { ChevronsLeft, ChevronsRight, LogOut, Menu, X } from "lucide-react";
import { Cruz } from "./Ornamento";
import { MuralTopo } from "./MuralTopo";
import { PainelAvisos } from "./PainelAvisos";
import { SugestaoInstalarApp } from "./SugestaoInstalarApp";
import { SugestaoNotificacoes } from "./SugestaoNotificacoes";
import { sombra3d } from "@/lib/estilo3d";
import { CONTROLE_DE_PERFIL_HABILITADO, type Papel } from "@/lib/perfis";
import { useAuth, sair } from "@/hooks/useAuth";
import { usePerfil } from "@/hooks/usePerfil";
import { useRastrearPresenca } from "@/hooks/usePresencaGlobal";

type ItemMenu = {
  numero: string;
  titulo: string;
  subtitulo?: string;
  to: string;
  filhos?: ItemMenu[];
  // Quando ausente, o item é visível para qualquer perfil. Só passa a
  // valer de fato quando CONTROLE_DE_PERFIL_HABILITADO for true — até lá,
  // qualquer item restrito simplesmente não aparece para ninguém, para
  // não mudar o comportamento atual do app.
  papeis?: Papel[];
};

const menu: ItemMenu[] = [
  {
    numero: "1",
    titulo: "Dashboard",
    to: "/admin",
    papeis: ["administrador"],
  },
  {
    numero: "2",
    titulo: "Introdução",
    subtitulo: "Uma jornada de 40 dias com Deus",
    to: "/introducao",
  },
  {
    numero: "3",
    titulo: "Apresentação",
    subtitulo: "Quem é Marcos Nascimento",
    to: "/apresentacao",
    filhos: [
      {
        numero: "3.1",
        titulo: "Minha caminhada com Deus e com a Igreja",
        to: "/apresentacao/caminhada",
      },
      {
        numero: "3.2",
        titulo: "Família, fé e experiências vividas",
        to: "/apresentacao/familia",
      },
    ],
  },
  {
    numero: "4",
    titulo: "A força da oração na minha caminhada",
    to: "/forca-da-oracao",
  },
  {
    numero: "5",
    titulo: "Uma palavra ao leitor",
    to: "/palavra-ao-leitor",
  },
  {
    numero: "6",
    titulo: "Por que 40 dias?",
    subtitulo: "O significado bíblico do número 40",
    to: "/por-que-40-dias",
  },
  {
    numero: "7",
    titulo: "Como viver esta jornada de 40 dias",
    to: "/como-viver",
  },
  {
    numero: "8",
    titulo: "Os 40 Dias de Oração",
    to: "/jornada",
  },
];

const CHAVE_EXPANDIDO = "sidebar_expandido";

function ItemLink({
  item,
  expandido,
  pathname,
  sub,
  onNavigate,
}: {
  item: ItemMenu;
  expandido: boolean;
  pathname: string;
  sub?: boolean;
  onNavigate: () => void;
}) {
  const estaAtivo = pathname === item.to || pathname.startsWith(`${item.to}/`);

  return (
    <Link
      to={item.to}
      onClick={onNavigate}
      title={!expandido ? item.titulo : undefined}
      className={`flex items-start gap-3 rounded-xl px-3 py-2.5 transition-colors ${
        estaAtivo
          ? "bg-primary text-primary-foreground"
          : "text-foreground/85 hover:bg-secondary/70"
      } ${sub ? "text-[13px]" : "text-sm"} ${expandido ? "" : "justify-center"}`}
    >
      <span
        className={`shrink-0 pt-0.5 text-xs font-semibold ${
          estaAtivo ? "text-accent-foreground/90" : "text-accent"
        }`}
      >
        {item.numero}
      </span>
      {expandido && (
        <span className="min-w-0 flex-1">
          <span className="block leading-snug">{item.titulo}</span>
          {item.subtitulo && (
            <span
              className={`mt-0.5 block truncate text-[11px] leading-snug ${
                estaAtivo ? "text-primary-foreground/75" : "text-muted-foreground"
              }`}
            >
              {item.subtitulo}
            </span>
          )}
        </span>
      )}
    </Link>
  );
}

export function AppShell({ children }: { children: ReactNode }) {
  const { pathname } = useLocation();
  const [expandido, setExpandido] = useState(true);
  const [abertoMobile, setAbertoMobile] = useState(false);

  // Perfil do usuário — só é buscado de fato quando o controle de perfil
  // estiver habilitado. Enquanto estiver desligado, "papel" fica undefined
  // e o menu mostra só os itens sem restrição (ou seja, o menu de hoje,
  // sem nenhuma mudança).
  const { user } = useAuth();
  const { data: perfil } = usePerfil(CONTROLE_DE_PERFIL_HABILITADO ? user?.id : undefined);
  const papel: Papel | undefined = CONTROLE_DE_PERFIL_HABILITADO ? perfil?.papel : undefined;
  useRastrearPresenca(
    user?.id,
    papel,
    (user?.user_metadata?.["full_name"] as string | undefined) ?? undefined,
  );

  const menuVisivel = menu.filter((item) => !item.papeis || (papel && item.papeis.includes(papel)));

  useEffect(() => {
    const salvo = window.localStorage.getItem(CHAVE_EXPANDIDO);
    if (salvo !== null) setExpandido(salvo === "1");
  }, []);

  const alternarExpandido = () => {
    setExpandido((atual) => {
      const novo = !atual;
      window.localStorage.setItem(CHAVE_EXPANDIDO, novo ? "1" : "0");
      return novo;
    });
  };

  const fecharMobile = () => setAbertoMobile(false);
  const navigate = useNavigate();

  const sairDaConta = async () => {
    await sair();
    navigate({ to: "/entrar" });
  };

  return (
    <div className="min-h-screen">
      {/* Botão flutuante — abre o menu no celular. Não é uma barra fixa no topo. */}
      <button
        type="button"
        onClick={() => setAbertoMobile(true)}
        aria-label="Abrir menu"
        className="fixed left-4 top-0 z-40 flex h-11 w-11 items-center justify-center rounded-full bg-primary text-primary-foreground ring-1 ring-accent/50 md:hidden"
        style={sombra3d}
      >
        <Menu className="h-5 w-5" />
      </button>

      {/* Fundo escurecido atrás do menu, só no celular */}
      {abertoMobile && (
        <div
          className="fixed inset-0 z-40 bg-[color:var(--navy)]/40 backdrop-blur-sm md:hidden"
          onClick={fecharMobile}
          aria-hidden="true"
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex flex-col overflow-y-auto border-r border-accent/25 bg-gradient-to-b from-card to-secondary/40 transition-transform duration-300 md:translate-x-0 ${
          abertoMobile ? "translate-x-0" : "-translate-x-full"
        } ${expandido ? "w-72" : "w-[4.5rem]"}`}
        style={sombra3d}
      >
        <div className="flex items-center justify-between gap-2 px-3 py-4">
          {expandido && (
            <div className="flex min-w-0 items-center gap-2 pl-1">
              <Cruz className="h-4 w-4 shrink-0 text-accent" />
              <span className="script truncate text-lg text-accent">40 Dias</span>
            </div>
          )}
          <button
            type="button"
            onClick={fecharMobile}
            aria-label="Fechar menu"
            className="rounded-full p-2 text-muted-foreground transition-colors hover:bg-secondary md:hidden"
          >
            <X className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={alternarExpandido}
            aria-label={expandido ? "Recolher menu" : "Expandir menu"}
            className={`hidden rounded-full p-2 text-muted-foreground transition-colors hover:bg-secondary md:inline-flex ${
              expandido ? "" : "mx-auto"
            }`}
          >
            {expandido ? (
              <ChevronsLeft className="h-5 w-5" />
            ) : (
              <ChevronsRight className="h-5 w-5" />
            )}
          </button>
        </div>

        <nav className="flex-1 space-y-1 px-2 pb-6">
          {menuVisivel.map((item) => (
            <div key={item.numero}>
              <ItemLink
                item={item}
                expandido={expandido}
                pathname={pathname}
                onNavigate={fecharMobile}
              />
              {item.filhos && expandido && (
                <div className="ml-4 mt-1 space-y-1 border-l border-accent/20 pl-3">
                  {item.filhos.map((filho) => (
                    <ItemLink
                      key={filho.numero}
                      item={filho}
                      expandido={expandido}
                      pathname={pathname}
                      sub
                      onNavigate={fecharMobile}
                    />
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>

        {user && (
          <div className="border-t border-accent/20 px-2 py-3">
            <button
              type="button"
              onClick={sairDaConta}
              className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-muted-foreground transition-colors hover:bg-secondary hover:text-primary ${
                expandido ? "" : "justify-center"
              }`}
              title="Sair da conta"
            >
              <LogOut className="h-4 w-4 shrink-0" />
              {expandido && <span>Sair da conta</span>}
            </button>
          </div>
        )}
      </aside>

      <div
        className={`min-h-screen pt-11 transition-[margin] duration-300 md:pt-0 ${
          expandido ? "md:ml-72" : "md:ml-[4.5rem]"
        }`}
      >
        <MuralTopo />
        <PainelAvisos papel={papel} tornouSeMembroEm={perfil?.tornou_se_membro_em} />
        <SugestaoInstalarApp />
        <SugestaoNotificacoes />
        {children}
      </div>
    </div>
  );
}
