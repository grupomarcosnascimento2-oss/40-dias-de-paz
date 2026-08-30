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

// Conteúdo real do Dia 12, enviado por Marcos (transcrição da gravação de
// oração). Substitui o título e o texto de placeholder deste dia.
const dia12 = todosOsDias.find((dia) => dia.numero === 12);
if (dia12) {
  dia12.titulo = "Quero colocar minha família em Tuas mãos";
  dia12.audioUrl = "/audio/dia-12.ogg";
  dia12.oracaoTempos = [0, 6.14, 12.58, 35.46, 62.57, 78.58, 103.86, 121.15, 141.09, 148.3];
  dia12.oracao = [
    "Senhor, quero colocar minha família em Tuas mãos.",
    "Meu Deus, meu Senhor, meu Pai, meu Amigo, meu Rei, meu Mestre.",
    "Eu quero, nesta oração, colocar a minha família nas Tuas mãos. Uma vez que a família é projeto de Deus, uma vez que do coração de Deus surge a família, eu coloco filho, filha, esposa, pais, irmãos, irmãs e pessoas queridas nas Tuas mãos, meu Deus.",
    "Quantas vezes eu tento mudar as pessoas, sendo que eu que tenho que mudar. Eu que tenho que dar essa reviravolta dentro de mim: mudança de pensamento, Senhor; mudança de atitude; mudança de comportamento. E, em vez de exigir das pessoas a mudança, eu quero, Pai, que Tu me ajude a eu mudar.",
    'Por isso eu peço: abençoa e consagra a minha família e tudo, porque a Palavra nos diz, como Paulo falou: "Crê no Senhor Jesus e serás salvo, tu e a tua casa."',
    "Essa palavra conforta, Senhor, o meu coração. Creio que a minha fé é capaz de salvar a minha família, é capaz de salvar o meu casamento, é capaz de salvar o meu filho de desastres, de problemas, de uma vida desregrada, Pai.",
    "É a fé que salva e nos leva ao céu em família. E por isso eu entrego, Senhor, toda a minha família nas Tuas mãos: os desafios familiares, as lutas familiares, meu Pai, a cada dia, a cada oração.",
    "Eu confio, Senhor, que estou aqui com a força da oração, na possibilidade de minha família ser salva pelo poder e a força da oração, porque a oração é a força mais poderosa da terra.",
    "Eu rezo pela minha família, Senhor. Eu quero colocar minha família em Tuas mãos.",
    "Amém.",
  ];
}

// Conteúdo real do Dia 13, enviado por Marcos (transcrição da gravação de
// oração). Substitui o título e o texto de placeholder deste dia.
const dia13 = todosOsDias.find((dia) => dia.numero === 13);
if (dia13) {
  dia13.titulo = "Senhor, escuta o meu pedido";
  dia13.audioUrl = "/audio/dia-13.ogg";
  dia13.oracaoTempos = [0, 2.56, 18.12, 31.05, 53.73, 73.91, 93.1, 108.55, 121.17, 123.49];
  dia13.oracao = [
    "Senhor, escuta o meu pedido.",
    'Ó Pai, na Tua Palavra me ensinas a pedir: "Pedi e recebereis; buscai e encontrareis; batei e abrir-se-vos-á. Porque todo aquele que pede, recebe; e quem busca, encontra; e a quem bate, abrir-se-á."',
    "Este gesto, Senhor, eu aqui concretizo. Porque não vou murmurar, não quero murmurar diante da Tua presença. Não quero reclamar diante da Tua presença.",
    "Que a minha oração, que o meu pedido, que a minha súplica, Pai, seja gesto de pequenez, que demonstre a minha necessidade, que demonstre o tanto que eu preciso de Ti, que demonstre este reconhecimento de que sem Ti, Senhor, eu não sou nada. E isso é pura verdade, meu Pai.",
    "Sem Ti, meu Deus, sem o Senhor, eu não sou quem eu sou, eu não terei o que tenho, eu não consigo fazer nada, porque Tu és a origem, meu Pai. És a origem de tudo, és a origem da minha força, do meu respirar, da minha vida, de tudo o que eu sei.",
    "E a Tua Palavra me convida a buscar, e buscar em primeiro lugar, de todo o coração. E aqui estou, Senhor, nesta súplica e entrega, com o meu desejo profundo de colocar-Te em primeiro lugar, Pai. Em primeira circunstância, meu Deus.",
    "Aqui eu estou clamando, Senhor, que a minha oração chegue até Vós. Senhor, escuta o meu pedido, Pai. Que suba pela intercessão da Virgem Maria, Nossa Mãe Santíssima, pela intercessão de todos os santos e anjos.",
    "Eu clamo agora por isso, Pai: pela Tua bondade e misericórdia. Usa desta misericórdia comigo, que sou misericórdia diante de Ti.",
    "Senhor, escuta o meu pedido.",
    "Amém.",
  ];
}

