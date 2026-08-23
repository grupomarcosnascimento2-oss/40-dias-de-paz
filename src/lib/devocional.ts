export type Dia = {
  numero: number;
  titulo: string;
  palavra: string;
  referencia: string;
  proposito: string;
  frase: string;
  audioUrl?: string;
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

export function getDia(numero: number): Dia | undefined {
  return todosOsDias.find((dia) => dia.numero === numero);
}

export function getAreaDoDia(numero: number): Area | undefined {
  return areas.find((a) => a.dias.some((dia) => dia.numero === numero));
}

export const TOTAL_DIAS = 40;
