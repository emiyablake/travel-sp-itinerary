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
          { time: "8:00", text: "Chegada em São Paulo", note:"Aeroporto de Guarulhos" },
          { time: "8:00–9:30", text: "Deslocamento" },
          { time: "9:30–10:00", text: "Deixar as malas no hotel (Urban L)", loc: "Hotel Urban L São Paulo" },
          { time: "10:00–13:00", text: "Museu da Imigração Japonesa", loc: "Museu Histórico da Imigração Japonesa São Paulo" },
        ],
      },
      {
        period: "Tarde",
        items: [
          { time: "13:00-14:00", text: "Almoço no Liberdade Side Street", friends: true, loc: "Liberdade Side Street São Paulo" },
          { time: "14:00-16:00", text: "Check-in no hotel", note:"banho e descanso" },
          { time: "16:00-19:00", text: "Lojinhas da Liberdade",
            note: "Daiso,  Korean Mart,  Sogo Plaza"
           },
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
          { time: "9:30–11:00", text: "Passeio pela Liberdade", note:"Comix Book Shop", 
            loc: "Comix Book Shop São Paulo" },
          { time: "12:00", text: "Checkout do hotel", note: "Guardar as malas no maleiro" },
        ],
      },
      {
        period: "Tarde",
        items: [
          { time: "12:30", text: "Almoço", note: "Liberdade Side Street ou outro lugar que acharmos maneiro"},
          { time: "14:00", text: "Pegar as malas + Uber até o Airbnb" },
          {
            time: "15:00", text: "Check-in no Airbnb",
          },
          { time: "16:00-18:00", text: "Outlets em Pinheiros",
            note: "Converse, Vans, Rip Curl"
           },
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
            note: "Koufu (Loja 14), Sanduteca (Térreo, Loja 9), La Baguette (2º andar, Loja 26)"
           },
        ],
      },
      {
        period: "Tarde",
        items: [
          { time: "13:00", text: "Galeria do Rock" },
          { time: "14:30", text: "25 de Março" },
          { time: "16:00", text: "Galeria Pagé" }
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
          { time: "12:00–14:00", text: "MASP" },
          { time: "14:00–15:00", text: "Almoço no Cidade Matarazzo", loc: "Cidade Matarazzo São Paulo" },
          { time: "15:00–16:00", text: "Japan House" },
          { time: "16:00–17:00", text: "Itaú Cultural" },
        ],
      },
      {
        period: "Noite",
        items: [
          {  time: "19:00/20:00", text: "Barra Funda", note: "mamae bar, suei bar"}
        ],
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
          {time: "10:00", text: "café da manhã"},
          {time: "11:00–16:00", text: "Tattoo Amor"},
          {time: "16:00–19:00", text: "Livre/Descanso"},
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
        items: [{ time: "8:30", text: "Café da manhã", note:"a decidir, perto de “casa”" }],
      },
      {
        period: "10h–14h · Ipiranga",
        items: [
          { time: "10:00-11:30", text: "Museu de Zoologia (dinossauros! 🦕)", loc: "Museu de Zoologia USP São Paulo" },
          { time: "11:30-12:30", text: "Museu do Ipiranga", loc: "Museu do Ipiranga São Paulo" },
          { time: "12:30-13:30", text: "Sesc Ipiranga", loc: "Sesc Ipiranga São Paulo" },
          { time: "13:30-14:00", text: "Almoço" },
          { time: "14:10", text: "Palacete Rosa" },
          { time: "14:15", text: "Monumento da Independência" },
        ],
      },
      {
        period: "15h–18h · Centro",
        items: [
          {
            time: "15:00-16:00",
            text: "Museu da Língua Portuguesa",
            loc: "Museu da Língua Portuguesa São Paulo",
            note: "Fecha as 16h30 — ir primeiro. Terça = entrada gratuita!",
          },
          { 
            time: "16:00-17:00",
            text: "CAIXA Cultural (até 18h)", loc: "CAIXA Cultural São Paulo",
            note: "Fecha as 18h"
           },
          { 
            time: "17:00-18:00",
            text: "Farol Santander", loc: "Farol Santander São Paulo",
            note: "Fecha as 20h"
           },
        ],
      },
      {
        period: "Noite",
        items: [
          {
            time: "19:00/20:00",
            text: "Jantar",
            friends: true,
            note: "KURAMOON // MOMO",
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
        period: "Manhã",
        items: [
          { time: "9:00/9:30", text: "Café da manhã", friends: true },
          { time: "11:00", text: "Check-out", friends: true },
          { time: "12:00", text: "Almoço de despedida", note: "escolher local", friends: true }
        ],
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
    note: "",
    places: [
      { name: "Temaki do Ailton", desc: "Sushi e temaki · ★ 4,7 na lista", query: "Temaki do Ailton São Paulo" },
      { name: "Hello Kitty and Friends 2D (Eat Asia)", desc: "Café temático · ★ 4,6", query: "Hello Kitty and Friends 2D by Eat Asia São Paulo" },
      { name: "Lulu Candy", desc: "Doces japoneses", query: "Lulu Candy Liberdade São Paulo" },
      { name: "Jardim Dourado", desc: "Restaurante chinês · ★ 3,9", query: "Jardim Dourado Liberdade São Paulo" },
      { name: "Jia He Chicken", desc: "Restaurante chinês · ★ 3,6", query: "Jia He Chicken Liberdade São Paulo" },
      { name: "Kyoto", desc: "Café e restaurante · R. Thomaz Gonzaga, 45B", query: "Kyoto Café Rua Thomaz Gonzaga Liberdade São Paulo" },
      { name: "Bodogami", desc: "Restaurante e cafeteria de jogos · Av. da Liberdade, 456", query: "Bodogami Av. da Liberdade 456 São Paulo" },
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
      { name: "Sanduteca", desc: "Galeria Metrópole, térreo loja 9 · Av. São Luís, 187 — já tá anotada no almoço do dia 3", query: "Sanduteca Galeria Metrópole São Paulo" },
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
    bairro: "Pinheiros",
    note: "Combina com o dia 2 (outlets à tarde) ou com uma ida ao Airbnb.",
    places: [
      { name: "Fan Hour", desc: "Hamburgueria geek · R. Artur de Azevedo, 898", query: "Fan Hour Rua Artur de Azevedo 898 São Paulo" },
      { name: "Bodega Pepito", desc: "Petiscos · R. dos Pinheiros, 320", query: "Bodega Pepito Rua dos Pinheiros 320 São Paulo" },
      { name: "Izakaya Otoshi", desc: "Izakaya · R. Padre Carvalho, 335", query: "Izakaya Otoshi Rua Padre Carvalho 335 São Paulo" },
    ],
  },
  {
    bairro: "Consolação",
    places: [
      { name: "Bráz Elettrica", desc: "Pizzaria · R. Antônio Carlos, 328", query: "Bráz Elettrica Rua Antônio Carlos 328 São Paulo" },
    ],
  },
  {
    bairro: "Vila Buarque",
    places: [
      { name: "Holy Tavern", desc: "Bar · R. Dr. Cesário Mota Júnior, 531", query: "Holy Tavern Rua Dr. Cesário Mota Júnior 531 São Paulo" },
    ],
  },
  {
    bairro: "Moema",
    places: [
      { name: "Canton Moema", desc: "Restaurante chifa · Av. Juriti, 587", query: "Canton Moema Av. Juriti 587 São Paulo" },
    ],
  },
  {
    bairro: "Belenzinho",
    places: [
      { name: "Meizizi", desc: "Restaurante asiático · Rua Taquari, 934", query: "Meizizi Rua Taquari 934 São Paulo" },
    ],
  },
  {
    bairro: "Indianópolis",
    places: [
      { name: "Saiko Katsu Sando", desc: "Comida asiática · R. Normândia, 102", query: "Saiko Katsu Sando Rua Normândia 102 São Paulo" },
    ],
  },
  {
    bairro: "Itaim Bibi",
    places: [
      { name: "Marmotta", desc: "Restaurante italiano · R. Manuel Guedes, 281", query: "Marmotta Rua Manuel Guedes 281 São Paulo" },
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
    note: "",
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
