export type Dia = {
  numero: number;
  titulo: string;
  palavra: string;
  referencia: string;
  proposito: string;
  frase: string;
  audioUrl?: string;
  oracao?: string[];
  oracaoTempos?: number[];
};

export type Area = {
  nome: string;
  descricao: string;
  dias: Dia[];
};

const d = (
  numero: number,
  titulo: string,
  referencia: string,
  palavra: string,
  proposito: string,
  frase: string,
): Dia => ({ numero, titulo, referencia, palavra, proposito, frase });

export const areas: Area[] = [
  {
    nome: "Caminhando com Deus",
    descricao: "Os primeiros passos de uma vida em Sua presença.",
    dias: [
      d(
        1,
        "Aqui estou, Senhor",
        "Salmo 40,8",
        "Eis que eu venho, Senhor, para fazer a Vossa vontade.",
        "Reserve cinco minutos em silêncio e diga a Deus: aqui estou.",
        "Deus não espera perfeição. Ele espera presença.",
      ),
      d(
        2,
        "Quero aprender a Te ouvir",
        "1Samuel 3,10",
        "Fala, Senhor, que o Teu servo escuta.",
        "Desligue o celular por dez minutos e apenas escute.",
        "O silêncio também é linguagem de Deus.",
      ),
      d(
        3,
        "Um passo de cada vez",
        "Salmo 119,105",
        "Vossa palavra é lâmpada para os meus pés e luz para o meu caminho.",
        "Escreva uma única coisa que você entregará a Deus hoje.",
        "Deus ilumina o passo, não a estrada inteira.",
      ),
      d(
        4,
        "Deus caminha comigo",
        "Deuteronômio 31,8",
        "O Senhor caminha à tua frente; Ele estará contigo.",
        "Ao sair de casa, faça o sinal da cruz e reze: vem comigo, Senhor.",
        "Você nunca caminhou sozinho.",
      ),
      d(
        5,
        "Meu coração descansa em Ti",
        "Mateus 11,28",
        "Vinde a mim, todos vós que estais cansados, e eu vos aliviarei.",
        "Antes de dormir, entregue a Deus o cansaço deste dia.",
        "Descansar em Deus também é rezar.",
      ),
    ],
  },
  {
    nome: "Quando a vida aperta",
    descricao: "Consolo para os dias em que tudo parece pesado.",
    dias: [
      d(
        6,
        "Senhor, estou cansado",
        "Salmo 34,19",
        "O Senhor está perto dos que têm o coração ferido.",
        "Diga em voz alta a Deus aquilo que mais tem te cansado.",
        "Deus não se afasta da sua dor. Ele se aproxima dela.",
      ),
      d(
        7,
        "Quando o medo aperta o peito",
        "Isaías 41,10",
        "Não temas, porque eu estou contigo.",
        "Respire fundo três vezes rezando: não temas, eu estou contigo.",
        "O medo grita, mas Deus permanece.",
      ),
      d(
        8,
        "A tristeza que não passa",
        "Salmo 42,6",
        "Por que estás triste, ó minha alma? Espera em Deus.",
        "Fale com alguém de confiança sobre o que dói em você.",
        "Chorar diante de Deus é uma forma de oração.",
      ),
      d(
        9,
        "Sobrecarregado demais",
        "1Pedro 5,7",
        "Lançai sobre Ele todas as vossas preocupações.",
        "Escolha uma preocupação e entregue-a a Deus por escrito.",
        "Você não foi feito para carregar tudo.",
      ),
      d(
        10,
        "Ainda assim, confio",
        "Habacuc 3,18",
        "Ainda assim, eu me alegrarei no Senhor.",
        "Agradeça por uma única coisa boa deste dia difícil.",
        "A fé não nega a dor: ela a atravessa com Deus.",
      ),
    ],
  },
  {
    nome: "O poder da oração",
    descricao: "Aprender a rezar com simplicidade e confiança.",
    dias: [
      d(
        11,
        "Ensina-me a rezar",
        "Lucas 11,1",
        "Senhor, ensina-nos a rezar.",
        "Reze um Pai-Nosso devagar, pensando em cada palavra.",
        "Rezar não é falar bonito. É falar de verdade.",
      ),
      d(
        12,
        "Quero colocar minha família em Tuas mãos",
        "Josué 24,15",
        "Eu e a minha casa serviremos ao Senhor.",
        "Reze hoje pelo nome de cada pessoa da sua família.",
        "Onde a oração entra, a casa muda.",
      ),
      d(
        13,
        "Persistir mesmo sem resposta",
        "Lucas 18,1",
        "É preciso rezar sempre, sem jamais desanimar.",
        "Repita ao longo do dia a mesma súplica, com calma.",
        "O silêncio de Deus nunca é ausência de Deus.",
      ),
      d(
        14,
        "Rezar com o coração",
        "Mateus 6,6",
        "Reza ao teu Pai em segredo, e Ele te recompensará.",
        "Encontre um cantinho da casa só para rezar.",
        "Deus não escuta palavras. Ele escuta corações.",
      ),
      d(
        15,
        "Interceder por alguém",
        "Tiago 5,16",
        "Rezai uns pelos outros, para que sejais curados.",
        "Reze hoje por alguém que te feriu ou de quem se afastou.",
        "Rezar pelo outro cura quem reza.",
      ),
    ],
  },
  {
    nome: "Deus cuida de mim",
    descricao: "A certeza da providência nas coisas simples.",
    dias: [
      d(
        16,
        "Nada me faltará",
        "Salmo 23,1",
        "O Senhor é meu pastor, nada me faltará.",
        "Liste três coisas que você tem hoje e não tinha antes.",
        "Deus cuida no detalhe que ninguém vê.",
      ),
      d(
        17,
        "As contas e as preocupações",
        "Mateus 6,34",
        "Não vos preocupeis com o amanhã.",
        "Faça uma tarefa prática que você vem adiando por medo.",
        "Confiar não é cruzar os braços. É agir sem desespero.",
      ),
      d(
        18,
        "Quando o corpo adoece",
        "Salmo 103,3",
        "Ele cura todas as tuas enfermidades.",
        "Ofereça sua dor física por alguém que sofre mais.",
        "Deus sustenta mesmo quando não cura logo.",
      ),
      d(
        19,
        "Pão de cada dia",
        "Mateus 6,11",
        "O pão nosso de cada dia nos dai hoje.",
        "Agradeça antes de cada refeição de hoje.",
        "O suficiente de Deus é maior que o excesso do mundo.",
      ),
      d(
        20,
        "Sou cuidado, mesmo sem perceber",
        "Isaías 49,15",
        "Ainda que uma mãe se esqueça, eu não me esquecerei de ti.",
        "Recorde uma vez em que Deus te livrou sem você notar.",
        "Você é lembrado por Deus todos os dias.",
      ),
    ],
  },
  {
    nome: "Perdão e recomeço",
    descricao: "Deixar o peso antigo para poder seguir.",
    dias: [
      d(
        21,
        "Preciso ser perdoado",
        "Salmo 51,3",
        "Tende piedade de mim, Senhor, segundo a Vossa misericórdia.",
        "Faça um exame de consciência sereno, sem se condenar.",
        "A misericórdia de Deus é maior que a sua pior falha.",
      ),
      d(
        22,
        "Perdoar quem me feriu",
        "Mateus 6,14",
        "Se perdoardes, também vosso Pai vos perdoará.",
        "Reze pelo nome de quem você ainda não conseguiu perdoar.",
        "Perdoar é soltar a corrente que prende você.",
      ),
      d(
        23,
        "Perdoar a mim mesmo",
        "Isaías 43,25",
        "Sou eu quem apaga as tuas faltas, e não me lembrarei mais delas.",
        "Escreva a culpa que te persegue e depois rasgue o papel.",
        "Deus já perdoou. Falta você aceitar.",
      ),
      d(
        24,
        "Reconciliar-se",
        "Mateus 5,24",
        "Vai primeiro reconciliar-te com teu irmão.",
        "Envie uma mensagem simples a alguém de quem se afastou.",
        "Um passo pequeno pode abrir uma porta antiga.",
      ),
      d(
        25,
        "Tudo pode recomeçar",
        "Apocalipse 21,5",
        "Eis que faço novas todas as coisas.",
        "Escolha um hábito para recomeçar ainda hoje.",
        "Com Deus, sempre existe outra chance.",
      ),
    ],
  },
  {
    nome: "Fé para viver",
    descricao: "Fé que sustenta a vida comum de cada dia.",
    dias: [
      d(
        26,
        "Creio, aumenta a minha fé",
        "Marcos 9,24",
        "Eu creio, Senhor, mas vinde em auxílio da minha falta de fé.",
        "Reze essa frase sempre que a dúvida aparecer hoje.",
        "Ter dúvidas não é perder a fé. É buscá-la.",
      ),
      d(
        27,
        "Fé no trabalho e na rotina",
        "Colossenses 3,23",
        "Tudo o que fizerdes, fazei de coração, como para o Senhor.",
        "Ofereça sua jornada de trabalho a Deus logo cedo.",
        "Deus também mora na sua rotina.",
      ),
      d(
        28,
        "Fé quando ninguém vê",
        "Mateus 6,4",
        "Teu Pai, que vê no escondido, te recompensará.",
        "Faça um bem hoje sem contar a ninguém.",
        "O que é escondido para o mundo é visível para Deus.",
      ),
      d(
        29,
        "Fé que gera esperança",
        "Romanos 15,13",
        "Que o Deus da esperança vos encha de alegria e paz.",
        "Escreva uma esperança sua e coloque-a diante de Deus.",
        "Esperar em Deus já é começar a ser curado.",
      ),
      d(
        30,
        "Fé que age",
        "Tiago 2,17",
        "A fé sem obras é morta.",
        "Ajude concretamente alguém hoje, mesmo em algo pequeno.",
        "A fé se prova nas mãos, não só nos lábios.",
      ),
    ],
  },
  {
    nome: "Quando Deus age no impossível",
    descricao: "A confiança que nasce quando não há saída humana.",
    dias: [
      d(
        31,
        "Nada é impossível para Deus",
        "Lucas 1,37",
        "Para Deus, nada é impossível.",
        "Apresente a Deus aquilo que você já deu por perdido.",
        "O impossível é apenas o lugar onde Deus costuma agir.",
      ),
      d(
        32,
        "Quando o mar não se abre",
        "Êxodo 14,14",
        "O Senhor combaterá por vós; ficai tranquilos.",
        "Espere um dia inteiro antes de tomar aquela decisão difícil.",
        "Às vezes, esperar é a maior prova de fé.",
      ),
      d(
        33,
        "O tempo de Deus",
        "Eclesiastes 3,1",
        "Há tempo para tudo debaixo do céu.",
        "Diga a Deus: eu aceito o Teu tempo, não o meu.",
        "Deus nunca se atrasa. Nós é que temos pressa.",
      ),
      d(
        34,
        "Sinais de esperança",
        "Salmo 126,3",
        "Grandes coisas fez por nós o Senhor.",
        "Relembre um milagre pequeno que já aconteceu com você.",
        "Quem lembra o passado de Deus confia no futuro.",
      ),
      d(
        35,
        "Confio mesmo sem entender",
        "Provérbios 3,5",
        "Confia no Senhor de todo o coração e não te apoies na tua inteligência.",
        "Entregue a Deus uma pergunta que você ainda não sabe responder.",
        "Confiar é dizer sim antes de entender.",
      ),
    ],
  },
  {
    nome: "Uma nova vida com Deus",
    descricao: "O fim da caminhada é sempre um novo começo.",
    dias: [
      d(
        36,
        "Um coração novo",
        "Ezequiel 36,26",
        "Dar-vos-ei um coração novo e porei em vós um espírito novo.",
        "Peça a Deus a graça de um coração mais manso hoje.",
        "Deus não conserta o velho: Ele cria o novo.",
      ),
      d(
        37,
        "Viver em paz",
        "João 14,27",
        "Deixo-vos a paz, dou-vos a minha paz.",
        "Evite hoje uma discussão que você costuma comprar.",
        "A paz é um presente que se acolhe, não se conquista.",
      ),
      d(
        38,
        "Ser luz para alguém",
        "Mateus 5,16",
        "Brilhe a vossa luz diante dos homens.",
        "Diga uma palavra de ânimo a quem está desanimado.",
        "Deus consola os outros pelas suas mãos.",
      ),
      d(
        39,
        "Gratidão por tudo",
        "1Tessalonicenses 5,18",
        "Em todas as circunstâncias, dai graças.",
        "Escreva cinco motivos de gratidão desta caminhada.",
        "Quem agradece enxerga o que antes não via.",
      ),
      d(
        40,
        "A caminhada continua",
        "Filipenses 1,6",
        "Aquele que começou em vós a boa obra há de completá-la.",
        "Escolha o próximo passo da sua vida de oração.",
        "Foram quarenta dias. Que seja a vida inteira.",
      ),
    ],
  },
];

