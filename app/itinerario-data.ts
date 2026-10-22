export interface Item {
  time?: string | string[];
  text: string;
  note?: string;
  friends?: boolean;
  link?: { label: string; url: string };
  /** Tags iniciais definidas no código (ex.: amigos confirmados). */
  tags?: string[];
}

export interface Block {
  period: string;
  items: Item[];
}

export interface Day {
  n: number;
  weekday: string;
  date: string;
  region: string;
  blocks: Block[];
}

export const days: Day[] = [
  {
    n: 1,
    weekday: "Quarta-feira",
    date: "28 out 2026",
    region: "Liberdade",
    blocks: [
      {
        period: "Manhã",
        items: [
          { time: "5:00–6:00", text: "Deslocamento" },
          { time: "6:25", text: "Saída de Florianópolis ✈️" },
          { time: "8:00", text: "Chegada em São Paulo (Aeroporto de Guarulhos)" },
          { time: "8:00–9:30", text: "Deslocamento" },
          { time: "9:30–10:00", text: "Deixar as malas no hotel (Urban L)" },
          { time: "10:00–13:00", text: "Museu da Imigração Japonesa" },
        ],
      },
      {
        period: "Tarde",
        items: [
          { time: "13:00-14:00", text: "Almoço no Liberdade Side Street", friends: true },
          { time: "14:00-16:00", text: "Check-in no hotel — banho e descanso" },
          { time: "16:00-19:00", text: "Lojinhas: Daiso + Korean Mart + Sogo Plaza" },
        ],
      },
      {
        period: "Noite",
        items: [
          { time: "19:30-21:00", text: "Jantar na Liberdade — Shoo Loong Kan (fondue/hotpot)", friends: true },
        ],
      },
    ],
  },
  {
    n: 2,
    weekday: "Quinta-feira",
    date: "29 out 2026",
    region: "Liberdade · Pinheiros · Paulista",
    blocks: [
      {
        period: "Manhã",
        items: [
          { time: "8:30–9:00", text: "Café da manhã no hotel" },
          { time: "9:30–11:00", text: "Passeio pela Liberdade — Comix Book Shop" },
          { time: "12:00", text: "Checkout do hotel — Guardar as malas no maleiro" },
        ],
      },
      {
        period: "Tarde",
        items: [
          { time: "12:30", text: "Almoço — Liberdade Side Street ou outro lugar que acharmos maneiro" },
          { time: "14:00", text: "Pegar as malas + Uber até o Airbnb" },
          {
            time: "15:00", text: "Check-in no Airbnb",
          },
          { time: "16:00-18:00", text: "Outlets — Converse, Vans, Rip Curl" },
        ],
      },
      {
        period: "Noite",
        items: [
          { time: "18:00", text: "Shopping — Shopping Cidade São Paulo", friends: true },
        ],
      },
    ],
  },
  {
    n: 3,
    weekday: "Sexta-feira",
    date: "30 out 2026",
    region: "Sé · Vila Mariana",
    blocks: [
      {
        period: "Manhã",
        items: [
          { time: "9:00", text: "Copan & café da manhã",
            note: "Magg Café, Café Floresta, Tem Umami, Pão de Queijo da Dona Zelda"
           },
          { time: "10:00", text: "Nova Era Games" },
          { time: "11:00", text: "Kodak Mafia" },
          { time: "12:00", text: "Almoço Galeria Metrópole",
            note: ""
           },
        ],
      },
      {
        period: "Tarde",
        items: [
          { time: "13:00", text: "Copan / Galeria do Rock / Kodak Mafia" },
          { text: "25 de Março — Galeria Pagé" }
        ],
      },
      {
        period: "Noite",
        items: [
          {
            time: ["18:20–20:40", "21:00–23:20"],
            text: "Jantar na Taverna Medieval",
            friends: true,
            tags: ["Dan"],
            note: "⚠️ Precisa de reserva · são 2h de permanência · se for trajado(a) tem desconto · 15–25 min de Uber do Airbnb",
          },
        ],
      },
    ],
  },
  {
    n: 4,
    weekday: "Sábado",
    date: "31 out 2026",
    region: "Paulista · Vinhedo",
    blocks: [
      {
        period: "Dia inteiro",
        items: [
          { text: "Hopi Hari — Hora do Horror 🎃", note: "Ingressos no email" },
          { text: "Saída do MASP (ponto de encontro/passeio)" },
          {
            text: "Links úteis:",
            link: {
              label: "Hora do Horror Hopi Hari 2026",
              url: "https://www.hopihari.com.br/hora-do-horror?data_selecionada=31/10/2026",
            },
          },
          {
            text: "",
            link: {
              label: "Pacotes e ingressos (Consulado do Turista)",
              url: "https://www.consuladodoturista.com.br/hora-do-horror-hopi-hari-2026",
            },
          },
        ],
      },
    ],
  },
  {
    n: 5,
    weekday: "Domingo",
    date: "1 nov 2026",
    region: "Paulista",
    blocks: [
      {
        period: "Manhã",
        items: [
          { time: "9:30–10:30", text: "Feirinha da Liberdade", friends: true },
          { time: "11:00–12:00", text: "IMS (Instituto Moreira Salles)" },
        ],
      },
      {
        period: "Tarde",
        items: [
          { time: "11:00–12:00", text: "Museus da Paulista — MASP + Japan House + Itaú Cultural" },
          { text: "Almoço no Cidade Matarazzo" },
          { text: "Museus da Paulista — MASP + Japan House + Itaú Cultural" },
        ],
      },
      {
        period: "Noite",
        items: [{  time: "18:00–9:30", text: "Barra Funda", friends: true }],
      },
    ],
  },
  {
    n: 6,
    weekday: "Segunda-feira · Feriado (Finados)",
    date: "2 nov 2026",
    region: "Santa Cecília",
    blocks: [
      {
        period: "Dia",
        items: [
          {
            time: "11:00–16:00",
            text: "Tattoo Amor",
          },
        ],
      },
      {
        period: "Noite",
        items: [{ time: "19:00/20:00", text: "Jantar", friends: true }],
      },
    ],
  },
  {
    n: 7,
    weekday: "Terça-feira",
    date: "3 nov 2026",
    region: "Ipiranga · Centro",
    blocks: [
      {
        period: "Manhã",
        items: [{ text: "Café da manhã — a decidir, perto de “casa”" }],
      },
      {
        period: "10h–14h · Ipiranga",
        items: [
          { text: "Museu de Zoologia (dinossauros! 🦕)" },
          { text: "Museu do Ipiranga" },
          { text: "Monumento da Independência" },
          { text: "Palacete Rosa" },
          { text: "Sesc Ipiranga" },
          { text: "Almoço no Ipiranga?" },
        ],
      },
      {
        period: "15h–18h · Centro",
        items: [
          {
            text: "Museu da Língua Portuguesa",
            note: "Fecha mais cedo (16h30) — ir primeiro. Terça = entrada gratuita!",
          },
          { text: "Farol Santander (até 20h)" },
          { text: "CAIXA Cultural (até 18h)" },
        ],
      },
      {
        period: "Noite",
        items: [
          {
            text: "Jantar — KURAMOON // MOMO",
            friends: true,
            note: "Local a decidir",
          },
        ],
      },
    ],
  },
  {
    n: 8,
    weekday: "Quarta-feira",
    date: "4 nov 2026",
    region: "Volta pra casa",
    blocks: [
      {
        period: "Dia",
        items: [{ text: "Almoço de despedida", friends: true }],
      },
      {
        period: "Tarde",
        items: [
          { time: "16:55", text: "Saída de São Paulo ✈️" },
          { time: "18:10", text: "Chegada em Florianópolis 🏡" },
        ],
      },
    ],
  },
];