// Conteúdo real do Dia 14, enviado por Marcos (transcrição da gravação de
// oração). Substitui o título e o texto de placeholder deste dia.
const dia14 = todosOsDias.find((dia) => dia.numero === 14);
if (dia14) {
  dia14.titulo = "Ensina-me a esperar a Tua resposta";
  dia14.audioUrl = "/audio/dia-14.ogg";
  dia14.oracaoTempos = [0, 2.65, 16.31, 30.7, 40.55, 57.04, 75.35, 82.97, 119.02, 129.58, 133.33];
  dia14.oracao = [
    "Senhor, ensina-me a esperar a Tua resposta.",
    "Meu Pai, meu Senhor e meu Deus, quantas vezes eu me coloco diante da Tua presença e clamo, Senhor, justamente com o coração ansioso, com o coração sem condições de esperar a Tua resposta.",
    "Ó Deus, Tu nunca nos deixas sem resposta. Nunca deixaste os profetas sem resposta. Até o próprio Cristo, Pai, Vosso Filho Amado, nunca o deixaste sem resposta.",
    "Por isso, hoje, meu Deus, nesta oração, meu Senhor e meu Rei, eu quero clamar: Senhor, ensina-me a esperar a Tua resposta.",
    "Porque eu acredito na força da oração. Eu acredito que, através da nossa oração, a Tua resposta chega até nós. O nosso coração fica sensível, o nosso coração fica preparado para a Tua resposta.",
    "E muitas e muitas vezes, Senhor, ao não esperar a Tua resposta, agi por conta própria, buscando os meus próprios caminhos, as minhas próprias resoluções, Senhor. E isso não me fez feliz e me levou para caminhos errados, ó Pai.",
    "Por isso, hoje, nesta oportunidade, Senhor, eu suplico: eu quero esperar. Ensina-me a esperar.",
    "Manda o Teu Espírito Santo sobre mim, através da intercessão de Nossa Senhora, que é a nossa professora de oração. Ela nos ensina a esperar, porque Maria esperou. Nossa Senhora sabia esperar profundamente a vontade de Deus acontecer na sua vida. Ela via as realidades, mas mesmo assim acreditava na misericórdia e na graça de que Deus haveria de dar resposta, de que Deus haveria de vir ao encontro, Senhor, de acordo com a Tua vontade, meu Pai.",
    "Por isso, Senhor, aqui eu clamo: eu quero aprender a esperar essa resposta, porque certamente ela vai me guiar, Senhor, vai guiar o meu coração, ó Pai.",
    "Senhor, ensina-me a esperar a Tua resposta.",
    "Amém.",
  ];
}

// Conteúdo real do Dia 15, enviado por Marcos (transcrição da gravação de
// oração). Substitui o título e o texto de placeholder deste dia.
const dia15 = todosOsDias.find((dia) => dia.numero === 15);
if (dia15) {
  dia15.titulo = "Mesmo sem ver, eu continuarei rezando";
  dia15.audioUrl = "/audio/dia-15.ogg";
  dia15.oracaoTempos = [0, 3.37, 27.26, 39.35, 47.99, 74.02, 93.35, 117.59, 136.98, 143.49];
  dia15.oracao = [
    "Senhor, mesmo sem ver, eu continuarei rezando.",
    "Meu Deus, nesta oração de agora, Senhor, eu quero fazer uma grande súplica para professar a Jesus. Nesta oração, as circunstâncias que eu vivo, Pai, as circunstâncias em que eu estou no meu presente, meu Deus, nas quais eu não estou vendo nada.",
    "Eu não estou enxergando nada. Não estou vendo o Teu agir, ó Pai. Eu não estou vendo as coisas acontecerem conforme o meu coração pede. Eu não vejo.",
    "A minha visão é limitada, extremamente curta e humana, medíocre e egoísta, meu Deus, autossuficiente, Pai.",
    "Mesmo sem ver, eu não vou parar de rezar. Eu não vou cessar o meu clamor, eu não vou cessar o meu pedido na Tua presença, meu Deus, de bênção, de graça, Senhor, porque a Tua Palavra me convida a fazer esse clamor, para que chegue a Deus no íntimo do Seu coração.",
    "Nesta experiência de oração, neste caminhar de oração, nestes quarenta dias de oração, Pai, eu quero viver essa graça de continuar rezando, porque através da força da perseverança, meu Deus, a Tua graça acontece na nossa vida.",
    'A Tua graça, Senhor, se manifesta poderosamente, gloriosamente. Ó Senhor, eu continuarei rezando porque Tu estavas com os Teus discípulos e Tomé disse: "Se eu não vir as marcas dos pregos nas Suas mãos e não puser o dedo no lugar dos pregos, e não puser a mão no Seu lado, não crerei."',
    'Tu te colocaste no meio deles, mostraste-lhe as chagas e o lado e disseste: "Feliz és tu porque viste e creste, Tomé." E acrescentaste: "Felizes os que creram sem ter visto. Bem-aventurados aqueles que creem sem ter visto."',
    "Por isso, meu Senhor: mesmo sem ver, eu continuarei rezando.",
    "Amém.",
  ];
}