export const todosOsDias: Dia[] = areas.flatMap((a) => a.dias);

// Conteúdo real do Dia 1, enviado por Marcos (transcrição da gravação de
// oração). Substitui o título e o texto de placeholder deste dia.
const dia1 = todosOsDias.find((dia) => dia.numero === 1);
if (dia1) {
  dia1.titulo = "Senhor, hoje eu entrego minha vida em Tuas mãos";
  dia1.audioUrl = "/audio/dia-01.ogg";
  // Tempos de início de cada parágrafo (em segundos), calculados a partir
  // das pausas de fala detectadas no áudio real — mais precisos do que a
  // estimativa por tamanho de texto usada quando este campo não existe.
  dia1.oracaoTempos = [0, 40.31, 84.64, 108.68, 120.31];
  dia1.oracao = [
    "Eu quero, neste momento, meu Deus, meu Senhor, meu Pai, meu Criador, meu Amigo, meu Amado, fazer um lançamento, fazer uma entrega completa do meu ser, da minha alma, do meu corpo e do meu espírito na Tua presença. Meus pensamentos, meus desejos, minhas vontades, tudo entrego a Ti nas Tuas mãos neste momento.",
    "Para que, a partir desta entrega, você estenda seus braços, acolha, receba, Senhor, o que está em mim, o meu corpo, o meu físico, meus órgãos internos e externos, a minha alma, os meus sentimentos, minhas vontades, minhas alegrias e tristezas, ó Deus. Eu entrego tudo nas Tuas mãos, Senhor. O meu trabalho, a minha casa, a minha família, meus filhos, minha esposa.",
    "Eu entrego o meu futuro, o meu presente. Eu entrego verdadeiramente, ó Deus, pois Tu és um Deus que recebe e jamais rejeita Seus filhos amados. Por isso, agradeço, Pai.",
    "Agradeço pela Tua misericórdia. Entrego o meu futuro, os passos que serão dados. Entrego o dia a dia e o passado.",
    "Entrego tudo o que há de me entregar, de me dar de presente e, principalmente, o dom da vida. Eu Te entrego a minha vida em Tuas mãos.",
  ];
}

