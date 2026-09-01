const {
  Document,
  Packer,
  Paragraph,
  TextRun,
  HeadingLevel,
  AlignmentType,
  BorderStyle,
  LevelFormat,
  convertInchesToTwip,
} = require("docx");
const fs = require("fs");

const NAVY = "2C3E50";
const ACCENT = "8A5A2B";
const VERDE = "2E7D32";
const CINZA = "6B6B6B";

const STATUS = {
  FEITO: { texto: "✅ Implementado", cor: VERDE },
  PARCIAL: { texto: "🔶 Parcial", cor: ACCENT },
  PLANEJADO: { texto: "⬜ Planejado", cor: CINZA },
};

function h1(numero, titulo) {
  return new Paragraph({
    heading: HeadingLevel.HEADING_1,
    spacing: { before: 480, after: 200 },
    border: { bottom: { style: BorderStyle.SINGLE, size: 8, color: ACCENT, space: 6 } },
    children: [new TextRun({ text: `${numero}. ${titulo}`, bold: true, color: NAVY })],
  });
}

function h2(texto) {
  return new Paragraph({
    heading: HeadingLevel.HEADING_2,
    spacing: { before: 260, after: 100 },
    children: [new TextRun({ text: texto, bold: true, color: ACCENT })],
  });
}

function p(texto, opts = {}) {
  return new Paragraph({
    spacing: { after: 160, line: 300 },
    alignment: AlignmentType.JUSTIFIED,
    children: [new TextRun({ text: texto, ...opts })],
  });
}

function bullet(texto) {
  return new Paragraph({
    numbering: { reference: "lista-padrao", level: 0 },
    spacing: { after: 80, line: 280 },
    children: [new TextRun({ text: texto, size: 21 })],
  });
}

// Renderiza uma história de usuário completa: ID, enunciado, status e
// critérios de aceite.
function historia(id, persona, quero, para, criterios, status) {
  const s = STATUS[status];
  return [
    new Paragraph({
      spacing: { before: 220, after: 60 },
      children: [
        new TextRun({ text: `${id} — `, bold: true, color: NAVY }),
        new TextRun({ text: s.texto, bold: true, color: s.cor, size: 19 }),
      ],
    }),
    new Paragraph({
      spacing: { after: 80, line: 290 },
      children: [
        new TextRun({ text: `Como ${persona}, `, italics: true }),
        new TextRun({ text: `quero ${quero}, `, bold: true }),
        new TextRun({ text: `para ${para}.`, italics: true }),
      ],
    }),
    ...criterios.map(
      (c) =>
        new Paragraph({
          numbering: { reference: "lista-criterios", level: 0 },
          spacing: { after: 40, line: 260 },
          children: [new TextRun({ text: c, size: 20, color: "444444" })],
        }),
    ),
  ];
}

// ---------------------------------------------------------------------
// Conteúdo: uma história por vez, agrupada por área funcional
// ---------------------------------------------------------------------