// Conteúdo real do Dia 16, enviado por Marcos (transcrição da gravação de
// oração). Substitui o título e o texto de placeholder deste dia.
const dia16 = todosOsDias.find((dia) => dia.numero === 16);
if (dia16) {
  dia16.titulo = "Senhor, cuida de mim";
  dia16.audioUrl = "/audio/dia-16.ogg";
  dia16.oracaoTempos = [0, 2.36, 12.48, 32.86, 46.03, 68.56, 88.63, 107.44, 131.12, 135.96];
  dia16.oracao = [
    "Senhor, cuida de mim.",
    "Ó meu Deus, a palavra é tão forte, Senhor, que chega ao meu coração neste momento.",
    "Cuida de mim como o pai que cuida do seu filho recém-nascido: o filho que ainda não sabe viver, que ainda não sabe andar como deveria, que ainda não sabe falar como deveria, que ainda não tem ideia do que está ao seu redor.",
    "Eu hoje, Senhor, nesta oração, quero de verdade me colocar como essa criança, como esse recém-nascido, totalmente dependente do seu pai.",
    "Para comer, para o banho, para dormir, em tudo esse recém-nascido precisa do pai, precisa do cuidado do pai, precisa do cuidado da mãe. Eu quero hoje, ó Deus, me colocar como esse recém-nascido, meu Senhor, e depender de Ti em tudo.",
    "Do mais íntimo da minha alma eu clamo, eu suplico: dependo de Ti. Cuida de mim com o cuidado de pai, com o cuidado de mãe, que nada me falte, com o cuidado que o filho recém-nascido requer.",
    "São horas de cuidado, são noites e noites de cuidado para o bem-estar dessa criança. Ó Senhor, vem cuidar, vem me limpar, vem enxugar-me, vem me alimentar, Senhor, como esse pai que alimenta o seu filho.",
    "Vem ao meu encontro, Senhor. Cuida de mim, das minhas feridas. Cuida de mim, das minhas necessidades, ó Pai. Cuida de tudo o que há em mim, Senhor: o que há de necessidade dentro de mim, no meu coração, na minha história de vida, em todo o meu ser.",
    "Cuida de mim. Vem, Senhor. Senhor, cuida de mim.",
    "Amém.",
  ];
}