// Conteúdo real do Dia 2, enviado por Marcos (transcrição da gravação de
// oração). Substitui o título e o texto de placeholder deste dia.
const dia2 = todosOsDias.find((dia) => dia.numero === 2);
if (dia2) {
  dia2.titulo = "Aumenta a minha fé, Senhor";
  dia2.audioUrl = "/audio/dia-02.ogg";
  dia2.oracaoTempos = [0, 81.76];
  dia2.oracao = [
    "Senhor, mais uma vez eu entro na Tua presença para trazer em todos os momentos em que a minha fé foi fraca, em que por muitos momentos difíceis eu fraquejei, eu achei que estava sozinho, eu achei que estava abandonado e não lembrei daquele momento que Tu me carregava pelo colo. Ao longo desses anos de caminhada, eu acredito e aqui rezo, meu Deus, mesmo quando não percebo respostas diante da minha oração, quando não percebo respostas diante do meu pedido, mas eu não desisto, eu continuo firme na minha experiência que tem me fortalecido na oração e na Tua presença. Quando as respostas não vêm, quando nós não vemos os frutos da nossa oração, quando achamos até que Tu não estás ouvindo a nossa voz, não estás ouvindo a nossa súplica, que bate a tristeza, o vazio, a solidão, a fé fica como fumaça, a fé fica como areia que facilmente se vai com o vento.",
    "Mesmo assim, meu Deus, aqui eu estou para aclamar, aumenta a minha fé, Senhor. A fé, a certeza naquilo que não se vê, aumenta a minha fé na Tua providência, aumenta a minha fé na Tua presença na minha vida, aumenta a minha fé de que Tu é o meu Pai, que eu sou verdadeiramente o Teu Filho e devido a essa presença maravilhosa eu posso descansar na Tua graça, por isso aumenta a minha fé, faz com que a minha fé seja firme, forte, madura, para que a fé me traga paz, segurança, serenidade, Senhor. Aumenta a minha fé.",
  ];
}