const secoes = [
  {
    numero: "1",
    titulo: "Autenticação e Perfis de Usuário",
    historias: [
      [
        "US-01.01",
        "visitante",
        "entrar com minha conta Google",
        "acessar o devocional sem precisar criar uma senha nova",
        ["Botão \"Continuar com Google\" na tela de login.", "Sessão persiste entre visitas."],
        "FEITO",
      ],
      [
        "US-01.02",
        "visitante",
        "entrar com minha conta Apple",
        "usar o método de login que já uso no iPhone",
        ["Botão \"Continuar com Apple\" na tela de login."],
        "FEITO",
      ],
      [
        "US-01.03",
        "usuário de Android",
        "ver o botão do Google em destaque na tela de login",
        "entrar mais rápido, sem precisar procurar a opção certa",
        [
          "Sistema operacional detectado pelo navegador (Android/iOS/outro).",
          "Detecção só reordena/destaca visualmente — nunca esconde a outra opção.",
        ],
        "FEITO",
      ],
      [
        "US-01.04",
        "usuário de iPhone/iPad",
        "ver o botão da Apple em destaque na tela de login",
        "entrar mais rápido no meu aparelho",
        ["Mesma lógica de US-01.03, aplicada ao iOS."],
        "FEITO",
      ],
      [
        "US-01.05",
        "usuário logado",
        "sair da minha conta pelo menu lateral",
        "trocar de conta ou proteger meu acesso num aparelho compartilhado",
        ["Botão \"Sair da conta\" no rodapé do menu.", "Redireciona para a tela de login."],
        "FEITO",
      ],
      [
        "US-01.06",
        "pessoa que loga pela primeira vez",
        "ter meu perfil criado automaticamente como visitante",
        "começar a usar o devocional sem esperar aprovação manual",
        ["Registro criado na tabela de perfis no primeiro login."],
        "FEITO",
      ],
      [
        "US-01.07",
        "pessoa que pagou pelo devocional na landing page",
        "ter meu perfil promovido automaticamente para membro ao entrar com o mesmo e-mail",
        "ter acesso completo sem precisar pedir liberação manual",
        [
          "Consulta automática à planilha de pagamentos (via Apps Script) logo após o login.",
          "Mensagem \"Confirmando seu acesso…\" exibida durante a checagem.",
          "Se não encontrar pagamento confirmado, o perfil permanece visitante.",
        ],
        "FEITO",
      ],
      [
        "US-01.08",
        "administrador",
        "promover manualmente uma pessoa para administrador ou intercessor",
        "conceder esses papéis de confiança só a quem eu escolher pessoalmente",
        [
          "Promoção feita por comando direto no banco de dados (nunca automática).",
          "Pessoa precisa ter logado ao menos uma vez antes de ser promovida.",
        ],
        "FEITO",
      ],
    ],
  },
  {
    numero: "2",
    titulo: "Perfis e Regras de Acesso",
    historias: [
      [
        "US-02.01",
        "visitante",
        "cair diretamente na aba \"Jornada de Oração\" ao entrar",
        "conhecer o evento gratuito antes de decidir virar membro",
        ["Aba inicial calculada de acordo com o papel do usuário."],
        "FEITO",
      ],
      [
        "US-02.02",
        "visitante",
        "experimentar o Dia 1 da jornada de 40 dias",
        "sentir como é o devocional antes de me tornar membro",
        [
          "Só o Dia 1 fica desbloqueado para o visitante.",
          "Bloqueio vale mesmo digitando a URL do dia diretamente.",
        ],
        "FEITO",
      ],
      [
        "US-02.03",
        "visitante",
        "ver uma mensagem clara ao tentar acessar um dia bloqueado",
        "entender que preciso virar membro para desbloquear",
        ["Tela com texto explicativo e botão para voltar à jornada."],
        "FEITO",
      ],
      [
        "US-02.04",
        "visitante",
        "ver uma prévia real dos pedidos de oração da comunidade",
        "sentir a força da comunidade antes de decidir virar membro",
        [
          "Prévia somente leitura (sem publicar, reagir ou responder).",
          "Mostra pedidos reais, não fictícios.",
        ],
        "FEITO",
      ],
      [
        "US-02.05",
        "visitante",
        "ver um botão claro de \"Quero ser membro\"",
        "converter facilmente quando estiver pronto",
        ["Botão aponta para a landing page de vendas do devocional."],
        "FEITO",
      ],
      [
        "US-02.06",
        "membro",
        "ter acesso completo aos 40 dias e à Comunidade de Oração",
        "viver a jornada por inteiro, sem restrições de degustação",
        [],
        "FEITO",
      ],
      [
        "US-02.07",
        "administrador",
        "ver um item \"Dashboard\" exclusivo no menu",
        "gerenciar o devocional sem esse item aparecer para os outros usuários",
        ["Item só visível quando o papel é administrador."],
        "FEITO",
      ],
      [
        "US-02.08",
        "administrador",
        "que a rota do Dashboard exija login e papel de administrador de verdade",
        "impedir que alguém acesse digitando a URL diretamente",
        ["Redirecionamento automático para quem não for administrador."],
        "FEITO",
      ],
    ],
  },
  {
    numero: "3",
    titulo: "Páginas de Conteúdo Introdutório",
    historias: [
      [
        "US-03.01",
        "usuário logado",
        "ler a Introdução do devocional",
        "entender o propósito geral da jornada antes de começar",
        [],
        "FEITO",
      ],
      [
        "US-03.02",
        "usuário logado",
        "ler a página de Apresentação (com as subpáginas Caminhada e Família)",
        "conhecer melhor o contexto e o autor do devocional",
        [],
        "FEITO",
      ],
      [
        "US-03.03",
        "usuário logado",
        "ler sobre a Força da Oração",
        "entender por que a oração é o centro dessa experiência",
        [],
        "FEITO",
      ],
      [
        "US-03.04",
        "usuário logado",
        "ler a Palavra ao Leitor",
        "receber uma mensagem pessoal de acolhimento antes de começar",
        [],
        "FEITO",
      ],
      [
        "US-03.05",
        "usuário logado",
        "entender Por que 40 dias",
        "compreender o sentido do número e da duração da jornada",
        [],
        "FEITO",
      ],
      [
        "US-03.06",
        "usuário logado",
        "ler Como Viver a jornada",
        "saber na prática como aproveitar melhor os 40 dias",
        [],
        "FEITO",
      ],
    ],
  },
  {
    numero: "4",
    titulo: "Jornada dos 40 Dias",
    historias: [
      [
        "US-04.01",
        "membro",
        "ver meu progresso na jornada (quantos dias já concluí)",
        "acompanhar minha caminhada de oração",
        ["Anel de progresso visual.", "Contagem \"X de 40\" sempre visível."],
        "FEITO",
      ],
      [
        "US-04.02",
        "membro",
        "ver os 40 dias organizados por área temática",
        "entender a estrutura e o sentido da jornada",
        ["8 áreas de 5 dias cada, com título e tema próprios."],
        "FEITO",
      ],
      [
        "US-04.03",
        "membro",
        "abrir um dia específico da jornada",
        "rezar aquele dia",
        [],
        "FEITO",
      ],
      [
        "US-04.04",
        "membro",
        "ouvir a oração em áudio narrada por Marcos Nascimento",
        "viver a experiência de oração guiada pela própria voz do autor",
        [],
        "FEITO",
      ],
      [
        "US-04.05",
        "membro",
        "ver o texto da oração destacado em sincronia com o áudio",
        "acompanhar a leitura enquanto escuto",
        [
          "Sincronia calculada a partir da detecção de pausas reais no áudio.",
          "Cai para estimativa proporcional quando não há dado de sincronia.",
        ],
        "FEITO",
      ],
      [
        "US-04.06",
        "membro",
        "marcar um dia como concluído",
        "meu progresso avançar para o próximo dia",
        ["Gravação real no banco de dados (não só no navegador)."],
        "FEITO",
      ],
      [
        "US-04.07",
        "membro",
        "que meu progresso fique salvo na minha conta",
        "continuar de onde parei em qualquer aparelho",
        [],
        "FEITO",
      ],
      [
        "US-04.08",
        "membro",
        "que os dias sejam liberados progressivamente",
        "viver a jornada um passo de cada vez, sem pular etapas",
        [],
        "FEITO",
      ],
      [
        "US-04.09",
        "membro",
        "ter atalhos rápidos para Introdução, Apresentação e \"Por que 40 dias\"",
        "revisitar esse conteúdo facilmente a qualquer momento",
        [],
        "FEITO",
      ],
      [
        "US-04.10",
        "membro",
        "ver um botão \"Vídeo do dia\" e \"Testemunhos\"",
        "saber que esses recursos estão a caminho",
        ["Botões visíveis, porém desabilitados (\"Em breve disponível\")."],
        "PLANEJADO",
      ],
    ],
  },
  {
    numero: "5",
    titulo: "TV e Rádio Devocional",
    historias: [
      [
        "US-05.01",
        "usuário logado",
        "ver uma transmissão em vídeo na tela principal",
        "ter uma experiência contínua de \"TV devocional\"",
        [],
        "FEITO",
      ],
      [
        "US-05.02",
        "usuário logado",
        "que o vídeo alterne automaticamente entre dois conteúdos (10 min / 1 min)",
        "ter variedade na transmissão sem precisar trocar manualmente",
        ["Rodízio contínuo enquanto a tela estiver aberta."],
        "FEITO",
      ],
      [
        "US-05.03",
        "usuário logado",
        "controlar o som da TV com um interruptor simples",
        "assistir com ou sem áudio, conforme minha preferência",
        [],
        "FEITO",
      ],
      [
        "US-05.04",
        "usuário logado",
        "que a TV pare automaticamente quando eu sair da tela principal",
        "não continuar tocando áudio sem eu perceber",
        [],
        "FEITO",
      ],
      [
        "US-05.05",
        "usuário logado",
        "que o vídeo não tenha os controles do YouTube visíveis",
        "manter a experiência de transmissão, sem pausar ou pular sem querer",
        [],
        "FEITO",
      ],
    ],
  },
  {
    numero: "6",
    titulo: "Comunidade de Oração",
    historias: [
      [
        "US-06.01",
        "membro",
        "publicar um pedido de oração",
        "pedir apoio espiritual da comunidade",
        [],
        "FEITO",
      ],
      [
        "US-06.02",
        "membro",
        "ver os pedidos de oração da comunidade em tempo real",
        "acompanhar o que está sendo compartilhado agora",
        ["Atualização automática via Realtime, sem precisar recarregar a página."],
        "FEITO",
      ],
      [
        "US-06.03",
        "membro",
        "reagir a um pedido com um emoji (🙏 ❤️ 🕊️ 🙌)",
        "demonstrar apoio sem precisar escrever um comentário",
        ["Uma reação por pessoa por pedido; clicar de novo remove."],
        "FEITO",
      ],
      [
        "US-06.04",
        "intercessor ou administrador",
        "responder publicamente a um pedido de oração",
        "dar um retorno pastoral direto à pessoa",
        [
          "Resposta aparece em destaque visual (borda vermelha, selo \"Intercessor\").",
          "Só administrador e intercessor têm essa permissão, garantida no banco de dados.",
        ],
        "FEITO",
      ],
      [
        "US-06.05",
        "administrador",
        "fixar um pedido no topo do mural",
        "destacar um pedido importante para toda a comunidade",
        ["Só um pedido fixado por vez.", "Fica fora da área de rolagem, sempre visível."],
        "FEITO",
      ],
      [
        "US-06.06",
        "autor de um pedido (ou administrador)",
        "remover um pedido",
        "corrigir ou apagar algo publicado por engano ou inadequado",
        [],
        "FEITO",
      ],
      [
        "US-06.07",
        "autor de uma resposta (ou administrador)",
        "remover a resposta que escrevi",
        "corrigir algo que respondi",
        [],
        "FEITO",
      ],
      [
        "US-06.08",
        "membro que está perto do topo do mural",
        "que a lista role automaticamente para o pedido mais novo",
        "acompanhar a comunidade sem esforço",
        [],
        "FEITO",
      ],
      [
        "US-06.09",
        "membro que está lendo pedidos antigos",
        "ver um aviso discreto de \"novo pedido chegou\"",
        "saber que algo novo apareceu sem perder minha leitura",
        [],
        "FEITO",
      ],
      [
        "US-06.10",
        "membro",
        "que a lista de pedidos role dentro do próprio espaço dela",
        "a página não ficar gigante conforme a comunidade cresce",
        [],
        "FEITO",
      ],
      [
        "US-06.11",
        "visitante",
        "não conseguir acessar a Comunidade de Oração dos membros",
        "ser incentivado a virar membro para participar de verdade",
        ["Redirecionado para o mural de prévia (US-02.04)."],
        "FEITO",
      ],
    ],
  },
  {
    numero: "7",
    titulo: "Jornada de Oração (Hub do Evento / Visitante)",
    historias: [
      [
        "US-07.01",
        "visitante",
        "ver informações sobre a Semana da Jornada de Oração",
        "entender o que é esse evento gratuito",
        ["Título, texto de convite e área reservada para a transmissão ao vivo."],
        "PARCIAL",
      ],
      [
        "US-07.02",
        "visitante",
        "assistir à transmissão ao vivo da Semana da Jornada de Oração",
        "participar do evento diretamente pelo devocional",
        ["Depende do vídeo/link real da campanha, ainda não definido."],
        "PLANEJADO",
      ],
      [
        "US-07.03",
        "membro ou administrador",
        "ver um placeholder simples ao navegar até essa aba",
        "não ser confundido com o funil de conversão do visitante",
        ["Eles já têm acesso pleno pela aba Devocional."],
        "FEITO",
      ],
    ],
  },
  {
    numero: "8",
    titulo: "Menu Lateral e Navegação",
    historias: [
      [
        "US-08.01",
        "usuário logado",
        "recolher e expandir o menu lateral",
        "ganhar mais espaço de tela quando quiser",
        [],
        "FEITO",
      ],
      [
        "US-08.02",
        "usuário logado",
        "ver os itens do menu numerados e organizados",
        "entender a ordem sugerida de leitura e uso",
        [],
        "FEITO",
      ],
      [
        "US-08.03",
        "usuário logado no celular",
        "abrir o menu por um botão flutuante",
        "navegar pelo devocional mesmo em telas pequenas",
        [],
        "FEITO",
      ],
    ],
  },
  {
    numero: "9",
    titulo: "Mural de Avisos",
    historias: [
      [
        "US-09.01",
        "usuário logado",
        "ver frases curtas em um letreiro animado no topo",
        "receber mensagens de acolhimento rápidas",
        [],
        "FEITO",
      ],
      [
        "US-09.02",
        "usuário logado",
        "ver avisos importantes (notícia/aviso/alerta/comunicado) destacados",
        "ficar informado sobre novidades do devocional",
        [],
        "FEITO",
      ],
      [
        "US-09.03",
        "usuário logado",
        "dispensar um aviso que já li",
        "ele não continuar aparecendo para mim",
        ["Preferência lembrada no navegador."],
        "FEITO",
      ],
      [
        "US-09.04",
        "administrador",
        "criar um aviso novo pelo Dashboard",
        "comunicar algo a todos os usuários sem precisar de ajuda técnica",
        ["Avisos passam a viver no banco de dados, não mais em arquivo fixo."],
        "FEITO",
      ],
      [
        "US-09.05",
        "administrador",
        "ativar, desativar ou remover um aviso",
        "controlar o que está visível no momento",
        [],
        "FEITO",
      ],
    ],
  },
  {
    numero: "10",
    titulo: "Dashboard Administrativo",
    historias: [
      [
        "US-10.01",
        "administrador",
        "ver a quantidade total de membros",
        "acompanhar o crescimento da comunidade",
        [],
        "FEITO",
      ],
      [
        "US-10.02",
        "administrador",
        "ver um gráfico comparando administrador/intercessor/membro/visitante",
        "entender a composição da base de usuários",
        [],
        "FEITO",
      ],
      [
        "US-10.03",
        "administrador",
        "ver quantos membros estão simultaneamente conectados agora",
        "ter noção da atividade em tempo real do devocional",
        ["Contagem ao vivo via Supabase Presence."],
        "FEITO",
      ],
      [
        "US-10.04",
        "administrador",
        "gerenciar os avisos do app num só lugar",
        "manter a comunicação com a comunidade organizada",
        [],
        "FEITO",
      ],
      [
        "US-10.05",
        "administrador",
        "agendar uma vídeochamada paga de acompanhamento espiritual individual",
        "oferecer um atendimento mais próximo aos membros",
        ["Ideia registrada — ver seção 13 do README do projeto."],
        "PLANEJADO",
      ],
    ],
  },
];