// Conteúdo real do Dia 17, enviado por Marcos (transcrição da gravação de
// oração). Substitui o título e o texto de placeholder deste dia.
const dia17 = todosOsDias.find((dia) => dia.numero === 17);
if (dia17) {
  dia17.titulo = "Tu conheces minhas necessidades";
  dia17.audioUrl = "/audio/dia-17.ogg";
  dia17.oracaoTempos = [0, 2.33, 19.1, 41.02, 69.3, 88.8, 102.71, 137.42, 141.58];
  dia17.oracao = [
    "Senhor, Tu conheces minhas necessidades.",
    "Antes, meu Senhor e meu Deus, que a palavra chegue aos meus lábios, Tu já conheces todas as minhas palavras. Tu me perscrutas, ou seja, sondas o meu coração; conheces o meu interior.",
    "Leva-me, Senhor, então por esse caminho. E o que tiver de mal em mim, Senhor, que Tu conheces por completo, retira, meu Deus. Tira todo o caminho mau, tudo o que não Te pertence, Senhor. E guia-me, como me conheces por completo. Guia-me, Senhor, por esse caminho: o caminho da verdade, o caminho da eternidade.",
    "Por isso, como o Salmo diz: Tu me sondas e me conheces por dentro, Senhor. E eu aqui clamo e entrego, porque mais do que eu peça situações, mais do que eu peça as coisas, mais do que eu peça graças e mais graças, só Tu conheces o meu coração, só Tu conheces a minha necessidade, Senhor, porque Tu me perscrutas.",
    "Como o profeta Jeremias: Tu me conheces desde o ventre materno, Tu me chamaste desde o ventre materno. Então, Senhor, é nesse conhecimento que Tu sabes as minhas fraquezas, que Tu sabes os meus pontos fortes, mas também Tu sabes os meus pontos fracos.",
    "E aqui, Senhor Jesus, Senhor amado, meu Senhor e meu Deus, Tu conheces as minhas necessidades. E eu apresento todas as necessidades que eu tenho, que são inúmeras.",
    "É difícil até falar: eu tenho necessidade de cura, eu tenho necessidade de paz, eu tenho necessidade de crescer na Tua presença, eu tenho necessidade de mudar de vida, eu tenho necessidade de pensar diferente, eu tenho necessidade de abandonar o orgulho, eu tenho necessidade de estar diante de Ti de noite e de dia, prostrando-me, Senhor, na Tua presença. Eu tenho necessidade disso tudo, Pai.",
    "E Tu conheces todo o meu interior, Senhor. Tu conheces minhas necessidades.",
    "Amém.",
  ];
}

// Conteúdo real do Dia 18, enviado por Marcos (transcrição da gravação de
// oração). Substitui o título e o texto de placeholder deste dia.
const dia18 = todosOsDias.find((dia) => dia.numero === 18);
if (dia18) {
  dia18.titulo = "Protege minha casa e minha família";
  dia18.audioUrl = "/audio/dia-18.ogg";
  dia18.oracaoTempos = [0, 2.23, 15.31, 22.25, 53.58, 61.0, 93.1, 121.63, 129.89, 135.12];
  dia18.oracao = [
    "Senhor, protege minha casa e minha família.",
    "Como diz o Salmo, Senhor: os malvados lançam olhares pecaminosos sobre mim, mas o meu refúgio está em Deus. Eu e minha casa serviremos ao Senhor.",
    "Mais uma vez, meu Deus, na Tua presença, quero suplicar a Tua proteção, ó Pai. Protege minha casa e minha família, Senhor.",
    "Estamos sujeitos, Senhor, a tantos episódios negativos, a acontecimentos malditos, meu Deus: tragédias, roubo, furto, acidente. Protege minha casa, Senhor. Protege minha família, livrando-nos de toda perseguição material, de todas as pessoas que não gostam de mim, da minha casa e da minha família, das pessoas que têm inveja de mim, da minha casa e da minha família, meu Deus.",
    "E além disso, Senhor, de toda perseguição espiritual. Protege, Senhor, a minha casa de toda perseguição espiritual, Pai.",
    "Eu clamo e suplico neste momento, Senhor Jesus, Deus amado e querido: vem proteger. Tu és o Guarda de Israel. Tu és o Selador de Israel. Eu sou esse Israel, minha família é esse Israel: meu pai, minha mãe, meus irmãos, minha esposa, meus filhos, parentes e todos que estiverem ao meu redor e fizerem parte da minha linhagem. Eu clamo neste momento, Senhor, pela intercessão de Nossa Senhora.",
    "Para que, através desta oração, chegue ao Teu coração o pedido de súplica de proteção contra todos os males, contra tudo aquilo que não Te pertence, meu Deus: toda perseguição, toda batalha espiritual, toda batalha física, tudo o que for espírito de destruição, tudo o que não Te pertencer, meu Deus, e que venha a afligir a minha casa e a minha família.",
    "Meu Senhor, eu clamo agora que Tu venhas ao meu encontro, que Tu venhas ouvir a minha oração, que a minha oração chegue até o Teu coração.",
    "Senhor, protege a minha casa e a minha família.",
    "Amém.",
  ];
}

