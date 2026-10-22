export interface Item {
  time?: string | string[];
  text: string;
  note?: string;
  friends?: boolean;
  link?: { label: string; url: string };
  /** Amigos confirmados no evento. */
  tags?: string[];
  /** Local pré-definido (busca no Google Maps). */
  loc?: string;
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
          { time: "9:30–10:00", text: "Deixar as malas no hotel (Urban L)", loc: "Hotel Urban L São Paulo" },
          { time: "10:00–13:00", text: "Museu da Imigração Japonesa", loc: "Museu Histórico da Imigração Japonesa São Paulo" },
        ],
      },
      {
        period: "Tarde",
        items: [
          { time: "13:00-14:00", text: "Almoço no Liberdade Side Street", friends: true, loc: "Liberdade Side Street São Paulo" },
          { time: "14:00-16:00", text: "Check-in no hotel — banho e descanso" },
          { time: "16:00-19:00", text: "Lojinhas: Daiso + Korean Mart + Sogo Plaza" },
        ],
      },
      {
        period: "Noite",
        items: [
          { time: "19:30-21:00", text: "Jantar na Liberdade — Shoo Loong Kan (fondue/hotpot)", friends: true, loc: "SHOOLOONGKAN São Paulo" },
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
          { time: "9:30–11:00", text: "Passeio pela Liberdade — Comix Book Shop", loc: "Comix Book Shop São Paulo" },
          { time: "12:00", text: "Checkout do hotel — Guardar as malas no maleiro" },
        ],
      },
      {
        period: "Tarde",
        items: [
          { time: "12:30", text: "Almoço — Liberdade Side Street ou outro lugar que acharmos maneiro", loc: "Liberdade Side Street São Paulo" },
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
          { time: "18:00", text: "Shopping — Shopping Cidade São Paulo", friends: true, loc: "Shopping Cidade São Paulo" },
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
          { time: "11:00", text: "Kodak Mafia", loc: "Kodak Mafia São Paulo" },
          { time: "12:00", text: "Almoço Galeria Metrópole",
            note: ""
           },
        ],
      },
      {
        period: "Tarde",
        items: [
          { time: "13:00", text: "Copan / Galeria do Rock / Kodak Mafia" },
          { text: "25 de Março — Galeria Pagé", loc: "Galeria Pagé São Paulo" }
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
            loc: "Taverna Medieval São Paulo",
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
          { time: "9:30–10:30", text: "Feirinha da Liberdade", friends: true, loc: "Feira de Arte da Liberdade São Paulo" },
          { time: "11:00–12:00", text: "IMS (Instituto Moreira Salles)", loc: "IMS Paulista" },
        ],
      },
      {
        period: "Tarde",
        items: [
          { time: "11:00–12:00", text: "Museus da Paulista — MASP + Japan House + Itaú Cultural" },
          { text: "Almoço no Cidade Matarazzo", loc: "Cidade Matarazzo São Paulo" },
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
          { text: "Museu de Zoologia (dinossauros! 🦕)", loc: "Museu de Zoologia USP São Paulo" },
          { text: "Museu do Ipiranga", loc: "Museu do Ipiranga São Paulo" },
          { text: "Monumento da Independência" },
          { text: "Palacete Rosa" },
          { text: "Sesc Ipiranga", loc: "Sesc Ipiranga São Paulo" },
          { text: "Almoço no Ipiranga?" },
        ],
      },
      {
        period: "15h–18h · Centro",
        items: [
          {
            text: "Museu da Língua Portuguesa",
            loc: "Museu da Língua Portuguesa São Paulo",
            note: "Fecha mais cedo (16h30) — ir primeiro. Terça = entrada gratuita!",
          },
          { text: "Farol Santander (até 20h)", loc: "Farol Santander São Paulo" },
          { text: "CAIXA Cultural (até 18h)", loc: "CAIXA Cultural São Paulo" },
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


export interface FoodPlace {
  name: string;
  desc: string;
  /** Busca aberta no Google Maps. */
  query: string;
}

/** Indicações de comida por bairro — lugares da lista salva no Maps. */
export const foodIdeas: { bairro: string; note?: string; places: FoodPlace[] }[] = [
  {
    bairro: "Liberdade",
    note: "Os que já estão no roteiro (Side Street, Shoo Loong Kan) ficaram com link direto nos cards acima.",
    places: [
      { name: "Temaki do Ailton", desc: "Sushi e temaki · ★ 4,7 na lista", query: "Temaki do Ailton São Paulo" },
      { name: "Hello Kitty and Friends 2D (Eat Asia)", desc: "Café temático · ★ 4,6", query: "Hello Kitty and Friends 2D by Eat Asia São Paulo" },
      { name: "Lulu Candy", desc: "Doces japoneses", query: "Lulu Candy Liberdade São Paulo" },
      { name: "Jardim Dourado", desc: "Restaurante chinês · ★ 3,9", query: "Jardim Dourado Liberdade São Paulo" },
      { name: "Jia He Chicken", desc: "Restaurante chinês · ★ 3,6", query: "Jia He Chicken Liberdade São Paulo" },
    ],
  },
  {
    bairro: "Centro · República",
    note: "Combina com os dias 3 e 7 (Centro).",
    places: [
      { name: "Infini Bar", desc: "Speakeasy no anexo do La Casserole · Largo do Arouche, 346", query: "Infini Bar São Paulo" },
      { name: "Mercadão", desc: "Sanduíche de mortadela, clássico turístico", query: "Mercado Municipal de São Paulo" },
      { name: "Bar da Dona Onça", desc: "Boteco premiado no térreo do Copan", query: "Bar da Dona Onça São Paulo" },
      { name: "Bar do Estadão", desc: "Lanche de pastrami icônico", query: "Bar do Estadão São Paulo" },
    ],
  },
  {
    bairro: "Cidade Matarazzo · Bela Vista",
    note: "Vale pro almoço do dia 5 — o dia já passa por lá.",
    places: [
      { name: "Lavva — Fogo e Carne", desc: "Korean barbecue do chef Paulo Shin · R. Itapeva, 569", query: "Lavva Fogo e Carne São Paulo" },
    ],
  },
  {
    bairro: "Paraíso · Vila Mariana",
    places: [
      { name: "D'Brescia Churrascaria", desc: "Rodízio clássico · ★ 4,4", query: "D'Brescia Churrascaria São Paulo" },
    ],
  },
  {
    bairro: "Ipiranga",
    note: "Café da manhã e almoço do dia 7.",
    places: [
      { name: "Cantinas e botecos da Rua Bom Pastor", desc: "Arredores do Museu do Ipiranga", query: "Rua Bom Pastor Ipiranga São Paulo restaurantes" },
      { name: "Restaurante do Sesc Ipiranga", desc: "Opção prática por quilo", query: "Sesc Ipiranga restaurante São Paulo" },
    ],
  },
  {
    bairro: "Santa Cecília · Lapa",
    note: "Pro jantar do dia 6 com a tua irmã — ainda depende da confirmação dela.",
    places: [
      { name: "Cantinas italianas da Lapa", desc: "Bairro tradicional de cantinas, colado em Santa Cecília", query: "cantinas italianas Lapa São Paulo" },
      { name: "Bixiga — Rua 13 de Maio", desc: "Cantinas clássicas italianas", query: "Rua 13 de Maio Bela Vista cantinas São Paulo" },
    ],
  },
  {
    bairro: "Tatuapé",
    note: "Só se o rolê levar pra lá.",
    places: [
      { name: "Cão Veio Tatuapé", desc: "Hamburgueria", query: "Cão Veio Tatuapé São Paulo" },
      { name: "Bario Bar", desc: "Bar", query: "Bario Bar Tatuapé São Paulo" },
    ],
  },
  {
    bairro: "Volta pra casa (dia 8)",
    note: "Voo sai 16h55 de Guarulhos: almoçar perto do Airbnb e sair pra GRU pelo menos 2h antes. Evitar almoço do outro lado da cidade.",
    places: [],
  },
];
