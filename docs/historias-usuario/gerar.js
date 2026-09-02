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

function notasTecnicas(itens) {
  return [
    new Paragraph({
      spacing: { before: 280, after: 100 },
      border: { top: { style: BorderStyle.SINGLE, size: 4, color: "D8CBB0", space: 8 } },
      children: [
        new TextRun({
          text: "NOTAS TÉCNICAS E DECISÕES",
          bold: true,
          size: 18,
          color: CINZA,
          allCaps: true,
        }),
      ],
    }),
    ...itens.map(
      (texto) =>
        new Paragraph({
          numbering: { reference: "lista-notas", level: 0 },
          spacing: { after: 90, line: 270 },
          children: [new TextRun({ text: texto, size: 20, italics: true, color: "555555" })],
        }),
    ),
  ];
}

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
        [
          "Botão \"Continuar com Google\" visível na tela de login.",
          "Sessão persiste entre visitas, sem precisar logar toda vez.",
          "Login social gerenciado pelo Lovable Cloud, sem senha própria do devocional.",
        ],
        "FEITO",
      ],
      [
        "US-01.02",
        "visitante",
        "entrar com minha conta Apple",
        "usar o método de login que já uso no iPhone, sem criar conta nova",
        [
          "Botão \"Continuar com Apple\" visível na tela de login.",
          "Mesmo comportamento de sessão persistente do login com Google.",
        ],
        "FEITO",
      ],
      [
        "US-01.03",
        "usuário de Android",
        "ver o botão do Google em destaque (preenchido, em primeiro) na tela de login",
        "entrar mais rápido, sem precisar procurar a opção certa",
        [
          "Sistema operacional detectado pelo navegador (Android/iOS/outro), via User-Agent.",
          "Detecção só reordena/destaca visualmente — nunca esconde a outra opção de login.",
          "Em computador, ou antes da detecção rodar, mantém a ordem padrão (Google primeiro).",
        ],
        "FEITO",
      ],
      [
        "US-01.04",
        "usuário de iPhone/iPad",
        "ver o botão da Apple em destaque (preenchido, em primeiro) na tela de login",
        "entrar mais rápido no meu aparelho",
        ["Mesma lógica de detecção da US-01.03, só que priorizando Apple no iOS."],
        "FEITO",
      ],
      [
        "US-01.05",
        "usuário logado",
        "sair da minha conta pelo menu lateral",
        "trocar de conta ou proteger meu acesso num aparelho compartilhado",
        [
          "Botão \"Sair da conta\" visível no rodapé do menu lateral, só quando há sessão ativa.",
          "Ao clicar, encerra a sessão e redireciona para a tela de login.",
        ],
        "FEITO",
      ],
      [
        "US-01.06",
        "pessoa que loga pela primeira vez",
        "ter meu perfil criado automaticamente como visitante",
        "começar a usar o devocional imediatamente, sem esperar aprovação manual",
        [
          "Registro criado na tabela de perfis assim que a pessoa acessa uma tela que consulta o perfil.",
          "Papel inicial é sempre \"visitante\" — o mais restrito, nunca criado com privilégio maior.",
        ],
        "FEITO",
      ],
      [
        "US-01.07",
        "pessoa que pagou pelo devocional na landing page",
        "ter meu perfil promovido automaticamente para membro ao entrar com o mesmo e-mail",
        "ter acesso completo sem precisar pedir liberação manual a ninguém",
        [
          "Consulta automática à planilha de pagamentos (via Google Apps Script) logo após o login.",
          "Mensagem \"Confirmando seu acesso…\" exibida enquanto a checagem acontece.",
          "Se o e-mail não constar como pago na planilha, o perfil permanece visitante (nunca rebaixa quem já é membro).",
          "Depende do e-mail usado no login ser o mesmo preenchido no formulário de pagamento da landing page.",
        ],
        "FEITO",
      ],
      [
        "US-01.08",
        "administrador",
        "promover manualmente uma pessoa para administrador ou intercessor",
        "conceder esses papéis de confiança só a quem eu escolher pessoalmente",
        [
          "Promoção feita por comando SQL direto no banco de dados — nunca automática.",
          "A pessoa precisa ter feito login pelo menos uma vez antes (para o registro dela existir).",
          "Não existe fluxo dentro do app para autopromoção a esses dois papéis.",
        ],
        "FEITO",
      ],
    ],
    notas: [
      "O devocional roda no Lovable Cloud (Supabase gerenciado pela própria Lovable) — não existe um projeto Supabase separado com painel próprio; toda gestão de banco de dados acontece pelo chat do Lovable ou pelo painel \"Cloud\" dentro do editor. Essa decisão foi avaliada (inclusive tentando conectar um Supabase externo) e mantida como está: o custo de migrar (perder login social configurado por chat, perder testes de usuário autenticado no preview) foi considerado maior que o ganho de controle direto.",
      "Existe uma chave central no código (CONTROLE_DE_PERFIL_HABILITADO, em src/lib/perfis.ts) que liga/desliga todo o sistema de perfis de uma vez. Toda a estrutura (banco de dados, hooks, verificação de acesso) foi construída e testada com essa chave desligada, sem afetar o app publicado, e só foi ligada quando tudo já estava pronto.",
      "Bug real encontrado e corrigido: o redirecionamento após o login (redirect_uri) originalmente apontava para a raiz do site (\"/\"), que só verifica se a pessoa está logada e manda para a jornada — sem rodar a sincronização de pagamento. Corrigido para apontar para \"/entrar\", onde essa sincronização de fato acontece.",
      "Toda promoção a papel sensível (administrador, intercessor) é deliberadamente manual — nunca automática — como decisão de segurança.",
      "Bug real encontrado e corrigido (02/09/2026): quando a consulta do perfil falhava (ex: uma coluna nova que a migration ainda não tinha aplicado no banco real), a tela ficava presa na mensagem \"Preparando sua caminhada\" para sempre, sem explicação — chegou a impedir várias pessoas de entrarem ao mesmo tempo, incluindo o próprio administrador. Corrigido em duas frentes: o erro passou a ser registrado no console (antes falhava em silêncio) e as telas que dependem do perfil (jornada, dia) agora mostram uma tela de erro com botão \"Tentar de novo\" em vez de ficar presas indefinidamente.",
    ],
  },
  {
    numero: "2",
    titulo: "Perfis e Regras de Acesso",
    historias: [
      [
        "US-02.01",
        "visitante",
        "cair diretamente na aba \"Jornada de Oração\" ao entrar no devocional",
        "conhecer o evento gratuito antes de decidir virar membro",
        [
          "Aba inicial calculada de acordo com o papel do usuário (visitante vai para Jornada de Oração; os demais, para Devocional).",
          "Se o visitante trocar de aba manualmente, essa escolha prevalece durante a sessão.",
        ],
        "FEITO",
      ],
      [
        "US-02.02",
        "visitante",
        "experimentar o Dia 1 da jornada de 40 dias",
        "sentir como é o devocional antes de me tornar membro",
        [
          "Só o Dia 1 fica desbloqueado para quem tem papel visitante.",
          "Bloqueio vale mesmo digitando a URL de outro dia diretamente no navegador (não é só visual).",
          "Aviso de degustação exibido no topo da aba \"40 Dias de Oração\" para quem é visitante.",
        ],
        "FEITO",
      ],
      [
        "US-02.03",
        "visitante",
        "ver uma mensagem clara ao tentar acessar um dia bloqueado",
        "entender que preciso virar membro para desbloquear, sem ficar confuso",
        [
          "Tela com texto específico para visitante (\"Esse dia é exclusivo para membros\"), diferente da mensagem padrão de progresso.",
          "Botão para voltar à jornada principal.",
        ],
        "FEITO",
      ],
      [
        "US-02.04",
        "visitante",
        "ver uma prévia real dos pedidos de oração da comunidade",
        "sentir a força da comunidade antes de decidir virar membro",
        [
          "Mostra pedidos reais publicados pelos membros (prova social genuína, não conteúdo inventado).",
          "Lista completa e rolável, não só uma prévia fixa.",
          "Botão \"Quero ser membro\" em destaque, junto da lista.",
        ],
        "FEITO",
      ],
      [
        "US-02.05",
        "visitante",
        "ver um botão claro de conversão (\"Quero ser membro\")",
        "converter facilmente quando estiver pronto para assinar",
        ["Botão aponta para a landing page de vendas do devocional."],
        "FEITO",
      ],
      [
        "US-02.06",
        "membro",
        "ter acesso completo aos 40 dias e aos Pedidos de Oração",
        "viver a jornada por inteiro, sem restrições de degustação",
        [
          "Todos os dias liberados progressivamente pelo próprio ritmo de conclusão, sem trava de papel.",
          "Acesso pleno ao mural de pedidos de oração dos membros (publicar, reagir, ver respostas).",
        ],
        "FEITO",
      ],
      [
        "US-02.07",
        "administrador",
        "ver um item \"Dashboard\" exclusivo no menu, sempre em primeiro",
        "gerenciar o devocional sem esse item aparecer para os demais usuários",
        [
          "Item só é renderizado no menu quando o papel do usuário logado é administrador.",
          "Posicionado antes de todos os outros itens do menu.",
        ],
        "FEITO",
      ],
      [
        "US-02.08",
        "administrador",
        "que a rota do Dashboard exija login e papel de administrador de verdade",
        "impedir que alguém acesse digitando a URL diretamente, sem ter o papel certo",
        [
          "Quem não está logado é redirecionado para a tela de login.",
          "Quem está logado mas não é administrador é redirecionado para a jornada.",
        ],
        "FEITO",
      ],
      [
        "US-02.09",
        "visitante",
        "ter a aba \"Devocional\" bloqueada a partir da minha 2ª visita",
        "ser incentivado a virar membro depois de já ter experimentado o Dia 1 uma vez",
        [
          "Contador de visitas salvo na conta (banco de dados), não no navegador — não é contornável limpando cookies.",
          "Na 1ª visita, acesso normal de degustação (ver US-02.02).",
          "Da 2ª visita em diante, a TV Oracional e as 4 abas internas somem, substituídas por uma tela única \"Quero ser membro\".",
        ],
        "FEITO",
      ],
      [
        "US-02.10",
        "visitante",
        "publicar até 3 pedidos de oração próprios no mural da Jornada de Oração",
        "participar de verdade da comunidade antes de virar membro, não só observar",
        [
          "Caixa de publicar visível enquanto a pessoa tiver menos de 3 pedidos próprios.",
          "Contador \"X de 3 pedidos como visitante\" exibido junto da caixa.",
          "Ao atingir o limite, a caixa some e o cartão de conversão explica que o limite foi atingido.",
        ],
        "FEITO",
      ],
    ],
    notas: [
      "As regras de acesso do Visitante ficaram registradas como \"ainda não definidas\" por boa parte do desenvolvimento do projeto — foram deliberadamente adiadas até o controle de perfil estar maduro o suficiente para implementá-las com segurança, evitando decisões apressadas sobre um fluxo de conversão tão importante. Foram fechadas em etapas, ao longo de setembro de 2026: primeiro a degustação do Dia 1, depois o bloqueio na 2ª visita e a publicação limitada a 3 pedidos.",
      "A degustação do Dia 1 é aplicada em duas camadas: na listagem visual da jornada (o card do dia aparece trancado) e diretamente na rota /dia/$numero (mesmo digitando a URL de outro dia, o acesso é bloqueado no servidor). Essa dupla camada existe porque bloquear só visualmente não impede alguém de tentar acessar pela URL.",
      "O limite de 3 pedidos do visitante não precisou de coluna nova no banco — é calculado contando, na própria lista de pedidos já carregada, quantos têm o user_id da pessoa logada. A regra de segurança (RLS) que permite publicar já valia para qualquer autenticado, independente do papel; só faltava a interface.",
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
        "entender o propósito geral da jornada antes de começar a rezar",
        [
          "Texto explicando o que é o devocional e o convite para a jornada.",
          "Botão \"Continuar\" leva para a próxima página de conteúdo (Apresentação).",
        ],
        "FEITO",
      ],
      [
        "US-03.02",
        "usuário logado",
        "ler a página de Apresentação, com as subpáginas Caminhada e Família",
        "conhecer melhor o contexto, a trajetória e a proposta do autor do devocional",
        [
          "Página principal de Apresentação com link para as duas subpáginas.",
          "Subpáginas \"Caminhada\" e \"Família\" com conteúdo próprio.",
        ],
        "FEITO",
      ],
      [
        "US-03.03",
        "usuário logado",
        "ler sobre a Força da Oração",
        "entender por que a oração é o centro dessa experiência de 40 dias",
        [],
        "FEITO",
      ],
      [
        "US-03.04",
        "usuário logado",
        "ler a Palavra ao Leitor",
        "receber uma mensagem pessoal de acolhimento antes de começar a jornada",
        [],
        "FEITO",
      ],
      [
        "US-03.05",
        "usuário logado",
        "entender Por que 40 dias",
        "compreender o sentido bíblico e simbólico da duração da jornada",
        [],
        "FEITO",
      ],
      [
        "US-03.06",
        "usuário logado",
        "ler Como Viver a jornada",
        "saber na prática como aproveitar melhor os 40 dias, dia após dia",
        [],
        "FEITO",
      ],
    ],
    notas: [
      "Todas as páginas de conteúdo introdutório reaproveitam um único componente (PaginaConteudo.tsx), garantindo visual, tipografia e navegação consistentes entre elas — em vez de cada página ter seu próprio layout construído do zero.",
      "A numeração dessas páginas no menu lateral (1 a 6) segue a ordem sugerida de leitura, definida deliberadamente para acompanhar o fluxo de acolhimento antes da pessoa entrar de fato na jornada de oração.",
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
        "acompanhar minha caminhada de oração ao longo do tempo",
        [
          "Anel de progresso visual mostrando dias concluídos sobre o total.",
          "Contagem em texto (\"X de 40\") sempre visível na tela principal da jornada.",
        ],
        "FEITO",
      ],
      [
        "US-04.02",
        "membro",
        "ver os 40 dias organizados por área temática",
        "entender a estrutura e o sentido da jornada como um todo",
        [
          "8 áreas de 5 dias cada, cada uma com título e tema próprios.",
          "Áreas exibidas em formato de acordeão, expansíveis uma a uma.",
        ],
        "FEITO",
      ],
      [
        "US-04.03",
        "membro",
        "abrir um dia específico da jornada",
        "rezar aquele dia com calma, focado só nele",
        [
          "Cada dia tem sua própria página, acessível a partir da listagem da jornada.",
          "Página mostra Palavra de Deus, oração em áudio, propósito do dia e frase para guardar no coração.",
        ],
        "FEITO",
      ],
      [
        "US-04.04",
        "membro",
        "ouvir a oração em áudio narrada por Marcos Nascimento",
        "viver a experiência de oração guiada pela própria voz do autor",
        [
          "Player de áudio embutido na página do dia, com controle de play/pausa.",
          "Áudio é a gravação real e espontânea de Marcos, não um texto sintetizado.",
        ],
        "FEITO",
      ],
      [
        "US-04.05",
        "membro",
        "ver o texto da oração destacado em sincronia com o áudio",
        "acompanhar a leitura enquanto escuto, sem me perder no texto",
        [
          "Sincronia calculada a partir da detecção de pausas reais de fala no áudio (não só estimativa).",
          "Cai automaticamente para uma estimativa proporcional por tamanho de texto quando não há dado de sincronia fina.",
          "Parágrafo em destaque muda conforme o áudio avança.",
        ],
        "FEITO",
      ],
      [
        "US-04.06",
        "membro",
        "marcar um dia como concluído",
        "meu progresso avançar e o próximo dia ser liberado",
        [
          "Botão \"Concluí a oração de hoje\" na página do dia.",
          "Gravação real no banco de dados (Supabase), não só no navegador da pessoa.",
          "Mensagem de confirmação acolhedora ao concluir (\"Que a paz de Deus fique com você hoje\").",
        ],
        "FEITO",
      ],
      [
        "US-04.07",
        "membro",
        "que meu progresso fique salvo na minha conta, não no aparelho",
        "continuar de onde parei em qualquer aparelho que eu usar",
        ["Progresso vinculado à conta do usuário no banco de dados, não ao navegador."],
        "FEITO",
      ],
      [
        "US-04.08",
        "membro",
        "que os dias sejam liberados progressivamente, um após o outro",
        "viver a jornada um passo de cada vez, sem pular etapas",
        [
          "Um dia só fica acessível depois que o(s) anterior(es) forem concluídos.",
          "Regra aplicada tanto na listagem quanto diretamente na rota de cada dia.",
        ],
        "FEITO",
      ],
      [
        "US-04.09",
        "membro",
        "ter atalhos rápidos para Introdução, Apresentação e \"Por que 40 dias\"",
        "revisitar esse conteúdo facilmente, sem precisar navegar pelo menu inteiro",
        ["Atalhos exibidos como ícones no topo da aba \"40 Dias de Oração\"."],
        "FEITO",
      ],
      [
        "US-04.10",
        "membro",
        "ver um botão \"Vídeo do dia\" e \"Testemunhos\" em cada dia",
        "saber que esses recursos estão a caminho, mesmo sem poder usá-los ainda",
        [
          "Botões visíveis desde já em cada dia, mas desabilitados (\"Em breve disponível\").",
          "Presença intencional dos botões desabilitados, para gerar expectativa.",
        ],
        "PLANEJADO",
      ],
    ],
    notas: [
      "O conteúdo de cada dia é processado manualmente, um a um: recebe-se o áudio (.ogg, gravação espontânea de Marcos) e o texto transcrito (.docx, via TurboScribe); roda-se ffprobe (duração) e ffmpeg com detecção de silêncio para achar as pausas reais de fala; calcula-se a fronteira proporcional de cada parágrafo por tamanho de texto e casa-se com a pausa real mais próxima, gerando o array de sincronia usado no destaque de texto.",
      "Até a data deste documento, 22 dos 40 dias estão completos (áudio, texto e sincronização) — as Áreas 1 a 4 estão prontas, a Área 5 está parcialmente pronta (dias 21 e 22), e as Áreas 6 a 8 ainda são placeholder.",
      "O progresso da jornada migrou de um modo \"sem login\" (guardado no localStorage do navegador, usado deliberadamente durante a fase de construção e ajustes visuais do app, para agilizar testes sem precisar logar toda hora) para gravação real no Supabase, quando o controle de perfil foi ligado de vez. O hook antigo (useJornadaDev) permanece no repositório só como referência histórica, sem ser mais usado por nenhuma rota.",
    ],
  },
  {
    numero: "5",
    titulo: "TV e Rádio Devocional",
    historias: [
      [
        "US-05.01",
        "usuário logado",
        "ver uma transmissão em vídeo na tela principal da jornada",
        "ter uma experiência contínua de \"TV devocional\" ao acessar o app",
        [
          "Vídeo embutido no topo da aba \"Devocional\", com moldura visual de TV.",
          "Reproduzido automaticamente ao abrir a tela (autoplay silencioso).",
        ],
        "FEITO",
      ],
      [
        "US-05.02",
        "usuário logado",
        "que o vídeo alterne automaticamente entre dois conteúdos, 10 minutos e 1 minuto",
        "ter variedade na transmissão sem precisar trocar de vídeo manualmente",
        [
          "Vídeo principal toca por 10 minutos, depois troca para o secundário por 1 minuto.",
          "Rodízio contínuo enquanto a tela estiver aberta, repetindo indefinidamente.",
          "Troca de vídeo não interrompe nem reinicia o estado do som escolhido pela pessoa.",
        ],
        "FEITO",
      ],
      [
        "US-05.03",
        "usuário logado",
        "controlar o som da TV com um interruptor simples",
        "assistir com ou sem áudio, conforme minha preferência no momento",
        [
          "Interruptor visível no rodapé da moldura da TV.",
          "Estado do som (ligado/desligado) compartilhado entre a TV e o restante do app.",
        ],
        "FEITO",
      ],
      [
        "US-05.04",
        "usuário logado",
        "que a TV pare automaticamente quando eu sair da tela principal",
        "não continuar ouvindo áudio de fundo sem perceber",
        [
          "TV é desmontada (e o player destruído) ao navegar para outra página ou trocar de aba.",
          "Ao voltar para a tela principal, a TV recomeça do início.",
        ],
        "FEITO",
      ],
      [
        "US-05.05",
        "usuário logado",
        "que o vídeo não tenha os controles do YouTube visíveis",
        "manter a experiência de transmissão, sem conseguir pausar ou pular sem querer",
        [
          "Barra de progresso, botões e teclado do player do YouTube desativados.",
          "Cliques no vídeo não pausam nem interagem com o conteúdo.",
          "Nenhuma identificação/marca do YouTube visível — selo próprio \"Ao vivo\" no lugar.",
        ],
        "FEITO",
      ],
    ],
    notas: [
      "Bug real encontrado e corrigido: a primeira versão controlava o player do YouTube usando postMessage \"cru\" (sem a API oficial), e isso causava instabilidade real — o evento de carregamento do iframe disparava antes do player estar de fato pronto para receber comandos, principalmente após recarregar a página (SSR). Corrigido usando a API oficial do YouTube (window.YT.Player), que tem um evento onReady genuíno, disparado só quando o player está realmente pronto.",
      "O rodízio de vídeos usa uma referência (ref) para guardar o estado de som mais recente, em vez de depender diretamente do estado como dependência do temporizador — isso evita que o cronômetro de 10min/1min reinicie toda vez que alguém liga ou desliga o som.",
    ],
  },
  {
    numero: "6",
    titulo: "Pedidos de Oração (Membros)",
    historias: [
      [
        "US-06.01",
        "membro",
        "publicar um pedido de oração",
        "pedir apoio espiritual da comunidade e da equipe do devocional",
        [
          "Caixa de texto simples (\"Compartilhe seu pedido de oração...\") com botão Publicar.",
          "Pedido aparece imediatamente no topo do mural após publicado.",
        ],
        "FEITO",
      ],
      [
        "US-06.02",
        "membro",
        "ver os pedidos de oração da comunidade em tempo real",
        "acompanhar o que está sendo compartilhado agora, sem recarregar a página",
        [
          "Atualização automática via Supabase Realtime assim que alguém publica, remove ou fixa um pedido.",
          "Lista ordenada do pedido mais recente para o mais antigo.",
        ],
        "FEITO",
      ],
      [
        "US-06.03",
        "membro",
        "reagir a um pedido com um emoji (🙏 ❤️ 🕊️ 🙌)",
        "demonstrar apoio a um pedido sem precisar escrever um comentário",
        [
          "Conjunto fixo de 4 emojis disponíveis para reagir.",
          "Uma reação por pessoa por pedido — clicar de novo no mesmo emoji remove a reação.",
          "Contagem de reações por emoji visível em cada pedido.",
        ],
        "FEITO",
      ],
      [
        "US-06.04",
        "intercessor ou administrador",
        "responder publicamente a um pedido de oração específico",
        "dar um retorno pastoral direto à pessoa que pediu, em nome da equipe",
        [
          "Botão \"Responder\" visível só para quem tem papel administrador ou intercessor.",
          "Resposta aparece indentada abaixo do pedido, com destaque visual (borda vermelha, selo \"Intercessor\").",
          "Permissão garantida na regra de segurança do próprio banco de dados, não só escondida na tela.",
        ],
        "FEITO",
      ],
      [
        "US-06.05",
        "administrador",
        "fixar um pedido de oração no topo do mural",
        "destacar um pedido importante para toda a comunidade ver",
        [
          "Só um pedido fixado por vez — fixar um novo desafixa automaticamente o anterior.",
          "Pedido fixado fica fora da área de rolagem da lista, sempre visível.",
        ],
        "FEITO",
      ],
      [
        "US-06.06",
        "autor de um pedido (ou administrador)",
        "remover um pedido do mural",
        "corrigir ou apagar algo publicado por engano ou que não devia estar ali",
        ["Botão de remover visível só para o autor do pedido ou para o administrador."],
        "FEITO",
      ],
      [
        "US-06.07",
        "autor de uma resposta (ou administrador)",
        "remover a resposta que eu mesmo escrevi",
        "corrigir algo que respondi errado ou não deveria ter publicado",
        ["Regra ampliada para permitir que o próprio autor da resposta a remova, além do administrador."],
        "FEITO",
      ],
      [
        "US-06.08",
        "membro que está com o mural aberto perto do topo",
        "que a lista role automaticamente para o pedido mais novo quando chega",
        "acompanhar a comunidade em tempo real, sem esforço manual",
        ["Auto-rolagem só acontece quando a pessoa já está perto do topo da lista."],
        "FEITO",
      ],
      [
        "US-06.09",
        "membro que está lendo pedidos antigos, rolado para baixo",
        "ver um aviso discreto de \"novo pedido chegou\" no lugar de rolar sozinho",
        "saber que algo novo apareceu sem perder o que estou lendo",
        ["Botão de aviso leva a pessoa ao topo da lista quando clicado."],
        "FEITO",
      ],
      [
        "US-06.10",
        "membro",
        "que a lista de pedidos role dentro do próprio espaço dela, não a página inteira",
        "a página não ficar gigante conforme a comunidade cresce e publica mais",
        [
          "Painel de altura fixa com rolagem própria (não é a página toda que rola).",
          "Caixa de publicar e frase de acolhimento sempre visíveis, sem depender de rolagem.",
        ],
        "FEITO",
      ],
      [
        "US-06.11",
        "visitante",
        "não conseguir acessar a versão dos Pedidos de Oração dos membros (dentro de Devocional)",
        "ser incentivado a virar membro para participar da versão completa",
        [
          "Mensagem \"exclusivo para membros\" ao tentar acessar essa aba específica.",
          "O visitante tem seu próprio mural, separado, na aba Jornada de Oração (ver US-02.04 e US-02.10) — com lista completa e até 3 pedidos próprios, mas sem reações, respostas ou fixação.",
        ],
        "FEITO",
      ],
    ],
    notas: [
      "Avaliou-se deliberadamente copiar o modelo do chat ao vivo do YouTube (mensagens curtas, rolagem rápida, sensação descartável) e essa ideia foi descartada: o mural existe para o oposto disso — cada pedido precisa transmitir que foi visto e será lembrado, não que \"já rolou e sumiu\". Só elementos pontuais desse modelo foram aproveitados (auto-rolagem para o mais novo, aviso de novo item), sem herdar a cultura de chat descartável.",
      "O papel \"Intercessor\" foi criado especificamente para dar continuidade a essa funcionalidade: pessoas preparadas para apoiar esse trabalho de resposta pastoral, pensando na ausência eventual do administrador — a tendência é ter vários intercessores ao longo do tempo, não um só.",
      "O destaque visual em vermelho para posts/respostas de administrador e intercessor foi uma escolha deliberada de cor, para chamar atenção visual imediata de que aquela mensagem vem da equipe do devocional.",
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
        "entender o que é esse evento gratuito antes de decidir participar",
        [
          "Título \"Semana da Jornada de Oração\" e texto de convite na aba.",
          "Área reservada para a transmissão ao vivo do evento.",
        ],
        "PARCIAL",
      ],
      [
        "US-07.02",
        "visitante",
        "assistir à transmissão ao vivo da Semana da Jornada de Oração",
        "participar do evento diretamente pelo devocional",
        [
          "Depende do vídeo/link real da campanha, ainda não definido pelo autor.",
          "Estratégia definida: transmissão roda no YouTube (alcance), app funciona como hub de captação e conversão.",
        ],
        "PLANEJADO",
      ],
      [
        "US-07.03",
        "membro ou administrador",
        "ver um placeholder simples ao navegar até essa aba",
        "não ser confundido com o funil de conversão pensado para o visitante",
        ["Eles já têm acesso pleno pela aba Devocional, então essa aba não é o foco principal deles."],
        "FEITO",
      ],
    ],
    notas: [
      "Decisão estratégica registrada: em vez de escolher entre \"só YouTube\" ou \"só dentro do app\" para o evento, optou-se por combinar os dois — o YouTube cuida do alcance orgânico e do chat ao vivo (que a plataforma já resolve de graça), e o devocional funciona como o \"hub\" que capta o cadastro do visitante e conduz para a conversão em membro, sem depender só de cliques na descrição de um vídeo.",
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
        "ganhar mais espaço de tela quando quiser, sem perder o acesso à navegação",
        [],
        "FEITO",
      ],
      [
        "US-08.02",
        "usuário logado",
        "ver os itens do menu numerados e organizados hierarquicamente",
        "entender a ordem sugerida de leitura e uso do devocional",
        ["Itens de conteúdo introdutório numerados de 1 a 6, seguidos de \"Os 40 Dias de Oração\"."],
        "FEITO",
      ],
      [
        "US-08.03",
        "usuário logado no celular",
        "abrir o menu por um botão flutuante fixo",
        "navegar pelo devocional mesmo em telas pequenas",
        ["Botão flutuante fixo no topo, visível só em telas de celular."],
        "FEITO",
      ],
    ],
    notas: [
      "Decisão de UX deliberada, mantida durante todo o projeto: nunca usar uma barra de menu fixa no topo da tela — o menu é sempre lateral, e qualquer elemento fixo no topo (como o mural de frases ou o botão do menu mobile) precisa ser fino e discreto.",
    ],
  },
  {
    numero: "9",
    titulo: "Mural de Avisos",
    historias: [
      [
        "US-09.01",
        "usuário logado",
        "ver frases curtas em um letreiro animado no topo da tela",
        "receber mensagens de acolhimento rápidas ao usar o devocional",
        ["Faixa fina, com frases alternando em animação (direita para esquerda)."],
        "FEITO",
      ],
      [
        "US-09.02",
        "usuário logado",
        "ver avisos importantes (notícia/aviso/alerta/comunicado) destacados na tela",
        "ficar informado sobre novidades do devocional, de um jeito que chama atenção",
        [
          "Quatro tipos de aviso, cada um com ícone dentro de um selo circular colorido e sólido, e cor própria.",
          "Avisos aparecem em painel próprio, diferente do letreiro de frases, com animação de entrada (fade + leve deslize).",
          "O tipo \"Alerta\" ganha um pulso animado ao redor do selo do ícone, para se destacar ainda mais que os outros.",
        ],
        "FEITO",
      ],
      [
        "US-09.03",
        "usuário logado",
        "dispensar um aviso que já li",
        "ele não continuar aparecendo para mim depois que eu já vi",
        ["Preferência de \"já visto\" lembrada no navegador da pessoa (por aparelho)."],
        "FEITO",
      ],
      [
        "US-09.04",
        "administrador",
        "criar um aviso novo pelo Dashboard, escolhendo para quem ele deve aparecer",
        "comunicar algo a todos os usuários, ou só a um público específico, sem precisar pedir ajuda técnica",
        [
          "Formulário no Dashboard com tipo, público-alvo, título e mensagem.",
          "Aviso publicado aparece automaticamente para quem se encaixa no público escolhido, em tempo real.",
        ],
        "FEITO",
      ],
      [
        "US-09.05",
        "administrador",
        "ativar, desativar ou remover um aviso já criado",
        "controlar o que está visível no momento, sem perder o histórico se não quiser",
        [
          "Desativar mantém o aviso guardado, só tira de circulação.",
          "Remover apaga o aviso de vez.",
        ],
        "FEITO",
      ],
      [
        "US-09.06",
        "membro que virou membro recentemente",
        "ver um aviso de boas-vindas pensado especificamente para mim",
        "me sentir acolhido logo que entro como membro pela primeira vez",
        [
          "Aviso marcado com público \"Novos membros\" só aparece para quem virou membro há menos de 7 dias.",
          "Quem virou membro há mais tempo, ou ainda é visitante, não vê esse aviso.",
        ],
        "FEITO",
      ],
      [
        "US-09.07",
        "membro (novo ou antigo)",
        "ver avisos direcionados a todos os membros, independente de há quanto tempo sou membro",
        "receber comunicados relevantes para quem já faz parte da comunidade paga",
        ["Aviso marcado com público \"Todos os membros\" aparece para qualquer papel membro, sem checar data."],
        "FEITO",
      ],
    ],
    notas: [
      "Os avisos migraram de uma lista fixa dentro do código (só editável por mim, exigindo um novo commit para cada aviso novo) para uma tabela no banco de dados, gerenciável pelo próprio administrador no Dashboard, sem depender de ajuda técnica para cada mudança.",
      "O momento em que alguém \"virou membro\" é registrado automaticamente por um gatilho no banco de dados (não por código do app) — na primeira vez que o papel de uma pessoa muda para 'membro', a data é gravada uma única vez. Isso funciona igual tanto para quem vira membro pela sincronização automática de pagamento quanto por promoção manual, sem precisar lembrar de atualizar isso em nenhum lugar do código.",
      "A janela de \"novo membro\" (7 dias) é uma constante única no código, fácil de ajustar se o tempo ideal de boas-vindas mudar.",
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
        "acompanhar o crescimento da comunidade ao longo do tempo",
        ["Cartão numérico simples, no painel \"Visão geral\" do Dashboard."],
        "FEITO",
      ],
      [
        "US-10.02",
        "administrador",
        "ver um gráfico comparando administrador/intercessor/membro/visitante",
        "entender a composição da base de usuários de forma visual",
        ["Gráfico de barras horizontal, com as quatro categorias lado a lado."],
        "FEITO",
      ],
      [
        "US-10.03",
        "administrador",
        "ver quantos membros estão simultaneamente conectados agora",
        "ter noção da atividade em tempo real do devocional",
        [
          "Contagem ao vivo via Supabase Realtime Presence, atualizada automaticamente.",
          "Conta só pessoas com papel \"membro\" presentes no app naquele momento.",
        ],
        "FEITO",
      ],
      [
        "US-10.04",
        "administrador",
        "gerenciar os avisos do app num só lugar",
        "manter a comunicação com a comunidade organizada e centralizada",
        ["Ver seção 9 (Mural de Avisos) para os detalhes dessa funcionalidade."],
        "FEITO",
      ],
      [
        "US-10.05",
        "administrador",
        "agendar uma vídeochamada paga de acompanhamento espiritual individual",
        "oferecer um atendimento mais próximo e pessoal aos membros",
        [
          "Ideia registrada e avaliada (dois caminhos possíveis: agendamento + Google Meet/Zoom, ou vídeo embutido no app).",
          "Ainda não implementado — só o texto explicativo \"em breve\" foi colocado na aba correspondente.",
        ],
        "PLANEJADO",
      ],
    ],
    notas: [
      "A métrica de \"membros simultâneos\" usa uma abordagem diferente das demais métricas do Dashboard: em vez de contar linhas fixas do banco de dados, ela usa o recurso de Presence do Supabase Realtime — o mesmo motor de tempo real usado no mural de pedidos de oração, mas aqui aplicado para saber quem está com o app aberto agora, não para escutar mudanças numa tabela.",
      "Visão de longo prazo registrada (ainda não iniciada): expandir o devocional para uma \"cadeia produtiva\" de serviços, trazendo parceiros profissionais de psicologia/psicoterapia/neurociência para atendimentos que têm componente emocional/terapêutico além do espiritual — reconhecendo que parte do sofrimento das pessoas não se resolve só com oração.",
    ],
  },
];

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
      {
        reference: "lista-notas",
        levels: [
          {
            level: 0,
            format: LevelFormat.BULLET,
            text: "▸",
            alignment: AlignmentType.LEFT,
            style: {
              paragraph: {
                indent: { left: convertInchesToTwip(0.35), hanging: convertInchesToTwip(0.18) },
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
              text: "Documento vivo — atualizado a cada nova funcionalidade, preservando o histórico e as decisões do projeto",
              size: 20,
              color: CINZA,
            }),
          ],
        }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          children: [
            new TextRun({ text: "Versão 3 — 2 de setembro de 2026", size: 20, color: CINZA }),
          ],
        }),

        new Paragraph({ children: [], pageBreakBefore: true }),

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

        new Paragraph({
          heading: HeadingLevel.HEADING_1,
          spacing: { after: 200 },
          border: { bottom: { style: BorderStyle.SINGLE, size: 8, color: ACCENT, space: 6 } },
          children: [
            new TextRun({ text: "Como usar este documento", bold: true, color: NAVY }),
          ],
        }),
        p(
          "Este documento reúne, em formato de histórias de usuário, todas as funcionalidades já construídas (ou planejadas) no devocional \"40 Dias Rezando com Marcos Nascimento\". Cada funcionalidade é numerada por área (ex: seção 6 = Pedidos de Oração) e cada história recebe um identificador único (ex: US-06.04). É um documento vivo: além do que cada funcionalidade faz, ele guarda também o porquê — as decisões, os bugs reais resolvidos e o caminho percorrido até chegar no que está no ar hoje.",
        ),
        h2("Formato de cada história"),
        p(
          'Toda história segue o formato "Como [persona], quero [ação], para [benefício]", seguido dos critérios de aceite (o que precisa ser verdade para a história ser considerada pronta) e do status atual.',
        ),
        h2("Notas técnicas e decisões"),
        p(
          "Ao final de cada seção, um quadro reúne decisões de arquitetura, bugs reais já resolvidos e escolhas deliberadas de produto — para que quem retomar o projeto no futuro (uma pessoa nova, ou outra sessão de trabalho) entenda o contexto, não repita um problema já resolvido, e não desfaça uma decisão sem saber por que ela foi tomada.",
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
          "Este é um documento vivo: à medida que o devocional evolui, novas histórias são adicionadas e o status das existentes é atualizado. Ver docs/historias-usuario/README.md no repositório do projeto para instruções de como atualizar.",
        ),

        new Paragraph({ children: [], pageBreakBefore: true }),

        ...secoes.flatMap((secao, i) => [
          h1(secao.numero, secao.titulo),
          ...secao.historias.flatMap(([id, persona, quero, para, criterios, status]) =>
            historia(id, persona, quero, para, criterios, status),
          ),
          ...(secao.notas ? notasTecnicas(secao.notas) : []),
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