// Conteúdo real do Dia 3, enviado por Marcos (transcrição da gravação de
// oração). Substitui o título e o texto de placeholder deste dia.
const dia3 = todosOsDias.find((dia) => dia.numero === 3);
if (dia3) {
  dia3.titulo = "Ensina-me a confiar na Tua Providência";
  dia3.audioUrl = "/audio/dia-03.ogg";
  dia3.oracaoTempos = [0, 33.66, 110.48, 143.0];
  dia3.oracao = [
    "Senhor, ensina-me a confiar na Tua providência. A providência que verdadeiramente provê, que verdadeiramente apresenta, que verdadeiramente traz. Senhor, em muitas situações eu não consigo entender o que Tu estás a fazer na minha vida, porque a minha mente, a minha limitação é humana, é limitada, é tendenciosa ao mal.",
    "Então ensina-me, Senhor, a confiar na Tua providência, de que nada vai faltar na minha vida, de que no auge da escassez, talvez do amor, talvez da esperança, talvez da alegria, no auge do desespero, da solidão, no auge da falta de esperança, que me assola o coração em tantos momentos. Eu saiba esperar, eu saiba confiar de que Tu has de agir no derradeiro momento, quando as forças humanas se acabam, Senhor, quando as forças humanas vão-se embora e fica apenas a esperança de que Deus está agindo com a Tua providência. Dessa forma eu quero a Deus, nesse oração, enxergar esse caminho e continuar acreditando no Teu cuidado, dia após dia, noite após noite, hora após hora, minuto após minuto, segundo após segundo.",
    "Ensina-me a confiar na Tua providência, que has de agir, que has de providenciar. Providência Santíssima do Eterno, Onipotente, Misericordiosíssimo Deus, que tudo Tens providenciado e providenciareis para o nosso bem. Providenciar em todas as nossas necessidades, assim creio, assim espero, seja sempre feita a Tua vontade.",
    "Amém.",
  ];
}