// Conteúdo real do Dia 19, enviado por Marcos (transcrição da gravação de
// oração). Substitui o título e o texto de placeholder deste dia.
const dia19 = todosOsDias.find((dia) => dia.numero === 19);
if (dia19) {
  dia19.titulo = "Obrigado, Senhor, por aquilo que muitas vezes não percebo";
  dia19.audioUrl = "/audio/dia-19.ogg";
  dia19.oracaoTempos = [0, 3.4, 32.08, 54.24, 78.18, 103.64, 121.15, 132.8, 143.13];
  dia19.oracao = [
    "Obrigado, Senhor, por aquilo que muitas vezes não percebo.",
    "Senhor amado, meu Deus querido, o meu foco está tão voltado às minhas necessidades. Eu tenho hoje em mente tantas questões a pedir que esqueço de agradecer. Eu esqueço muitas vezes, meu Senhor, de agradecer e de perceber as pequenas coisas que são obra da Tua graça e que estão ao meu redor.",
    "Eu preciso hoje estar sensível para enxergar na natureza, para enxergar o dom da vida, o acordar de manhã, o pão de cada dia, a Tua proteção, a Tua graça, o meu sustento, o meu trabalho, a minha oportunidade de ir à santa Missa, a oportunidade de comungar, a oportunidade de entrar em oração e comunhão Contigo.",
    "É no meu vestir, no meu olhar, no meu falar, no meu corpo, na minha mente, na minha alma: são detalhes, são coisas que eu não percebo, as graças que estão ao meu redor, são situações que eu não enxergo e pelas quais não sou grato. Mas hoje eu estou aqui para agradecer.",
    "Diante daquilo que eu não percebo, mas já agradeço: o pão de cada dia, a minha saúde, as minhas pernas, as minhas mãos, os meus cinco sentidos — o meu olhar, o meu ouvir, o meu falar, o meu sentir. Todos os sentidos que tenho no meu corpo eu Te agradeço imensamente: por poder andar, por poder falar, por poder enxergar, por poder ouvir.",
    "Obrigado, Senhor, porque eu tenho uma casa para morar, tenho teto que me cobre. Obrigado, Senhor, porque eu tenho pessoas que me querem bem. Obrigado pela minha família, pela minha esposa, pelos meus filhos.",
    "Muito obrigado, Senhor, pela cama em que eu durmo, por todos os paramentos que existem na minha cama. Obrigado, Senhor, pelo alimento.",
    "Obrigado, obrigado, Senhor, por tudo. Eu Te agradeço de coração. Obrigado, Senhor, por aquilo que muitas vezes não percebo.",
    "Amém.",
  ];
}

// Conteúdo real do Dia 20, enviado por Marcos (transcrição da gravação de
// oração). Substitui o título e o texto de placeholder deste dia.
const dia20 = todosOsDias.find((dia) => dia.numero === 20);
if (dia20) {
  dia20.titulo = "Quero confiar mais e reclamar menos";
  dia20.audioUrl = "/audio/dia-20.ogg";
  dia20.oracaoTempos = [0, 4.31, 29.37, 56.21, 80.76, 105.22, 131.1, 134.72];
  dia20.oracao = [
    "Senhor, quero confiar mais e reclamar menos.",
    "A murmuração ainda existe em mim, Senhor. Retira de mim toda essa murmuração, toda reclamação e insatisfação pessoal diante da vida, diante das coisas e das pessoas, porque tem predominado na minha vida, Senhor, essa reclamação e murmuração.",
    "Ao invés de agradecer e confiar mais, eu ainda dou espaço para a reclamação. Mas hoje, Senhor, eu tomei consciência disso. Eu busquei o entendimento disso, meu Deus, e na Tua presença eu me lanço com toda a confiança, Pai, porque Tu és o Senhor dos Senhores, o Rei dos Reis, o Criador de todas as coisas.",
    "Por isso eu agradeço, quero agradecer muito, Pai. Não sou digno de ter recebido tanto de Ti. Eu sei que não é pelo meu merecimento, mas é pela graça que me foi concedida através de Jesus Cristo e pela intercessão de Nossa Senhora, a mediadora das graças que vêm de Jesus e que constantemente estou recebendo.",
    "Com tudo isso eu tenho que agradecer e parar de murmurar e reclamar, porque é uma ingratidão, é uma incompreensão da minha parte, ó Pai. A minha murmuração e a minha reclamação são uma tentação que hoje eu vivi.",
    "A reclamação e a murmuração negam a ação de Deus. Por isso, em oração, meu Senhor, eu renuncio, em nome de Jesus e pela intercessão de Nossa Senhora, a todo espírito de reclamação, a tudo o que não Te pertence, a toda murmuração que me acompanha. Senhor, Te entrego neste momento.",
    "Senhor, quero confiar mais e reclamar menos.",
    "Amém.",
  ];
}