/** Ideias de restaurantes para as refeições ainda em aberto. */
export const foodIdeas: { title: string; context: string; ideas: string[] }[] = [
  {
    title: "Liberdade",
    context: "Você citou “ou outro lugar que acharmos maneiro”",
    ideas: [
      "Rodízio de comida japonesa na Rua Galvão Bueno (o coração da Liberdade)",
      "Udon, soba ou curry em restaurante de rua na Liberdade — rápido antes do checkout",
      "Se passar pelo Centro: Bar do Estadão, lanche de pastrami icônico",
    ],
  },
  {
    title: "Centro",
    context: "Manhã no Centro, nada definido pra comer",
    ideas: [
      "Mercado Municipal (Mercadão) — sanduíche de mortadela, clássico turístico",
      "Bar da Dona Onça, no térreo do Copan — comida de boteco premiada, já tá no roteiro da manhã",
      "Galeria do Rock tem lanchonetes rápidas se quiser economizar tempo",
    ],
  },
  {
    title: "Dia 6 · Jantar com a irmã (Santa Cecília)",
    context: "Ainda depende da confirmação dela",
    ideas: [
      "Perguntar pra ela o que rola perto dela 🙂",
      "Região da Lapa/Barra Funda tem cantinas italianas e bares tradicionais",
      "Se quiserem ir pro Bixiga: a Rua 13 de Maio concentra cantinas clássicas",
    ],
  },
  {
    title: "Dia 7 · Café da manhã + almoço (Ipiranga)",
    context: "Café “perto de casa” e almoço no Ipiranga estão em aberto",
    ideas: [
      "Café: qualquer padaria de bairro próxima ao Airbnb — deixar pra decidir na hora",
      "Almoço: cantinas e botecos na Rua Bom Pastor e arredores do museu",
      "Opção prática: o próprio Sesc Ipiranga tem restaurante por quilo",
    ],
  },
  {
    title: "Dia 7 · Jantar — KURAMOON ou MOMO?",
    context: "As duas opções estavam listadas com “local a decidir”",
    ideas: [
      "Escolher uma das duas e reservar com antecedência (terça costuma ser tranquila)",
      "Critério pra decidir: distância do rolê da Língua Portuguesa/Farol Santander",
      "Lembrando que terça é dia de museu grátis — o dia promete!",
    ],
  },
  {
    title: "Dia 8 · Almoço de despedida",
    context: "Voo sai 16h55 de Guarulhos",
    ideas: [
      "Almoçar perto do Airbnb sem correria — sair pra GRU pelo menos 2h antes do voo",
      "Guarulhos fica longe: evitar almoço do outro lado da cidade",
      "Se sobrar tempo no aeroporto: GRU tem praça de alimentação decente nos terminais",
    ],
  },
];