// Conteúdo real do Dia 4, enviado por Marcos (transcrição da gravação de
// oração). Substitui o título e o texto de placeholder deste dia.
const dia4 = todosOsDias.find((dia) => dia.numero === 4);
if (dia4) {
  dia4.titulo = "Senhor, fica comigo quando eu tiver medo";
  dia4.audioUrl = "/audio/dia-04.ogg";
  dia4.oracaoTempos = [0, 21.07, 35.55, 56.08, 61.39, 88.28, 100.93, 117.52, 132.73, 142.42];
  dia4.oracao = [
    "Senhor, quantas e quantas vezes eu fui assolado pelo medo. E neste momento, em meio ao medo que toma conta de mim, em meio à insegurança diante de tantas situações e preocupações que assolam o meu coração. Fica comigo, Senhor, quando tiver medo.",
    "Quando eu estiver com medo, fica comigo. Porque eu tenho certeza, Deus, que a Tua presença permanece. Fica comigo, Pai.",
    "Fica ao meu lado, me segura, meu Pai, quando o medo vier me assolar. Quando o medo bater a porta, quando o medo falar mais alto. Quando o medo disser que eu não vou conseguir.",
    "Quando o medo disser que eu vou perder. Quando o medo disser que eu vou morrer. Fica comigo.",
    "Porque no momento em que Tu estiver comigo, Pai, o medo cairá por terra, o medo não produzirá efeito. No momento em que estiver comigo, como agora, Senhor, eu estou com o coração medroso, inseguro e preocupado. Fica comigo.",
    "A minha súplica neste momento é essa. Eu não quero ouro, nem prata, nem coisas superiores a mim. Mas eu quero manter em calma e sossegada a minha alma.",
    "E o meu suspiro é esse, Senhor. Fica comigo quando eu tiver medo. Medo que constantemente me acompanha ao deitar, ao levantar, ao caminhar durante o dia.",
    "O medo que muitas vezes parece um monstro, parece um bicho, parece um pânico. Acima de tudo isso, Senhor, terei paz, terei segurança. Fica comigo, Senhor.",
    "Senhor, esteja do meu lado. Essa é a minha súplica deste momento. Senhor, fica comigo quando eu tiver medo.",
    "Amém.",
  ];
}

// Conteúdo real do Dia 5, enviado por Marcos (transcrição da gravação de
// oração). Substitui o título e o texto de placeholder deste dia.
const dia5 = todosOsDias.find((dia) => dia.numero === 5);
if (dia5) {
  dia5.titulo = "Quero aprender a caminhar Contigo";
  dia5.audioUrl = "/audio/dia-05.ogg";
  dia5.oracaoTempos = [0, 12.6, 35.8, 64.74, 83.11, 108.93, 121.76, 130.87];
  dia5.oracao = [
    "Quero aprender a caminhar contigo, Senhor. Senhor, nesse momento, eu busco intimidade contigo. Eu busco relacionamento contigo.",
    "Quantas vezes, meu Deus, eu procurei apenas quando precisava de alguma coisa. Quando tinha alguma intenção, eu procurava e depois desaparecia da Tua presença. Mas, hoje, meu Deus, eu quero aprender a caminhar contigo.",
    "Eu quero aprender a criar um relacionamento verdadeiro, uma amizade pura, uma amizade profunda contigo, meu Pai. Através da oração, essa comunhão, essa presença unida a Ti. Esse estar juntos, unidos com a Tua palavra e unidos com essa vida do dia-a-dia, meu Deus, eu procuro agora.",
    "Eu quero caminhar, eu quero dar passos, seguindo Teus passos. Eu quero, de verdade, eu quero estar unido, ter um pensamento contigo, Pai. Caminhar, o caminho se faz caminhando, Senhor.",
    "E eu quero que segure na minha mão para eu aprender, me ensina a caminhar contigo, a aprimorar, a amadurecer essa intimidade e esse relacionamento contigo, meu Pai. Para que eu esteja cada vez mais próximo, como Tu nos ensinaste, o Pai e eu somos um. Quem me vê, vê o Pai.",
    "Quem vê o Pai, me vê. Eu quero viver, Senhor, essa experiência, caminhando dia após dia contigo. Ensina-me, Senhor.",
    "Eu quero aprender, Pai. Eu me abro para esse aprendizado. Senhor, quero aprender a caminhar contigo.",
    "Amém.",
  ];
}