// ---------------------------------------------------------------------

const doc = new Document({
  numbering: {
    config: [
      {
        reference: "lista-padrao",
        levels: [
          {
            level: 0,
            format: LevelFormat.BULLET,
            text: "•",
            alignment: AlignmentType.LEFT,
            style: {
              paragraph: {
                indent: { left: convertInchesToTwip(0.35), hanging: convertInchesToTwip(0.18) },
              },
            },
          },
        ],
      },
      {
        reference: "lista-criterios",
        levels: [
          {
            level: 0,
            format: LevelFormat.BULLET,
            text: "–",
            alignment: AlignmentType.LEFT,
            style: {
              paragraph: {
                indent: { left: convertInchesToTwip(0.5), hanging: convertInchesToTwip(0.18) },
              },
            },
          },
        ],
      },
    ],
  },
  styles: {
    default: {
      document: { run: { font: "Calibri", size: 22 } },
    },
  },
  sections: [
    {
      properties: {
        page: {
          size: { width: 11906, height: 16838 },
          margin: {
            top: convertInchesToTwip(1),
            bottom: convertInchesToTwip(0.9),
            left: convertInchesToTwip(1),
            right: convertInchesToTwip(1),
          },
        },
      },
      children: [
        // Capa
        new Paragraph({ spacing: { before: 1800 }, children: [] }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { after: 200 },
          children: [
            new TextRun({ text: "HISTÓRIAS DE USUÁRIO", bold: true, size: 44, color: NAVY }),
          ],
        }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { after: 120 },
          children: [
            new TextRun({
              text: "40 Dias Rezando com Marcos Nascimento",
              italics: true,
              size: 28,
              color: ACCENT,
            }),
          ],
        }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { after: 1400 },
          children: [
            new TextRun({
              text: "Documento vivo — atualizado a cada nova funcionalidade",
              size: 20,
              color: CINZA,
            }),
          ],
        }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          children: [
            new TextRun({ text: "Versão 1 — 31 de agosto de 2026", size: 20, color: CINZA }),
          ],
        }),

        new Paragraph({ children: [], pageBreakBefore: true }),

        // Sumário
        new Paragraph({
          heading: HeadingLevel.HEADING_1,
          spacing: { after: 260 },
          border: { bottom: { style: BorderStyle.SINGLE, size: 8, color: ACCENT, space: 6 } },
          children: [new TextRun({ text: "Sumário", bold: true, color: NAVY })],
        }),
        ...secoes.map(
          (secao) =>
            new Paragraph({
              spacing: { after: 140, line: 300 },
              children: [
                new TextRun({ text: `${secao.numero}. `, bold: true, color: ACCENT, size: 24 }),
                new TextRun({ text: secao.titulo, size: 24, color: NAVY }),
                new TextRun({
                  text: `  (${secao.historias.length} histórias)`,
                  size: 18,
                  color: CINZA,
                  italics: true,
                }),
              ],
            }),
        ),

        new Paragraph({ children: [], pageBreakBefore: true }),

        // Como usar este documento
        new Paragraph({
          heading: HeadingLevel.HEADING_1,
          spacing: { after: 200 },
          border: { bottom: { style: BorderStyle.SINGLE, size: 8, color: ACCENT, space: 6 } },
          children: [
            new TextRun({ text: "Como usar este documento", bold: true, color: NAVY }),
          ],
        }),
        p(
          "Este documento reúne, em formato de histórias de usuário, todas as funcionalidades já construídas (ou planejadas) no devocional \"40 Dias Rezando com Marcos Nascimento\". Cada funcionalidade é numerada por área (ex: seção 6 = Comunidade de Oração) e cada história recebe um identificador único (ex: US-06.04).",
        ),
        h2("Formato de cada história"),
        p(
          'Toda história segue o formato "Como [persona], quero [ação], para [benefício]", seguido dos critérios de aceite (o que precisa ser verdade para a história ser considerada pronta) e do status atual.',
        ),
        h2("Personas usadas neste documento"),
        bullet("Visitante — ainda não é membro; acesso limitado, focado em degustação e conversão"),
        bullet("Membro — pagou o acesso; experiência completa dos 40 dias e da comunidade"),
        bullet("Intercessor — pessoa preparada para responder pedidos de oração, junto com o administrador"),
        bullet("Administrador — Marcos Nascimento; gerencia conteúdo, moderação e métricas"),
        h2("Legenda de status"),
        bullet("✅ Implementado — já está no ar, funcionando"),
        bullet("🔶 Parcial — a estrutura existe, mas depende de conteúdo/decisão ainda pendente"),
        bullet("⬜ Planejado — discutido e registrado, ainda não construído"),
        p(
          "Este é um documento vivo: à medida que o devocional evolui, novas histórias são adicionadas e o status das existentes é atualizado.",
        ),

        new Paragraph({ children: [], pageBreakBefore: true }),

        // Seções de histórias
        ...secoes.flatMap((secao, i) => [
          h1(secao.numero, secao.titulo),
          ...secao.historias.flatMap(([id, persona, quero, para, criterios, status]) =>
            historia(id, persona, quero, para, criterios, status),
          ),
          ...(i < secoes.length - 1 ? [new Paragraph({ children: [], pageBreakBefore: true })] : []),
        ]),
      ],
    },
  ],
});

Packer.toBuffer(doc).then((buffer) => {
  fs.writeFileSync("/home/claude/projeto_basico/Historias_Usuario_40_Dias.docx", buffer);
  console.log("Documento gerado com sucesso.");
});