// Conteúdo real do Dia 21, enviado por Marcos (transcrição da gravação de
// oração). Substitui o título e o texto de placeholder deste dia.
const dia21 = todosOsDias.find((dia) => dia.numero === 21);
if (dia21) {
  dia21.titulo = "Senhor, perdoa os meus erros";
  dia21.audioUrl = "/audio/dia-21.ogg";
  dia21.oracaoTempos = [0, 2.28, 24.0, 36.39, 61.27, 77.43, 86.27, 89.23];
  dia21.oracao = [
    "Senhor, perdoa os meus pecados.",
    "Meu Pai, neste dia, meu Deus, meu Senhor, meu Criador, eu quero pedir perdão pelos meus pecados, pelas minhas faltas, pelas minhas transgressões, pelas minhas revoltas e pela minha desobediência diante da Tua Palavra. São muitas as falhas, meu Deus, que durante o dia eu cometi e cometo.",
    "A Bíblia nos ensina, Senhor, que o justo peca sete vezes ao dia e se arrepende, esperando de Ti a misericórdia, ó Deus de Israel.",
    "Pois eu aqui, Senhor, quero de verdade reconhecer a minha falta, reconhecer o meu erro, reconhecer as minhas necessidades e pedir perdão com o propósito de não mais pecar, de não mais errar e de buscar novos caminhos para não me levar às quedas que o meu coração já conhece, que já sabe quais são as situações que me levam a pecar.",
    "Prontamente, Senhor, eu me coloco aqui, humildemente, pedindo perdão pelas minhas faltas, ó Pai. Tu és Deus rico em misericórdia, justo Juiz e rico em misericórdia, meu Deus.",
    "Perdão pelos meus pecados, pelas minhas faltas. E quero progredir, sem mais pecar, meu Deus, na Tua presença.",
    "Senhor, perdoa os meus erros.",
    "Amém.",
  ];
}

// Conteúdo real do Dia 22, enviado por Marcos (transcrição da gravação de
// oração). Substitui o título e o texto de placeholder deste dia.
const dia22 = todosOsDias.find((dia) => dia.numero === 22);
if (dia22) {
  dia22.titulo = "Ensina-me a perdoar";
  dia22.audioUrl = "/audio/dia-22.ogg";
  dia22.oracaoTempos = [0, 1.22, 20.75, 57.71, 85.39, 98.21, 108.22, 110.14];
  dia22.oracao = [
    "Senhor, ensina-me a perdoar.",
    "Ó meu Deus, meu Pai, pela intercessão de Nossa Senhora, Mãe Santíssima, que intercede por todos nós, nesta oração, meu Pai, eu quero fazer este clamor: eu quero perdoar. Eu sei que eu preciso perdoar, é necessário o perdão.",
    "Eu tenho essa boa intenção, mas o meu coração não consegue, porque eu não sei perdoar. São muitas as pessoas que me ofenderam, me feriram, me magoaram, Senhor, em diversos momentos da minha vida. Mas eu não quero que isso se transforme numa ferida, numa mágoa, num ódio, meu Deus, que não combina comigo, nem com o Teu plano, nem com o Teu processo de salvação, nem com a Tua Palavra, Senhor. A falta de perdão não combina.",
    'Por isso eu quero ser ensinado, eu quero ser aprendiz do perdão. E Tu, meu Pai, meu Senhor, que durante o Teu ministério nesta terra nos ensinaste a perdoar os que Te ofenderam: no alto da cruz dizias: "Pai, perdoa-lhes, porque não sabem o que fazem", meu Senhor e meu Deus.',
    "Eu quero chegar nesse ponto para que o meu coração seja leve e que eu possa seguir nesta vida com suavidade espiritual, libertando-me dessa mágoa, daquilo que precisa do perdão, Pai.",
    "Por isso, Senhor, eu quero aprender a perdoar, porque Tu nos ensinaste a cada dia, meu Senhor e meu Deus.",
    "Senhor, ensina-me a perdoar.",
    "Amém.",
  ];
}

export function getDia(numero: number): Dia | undefined {
  return todosOsDias.find((dia) => dia.numero === numero);
}

export function getAreaDoDia(numero: number): Area | undefined {
  return areas.find((a) => a.dias.some((dia) => dia.numero === numero));
}

export const TOTAL_DIAS = 40;