// Conteúdo real do Dia 6, enviado por Marcos (transcrição da gravação de
// oração). Substitui o título e o texto de placeholder deste dia.
const dia6 = todosOsDias.find((dia) => dia.numero === 6);
if (dia6) {
  dia6.titulo = "Senhor, eu não aguento mais sozinho";
  dia6.audioUrl = "/audio/dia-06.ogg";
  dia6.oracaoTempos = [0, 28.6, 69.44, 87.04, 91.35, 110.45];
  dia6.oracao = [
    "Senhor, eu não aguento mais sozinho. Eu quero, nessa oração em comunhão Contigo, nessa oportunidade da Tua presença, Senhor, eu quero entregar todas as cargas que existem na minha vida para Ti, meu Pai. Eu quero, nesse momento, dizer que eu não estou mais aguentando.",
    "Eu quero dizer de coração ao Senhor que eu quero aprender a colocar os problemas, os fardos, os pesos, nas Tuas mãos. Em vez de carregar tudo sozinho, eu quero ceder a Ti, Pai, e deixar que Tu possa realizar a Tua obra e realizar a Tua graça, meu Senhor e meu Deus, porque eu não aguento mais caminhar sozinho. Eu quero, Senhor, de todo o meu coração, me lançar verdadeiramente, me apresentar diante de Ti, Senhor.",
    "E dessa forma, oh Pai, eu quero dizer que eu não aguento mais caminhar sozinho. Eu quero ser o controlador de tudo. Eu quero ser o controlador das pessoas.",
    "Eu quero controlar as situações. Eu quero estar acima de tudo. Mas eu não aguento mais, Senhor, sozinho.",
    "E não quero mais caminhar sozinho. Caminha comigo, oh Deus. Caminha comigo, meu Senhor e meu Pai, porque eu não estou mais aguentando, mas aqui estou eu, mesmo cansado, mesmo aflito.",
    "Eu vou suplicar e clamar a Ti, Senhor. Eu não aguento mais, sozinho. Amém.",
  ];
}

// Conteúdo real do Dia 7, enviado por Marcos (transcrição da gravação de
// oração). Substitui o título e o texto de placeholder deste dia.
const dia7 = todosOsDias.find((dia) => dia.numero === 7);
if (dia7) {
  dia7.titulo = "Dá-me forças para continuar";
  dia7.audioUrl = "/audio/dia-07.ogg";
  dia7.oracaoTempos = [0, 57.14, 93.37, 127.23];
  dia7.oracao = [
    "Senhor, humanamente, nossas forças se esgotam, as nossas forças diminuem diante das lutas e dificuldades que vivemos, por isso o meu pedido é dar-me forças para continuar. Eu acredito e espero em Ti, que receberei o dom da perseverança, aqui clamo pela perseverança, para que a desistência não tome conta do meu coração, a desistência à família, a desistência à igreja, a desistência da fé, a desistência a perseverar na Tua presença. Quantas e quantas vezes, meu Deus, eu pensei em parar essa jornada de oração, esse devocional na Tua presença, mas eu não parei.",
    "Em meio ao barulho, em meio às provações, em meio às tribulações, eu clamo hoje a Deus, dá-me forças, porque é vão, como diz a Tua palavra, é vão qualquer esforço humano se Deus não agir. O projeto do homem, o homem faz muitos projetos, mas só Deus é capaz de produzir êxito neles. Por isso, eu entrego a minha falta de força, o meu desânimo, o meu cansaço.",
    "Eu entrego a fraqueza da minha alma, a fraqueza do meu corpo, a fraqueza do meu espírito. Eu entrego ao Pai, porque Tu és o meu Deus, o meu Senhor. E aqui eu entrego, porque eu sei que hás de converter, como diz na Tua palavra, os que confiam no Senhor renovam, o salmista disse, os que confiam no Senhor renovam as suas forças.",
    "Dá-me forças, Senhor, para continuar, para não desistir. Amém.",
  ];
}

// Conteúdo real do Dia 8, enviado por Marcos (transcrição da gravação de
// oração). Substitui o título e o texto de placeholder deste dia.
const dia8 = todosOsDias.find((dia) => dia.numero === 8);
if (dia8) {
  dia8.titulo = "Quando eu não entender, ajuda-me a confiar";
  dia8.audioUrl = "/audio/dia-08.ogg";
  dia8.oracaoTempos = [0, 17.06, 52.69, 94.27, 126.58, 144.27];
  dia8.oracao = [
    "Senhor, quando eu não entender, ajuda-me a confiar. As dúvidas, neste momento, meu pai, estão me assolando, estão judiando de mim. Principalmente porque a minha mente humana quer entender as coisas.",
    "A minha mente quer usar a razão em coisas sagradas, em coisas que a razão não tem espaço, porque ela excede a razão humana e entra a fé quando Deus age. Por isso, quando eu não entender, e são muitas situações da minha vida que trago agora e recordo da minha mente que eu não consegui entender. Foram muitas situações que fiquei sem resposta, sem entendimento.",
    "E eu clamo que, diante disso, Deus, como não entendo hoje tantas situações que eu vivo, ajuda-me a confiar, Senhor. Estende Sua mão poderosa sobre mim, ajuda-me a confiar, porque assim, pai, eu não preciso entender para saber que estás agindo, para saber que permite determinadas situações quando não temos respostas, porque Tu és o Senhor de tudo e o maior planejador, estrategista que já existiu. Todos os Teus afazeres, Senhor, são perfeitos.",
    "As Tuas obras, como diz o Salmo, são maravilhosas. O Teu agir é inexplicável, Senhor, mesmo que eu não entenda, mesmo que os apóstolos não entenderam, os profetas não entenderam. Mas ajuda-me a confiar, mesmo diante de tantas situações que agora eu lembro, que tragam o meu recordo do meu coração, situações que eu não consigo explicar.",
    "Ajuda-me a confiar, meu Senhor e meu pai, porque o filho muitas vezes não entende o pai, mas ele confia. Ele não entende, mas ele confia. A criança não entende muitas vezes, mas ela confia no pai.",
    "É que estou eu, Senhor, quando eu não entender, ajuda-me a confiar. Amém.",
  ];
}

// Conteúdo real do Dia 9, enviado por Marcos (transcrição da gravação de
// oração). Substitui o título e o texto de placeholder deste dia.
const dia9 = todosOsDias.find((dia) => dia.numero === 9);
if (dia9) {
  dia9.titulo = "Cura, Senhor, aquilo que ainda dói em mim";
  dia9.audioUrl = "/audio/dia-09.ogg";
  dia9.oracaoTempos = [0, 20.15, 56.59, 85.52, 118.69];
  dia9.oracao = [
    "Cura, Senhor, aquilo que ainda dói em mim. São feridas, meu Pai, que ainda existem dentro de mim, provocadas por palavras que eu recebi, palavras ouvidas que foram negativas dentro do meu interior, que geraram essas dores e feridas. Perdas.",
    "Perdas de N coisas, pessoas, cargos, bens, que vão gerando feridas, com sentimento de perda, de inferioridade, decepções, alinhado com as palavras de perdas, meu Pai. Mágoas que ainda tomam conta do meu coração, pessoas que eu não consegui perdoar do fundo, verdadeiramente do íntimo da minha alma. Eu aguardo o ressentimento mágoa, a falta do perdão, por diversos motivos que me feriram, Pai, principalmente acontecimentos do passado.",
    "Esses acontecimentos que ainda não foram encerrados, essa história, meu Pai. São tantos acontecimentos que humilharam, que diminuíram a minha pessoa, que mexeu com o meu ego, que mexeu com o meu orgulho. Por isso eu estou na Tua presença e suplico como aquele cego de Jericó diante de Ti, que dizia, Jesus, Filho de Davi, tem compaixão de mim.",
    "Jesus, Filho de Davi, tem compaixão de mim. Jesus, Filho de Davi, tem compaixão de mim. Eu me prosto diante de Ti, cura, Senhor, todas as dores e feridas que ainda existem em mim, que ainda me fazem sofrer, que ainda estão ao redor dessa ferida, Senhor, dolorindo, que ainda estão ao redor dessa ferida sensível e que me fazem sofrer a cada dia, meu Deus.",
    "Eu coloco todas essas feridas de dentro de mim para que com Tua mão poderosa, oh Pai, você me cura verdadeiramente. Cura, Senhor, aquilo que ainda dói em mim. Amém.",
  ];
}

// Conteúdo real do Dia 10, enviado por Marcos (transcrição da gravação de
// oração). Substitui o título e o texto de placeholder deste dia.
const dia10 = todosOsDias.find((dia) => dia.numero === 10);
if (dia10) {
  dia10.titulo = "Não permitas que eu desista";
  dia10.audioUrl = "/audio/dia-10.ogg";
  dia10.oracaoTempos = [0, 19.62, 45.06, 75.81, 91.61, 119.8];
  dia10.oracao = [
    "Senhor, não permita que eu desista. São muitas dificuldades vividas, Senhor, que eu estou passando por esse vale, estou passando por esse deserto. Eu não vejo água, eu não vejo comida, eu não vejo sombra, eu não vejo arejo, Senhor, eu não vejo nada.",
    "Eu estou hoje sem esperança, meu Deus, em meio às dificuldades. Por isso eu estou aqui, Pai, clamando nessa oração, do fundo do meu coração, porque verdadeiramente eu rezo e entro em comunhão contigo nessa oração. Diante de tudo, Senhor, a vontade de desistir ainda me acompanha.",
    "Em muitos momentos, durante o dia da minha semana, eu penso em abandonar essa caminhada de fé, essa caminhada de esperança, meu Deus. Mas como tantas pessoas te seguiram, quantos, tantos clamaram a Ti e tiveram respostas. Quando a mulher de um fluxo sanguíneo que tocou em Ti, ela estava a desesperar, 12 anos, Senhor, clamando por uma cura, por um milagre, por uma transformação de vida, pois ela olhou, tocou na sua veste e foi curada.",
    "Ela foi apanhada pela falta de esperança por muitas vezes durante esses 12 anos. Não deixa que eu desista, Pai. Não deixa que eu desista.",
    "Não deixa que essa esperança, Senhor, venha sair da minha vida, venha sair do meu coração, porque a esperança é a fé. A esperança nada mais é do que a fé, Senhor, que ainda continua viva em meio ao pedregulho, as dificuldades, o deserto, ó Deus. Eu confio, Senhor, e quero renovar a minha esperança na Tua presença, na Tua misericórdia, Senhor.",
    "Escuta a minha voz do fundo do meu interior, Pai, na divisão do meu corpo, da minha alma e do meu espírito, Senhor. Não permita que eu desista. Amém.",
  ];
}

// Conteúdo real do Dia 11, enviado por Marcos (transcrição da gravação de
// oração). Substitui o título e o texto de placeholder deste dia.
const dia11 = todosOsDias.find((dia) => dia.numero === 11);
if (dia11) {
  dia11.titulo = "Senhor, ensina-me a rezar";
  dia11.audioUrl = "/audio/dia-11.ogg";
  dia11.oracaoTempos = [
    0, 18.95, 39.56, 58.46, 65.36, 82.56, 95.21, 109.17, 126.63, 136.68, 146.49, 157.95,
  ];
  dia11.oracao = [
    "Senhor, ensina-me a rezar. Em quantos momentos, meu Deus, meu Pai, meu amigo, meu Senhor, eu paro para entrar em comunhão contigo e a única intenção é pedir, pedir e pedir. E eu ainda peço mal, Senhor, às coisas.",
    "Eu peço em prol do meu orgulho, a verdade é essa. Eu peço em prol do meu ego. Eu peço graças muitas vezes na Tua presença por causa da minha vaidade, benefício próprio e muito egoísmo.",
    "Ensina-me a rezar, Senhor. Ensina-me verdadeiramente a usufruir dessa conversa que é uma oportunidade única da minha alma entrar em comunhão contigo. Ensina-me a ouvir, Senhor, a Tua palavra em meio à oração que é um diálogo.",
    "A oração que é um diálogo, é uma conversa entre duas pessoas. Enquanto um fala, o outro escuta. Enquanto um escuta, o outro fala.",
    "E eu só falo e não ouço. E mais do que ouvir, colocar em prática a Tua palavra, Senhor. Mais do que ouvir, colocar em prática.",
    "Ensina-me a rezar, Senhor. Ensina-me que nessa oração eu entrego, eu preciso entregar, meu Deus. Então ensina-me.",
    "Manda o Teu Espírito Santo sobre mim e ensina-me a entregar. Entregar as minhas preocupações, entregar o meu egoísmo, a minha autossuficiência. Entregar a minha vaidade, o orgulho, a inveja, a mentira.",
    "Entregar os podres da minha vida, entregar as misérias do meu viver. Entregar os maus pensamentos, entregar. E principalmente, meu Senhor, um espírito de agradecimento.",
    "O agradecer por tanto que eu tenho recebido. Que não é por merecimento, é por graça. É de graça e por graça.",
    "E o principal, meu Pai, permanecer na Tua presença nessa oração. Ensina-me. Ensina-me como os discípulos disseram ao Pai.",
    "Senhor, ensina-nos a rezar. E Tu ensinastes, Pai nosso que estás no céu. Eis-me aqui, Senhor.",
    "Ensina-me a rezar. Amém.",
  ];
}

export function getDia(numero: number): Dia | undefined {
  return todosOsDias.find((dia) => dia.numero === numero);
}

export function getAreaDoDia(numero: number): Area | undefined {
  return areas.find((a) => a.dias.some((dia) => dia.numero === numero));
}

export const TOTAL_DIAS = 40;
