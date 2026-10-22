export type Status = "confirmed" | "transition" | "rotative";

export interface Exhibition {
  title: string;
  until?: string;
  note?: string;
  lastDays?: boolean;
}

export interface Venue {
  id: string;
  name: string;
  area: string;
  mapQuery: string;
  status: Status;
  tags: string[];
  free: boolean;
  hours: string;
  price: string;
  tip?: string;
  exhibitions: Exhibition[];
}

const maps = (q: string) =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(q)}`;

export const venues: Venue[] = [
  {
    id: "mam",
    name: "MAM São Paulo",
    area: "Ibirapuera",
    mapQuery: maps("Museu de Arte Moderna de São Paulo"),
    status: "confirmed",
    tags: ["arte moderna", "contemporânea"],
    free: false,
    hours: "Ter–Dom, 10h–18h",
    price: "Pago (~R$ 40)",
    tip: "Reaberto em set/2026 após reforma — a mostra marca a retomada da sede no Parque Ibirapuera.",
    exhibitions: [
      {
        title: "39º Panorama da Arte Brasileira: Depois que tudo foi dito",
        until: "24 jan 2027",
        note: "Curadoria de Diane Lima, 33 artistas de 11 estados — reflexão sobre reparação racial e arte brasileira.",
      },
    ],
  },
  {
    id: "ipiranga",
    name: "Museu do Ipiranga (Museu Paulista USP)",
    area: "Ipiranga",
    mapQuery: maps("Museu do Ipiranga"),
    status: "confirmed",
    tags: ["história", "acervo"],
    free: false,
    hours: "Ter–Dom, 10h–17h",
    price: "A partir de R$ 30 · grátis às quartas e no 1º domingo do mês",
    tip: "QUA 28/10 é dia de entrada gratuita no museu!",
    exhibitions: [
      {
        title: "Liberdade: bairro plural (temporária)",
        until: "31 jan 2027",
        note: "Entrada gratuita nesta mostra. Duas centenas de anos de histórias do bairro da Liberdade.",
      },
      {
        title: "11 exposições de longa duração",
        note: "Do Salão Nobre com 'Independência ou Morte!' ao ciclo curatorial (Coletar, Catalogar, Conservar, Comunicar).",
      },
    ],
  },
  {
    id: "lingua",
    name: "Museu da Língua Portuguesa",
    area: "Luz · Estação da Luz",
    mapQuery: maps("Museu da Língua Portuguesa"),
    status: "confirmed",
    tags: ["linguagem", "história"],
    free: false,
    hours: "Ter–Dom, 9h–16h30 (permanência até 18h)",
    price: "R$ 25 / meia R$ 12,50 · grátis às terças e domingos",
    tip: "TER 3/11 é terça-feira: entrada gratuita!",
    exhibitions: [
      {
        title: "Luz da Língua (temporária)",
        until: "8 nov 2026",
        note: "20 anos do museu — destaques do acervo e linha do tempo da instituição, com curadoria de Isa Grinspum Ferraz.",
      },
      {
        title: "Exposição principal (permanente)",
        note: "O português como língua viva e em transformação, na Estação da Luz.",
      },
    ],
  },
  {
    id: "macusp",
    name: "MAC USP",
    area: "Ibirapuera",
    mapQuery: maps("Museu de Arte Contemporânea da USP"),
    status: "confirmed",
    tags: ["arte contemporânea", "acervo"],
    free: true,
    hours: "Ter–Dom, 10h–21h",
    price: "Grátis",
    tip: "Fecha mais tarde da cidade (21h) — ótimo pra encerrar o dia.",
    exhibitions: [
      {
        title: "SOLO: artes de viver só, juntos",
        until: "28 mar 2027",
      },
      {
        title: "BEIJO DE LÍNGUA — Nelson Felix",
        until: "29 nov 2026",
      },
      {
        title: "TNEDIRTES — Sara Matos",
        until: "1 nov 2026",
        lastDays: true,
        note: "⚡ Encerra no domingo 1/11 — última chance.",
      },
      {
        title: "Di Cavalcanti: militante, boêmio, brasileiro",
        until: "1 nov 2026",
        lastDays: true,
        note: "⚡ 115 desenhos do acervo — encerra 1/11.",
      },
      {
        title: "Tempos Fraturados (longa duração)",
        note: "Acervo representativo nos 6º e 7º andares.",
      },
    ],
  },
  {
    id: "ccbb",
    name: "CCBB São Paulo",
    area: "Centro · Rua Álvares Penteado",
    mapQuery: maps("CCBB São Paulo"),
    status: "confirmed",
    tags: ["arte", "música", "cinema"],
    free: true,
    hours: "Todos os dias, 9h–20h (exceto terças)",
    price: "Grátis",
    tip: "SEG 2/11 (Finados) funciona — abre todos os dias menos terça.",
    exhibitions: [
      {
        title: "Marlene Barros: tecitura do feminino",
        until: "25 jan 2027",
      },
      {
        title: "Mostra Violas Brasileiras: da raiz ao contemporâneo",
        until: "31 out 2026",
        note: "Programação de música, 22–31/10.",
      },
      {
        title: "A Cinemateca é Brasileira — Edição Especial",
        until: "2 nov 2026",
        note: "Ciclo de cinema até domingo 1/11.",
      },
    ],
  },
  {
    id: "museufavelas",
    name: "Museu das Favelas",
    area: "Centro · Páteo do Colégio",
    mapQuery: maps("Museu das Favelas"),
    status: "confirmed",
    tags: ["música", "memória", "periferias"],
    free: true,
    hours: "Ter–Dom, 10h–17h",
    price: "Grátis",
    exhibitions: [
      {
        title: "Com Amor, Alcione (temporária)",
        until: "6 dez 2026",
        note: "Mais de 650 itens do acervo pessoal da Marrom pelos 50 anos de carreira — figurinos, prêmios, fotos e vídeos.",
      },
      {
        title: "Sobre Vivências (permanente)",
        note: "Imersão nas múltiplas dimensões da vida nas favelas brasileiras.",
      },
    ],
  },
  {
    id: "ims",
    name: "IMS Paulista",
    area: "Paulista · Av. Paulista, 2424",
    mapQuery: maps("IMS Paulista"),
    status: "confirmed",
    tags: ["fotografia"],
    free: true,
    hours: "Ter–Dom, 10h–20h",
    price: "Grátis",
    tip: "Tem mirante, café e biblioteca no edifício.",
    exhibitions: [
      {
        title: "Quanto mais desejo, mais invento o que vejo — Fernando Lemos",
        until: "7 fev 2027",
        note: "Centenário do artista luso-brasileiro: ~400 itens entre fotografia, desenho, pintura, design gráfico e poesia.",
      },
    ],
  },
  {
    id: "coreano",
    name: "Centro Cultural Coreano no Brasil",
    area: "Paulista · Av. Paulista, 460",
    mapQuery: maps("Centro Cultural Coreano no Brasil"),
    status: "confirmed",
    tags: ["música", "cultura coreana"],
    free: true,
    hours: "Ter–Sáb, 10h–18h30 · Dom, 11h–17h",
    price: "Grátis",
    tip: "Atividades especiais ligadas à mostra nos dias 28, 30 e 31/10.",
    exhibitions: [
      {
        title: "K-pop encontra a Música Tradicional Coreana",
        until: "8 nov 2026",
        note: "Instrumentos, história e elementos da música tradicional e do K-pop.",
      },
    ],
  },
  {
    id: "casabradesco",
    name: "Casa Bradesco · Cidade Matarazzo",
    area: "Bela Vista · Al. Rio Claro, 190",
    mapQuery: maps("Casa Bradesco"),
    status: "confirmed",
    tags: ["arte", "imersivo"],
    free: true,
    hours: "Ter–Sex, 12h–17h (exposição atual)",
    price: "Grátis",
    tip: "⚡ A mostra atual vai só até 30/10 — programa de novembro ainda não saiu.",
    exhibitions: [
      {
        title: "Corpo, Palavra e Memória — Simone Gomes",
        until: "30 out 2026",
        lastDays: true,
        note: "Sala Acima — exposição de 16 a 30/10, de terça a sexta.",
      },
    ],
  },
  {
    id: "tomie",
    name: "Instituto Tomie Ohtake",
    area: "Pinheiros · R. Coropés, 88",
    mapQuery: maps("Instituto Tomie Ohtake"),
    status: "transition",
    tags: ["arte contemporânea", "arquitetura"],
    free: true,
    hours: "Ter–Dom, 11h–19h",
    price: "Grátis (sede) · Casa-ateliê: R$ 50",
    tip: "⚠️ Em semana de troca de mostras na sede — confira o site antes.",
    exhibitions: [
      {
        title: "Sede: em transição",
        note: "Sheila Hicks e Tatiana Blass – Contrarregra encerram em 25/10. Em novembro abrem a grande homenagem aos 25 anos do Instituto dedicada a Tomie Ohtake e uma individual de Leiko Ikemura — datas de abertura ainda não publicadas.",
      },
      {
        title: "Casa-ateliê Tomie Ohtake (Campo Belo): Zanine Caldas – Criação de mundos",
        until: "7 nov 2026",
        note: "Endereço separado: Rua Antônio de Macedo Soares, 1800 · Qui–Dom, 10h–17h · ingresso R$ 50.",
      },
    ],
  },
  {
    id: "casadogrito",
    name: "Casa do Grito · Museu da Cidade de SP",
    area: "Ipiranga · Parque da Independência",
    mapQuery: maps("Casa do Grito"),
    status: "confirmed",
    tags: ["história", "patrimônio"],
    free: true,
    hours: "Ter–Dom, 9h–17h",
    price: "Grátis",
    tip: "Fica dentro do Parque da Independência, ao lado do Museu do Ipiranga — dá pra fazer os dois juntos.",
    exhibitions: [
      {
        title: "Da Independência ao Grito: histórias de uma casa de pau-a-pique",
        note: "Mostra de longa duração com os resultados das pesquisas arqueológicas no imóvel desde 1980.",
      },
    ],
  },
  {
    id: "caixa",
    name: "CAIXA Cultural São Paulo",
    area: "Centro · Praça da Sé, 111",
    mapQuery: maps("CAIXA Cultural São Paulo"),
    status: "transition",
    tags: ["arte", "gráfica"],
    free: true,
    hours: "Ter–Dom, 9h–18h",
    price: "Grátis",
    tip: "⚠️ Rembrandt – O Mestre da Luz e da Sombra encerrou em 25/10; a próxima mostra ainda não tinha data publicada. O Museu da CAIXA (6º andar) segue visitável.",
    exhibitions: [
      {
        title: "Nova exposição a ser anunciada",
        note: "Montagem da próxima mostra em andamento — confirme no site/Instagram @caixaculturalsp.",
      },
      {
        title: "Museu da CAIXA (permanente)",
        note: "Ambientes preservados dos anos 1930 no Edifício Sé, com acervo histórico.",
      },
    ],
  },
  {
    id: "fiesp",
    name: "Centro Cultural Fiesp",
    area: "Paulista · Av. Paulista, 1313",
    mapQuery: maps("Centro Cultural Fiesp"),
    status: "transition",
    tags: ["arte", "tecnologia"],
    free: true,
    hours: "Ter–Dom, 10h–20h",
    price: "Grátis",
    tip: "⚠️ FILE 2026 encerrou em 11/10 e a nova exposição da galeria ainda não estava confirmada; LiteraTUDO no Café estreia só em 8/11.",
    exhibitions: [
      {
        title: "Programação em atualização",
        note: "Verifique a agenda em sesisp.org.br antes de ir.",
      },
    ],
  },
  {
    id: "sescpaulista",
    name: "Sesc Avenida Paulista",
    area: "Paulista · Av. Paulista, 1578",
    mapQuery: maps("Sesc Avenida Paulista"),
    status: "rotative",
    tags: ["arte", "oficinas"],
    free: true,
    hours: "Ter–Dom, consultar programação",
    price: "Geralmente grátis",
    tip: "Exposições rotativas no 2º andar — confira a programação da semana em sescsp.org.br.",
    exhibitions: [
      {
        title: "Exposição da temporada",
        note: "A unidade mantém mostras e oficinas constantes; o título exato entre 28/10 e 3/11 não estava confirmado nas fontes consultadas.",
      },
    ],
  },
  {
    id: "sescipiranga",
    name: "Sesc Ipiranga",
    area: "Ipiranga · Rua Bom Pastor",
    mapQuery: maps("Sesc Ipiranga"),
    status: "rotative",
    tags: ["arte", "cultura popular"],
    free: true,
    hours: "Consultar programação",
    price: "Geralmente grátis",
    tip: "Última exposição divulgada: Letras & Filetes — Memória Afetiva e Latinidades; confirme o que estará em cartaz.",
    exhibitions: [
      {
        title: "Programação rotativa",
        note: "Verifique em sescsp.org.br.",
      },
    ],
  },
  {
    id: "planetario",
    name: "Planetário do Ibirapuera Aristóteles Orsini",
    area: "Ibirapuera",
    mapQuery: maps("Planetário do Ibirapuera"),
    status: "rotative",
    tags: ["ciência", "família"],
    free: false,
    hours: "Sessões conforme agenda (qua–seg)",
    price: "Sessões pagas; há sessões gratuitas em datas especiais",
    tip: "Sessões da cúpula como 'Olhar o céu de São Paulo outra vez' e 'Planetas do Universo' — veja a agenda da semana.",
    exhibitions: [
      {
        title: "Sessões de cúpula",
        note: "Programação semanal no site da Prefeitura/ibirapuera.org.",
      },
    ],
  },
  {
    id: "cinemateca",
    name: "Cinemateca Brasileira",
    area: "Vila Clementino · Largo Sen. Raul Cardoso",
    mapQuery: maps("Cinemateca Brasileira"),
    status: "rotative",
    tags: ["cinema"],
    free: false,
    hours: "Conforme programação diária",
    price: "Ingresso por sessão",
    tip: "Mostras e sessões mudam toda semana — consulte a programação de 28/10 a 3/11 no site.",
    exhibitions: [
      {
        title: "Mostras e sessões",
        note: "Ciclo em cartaz na semana — verificar site oficial.",
      },
    ],
  },
  {
    id: "mzusp",
    name: "Museu de Zoologia da USP",
    area: "Ipiranga",
    mapQuery: maps("Museu de Zoologia da USP"),
    status: "rotative",
    tags: ["ciência", "biodiversidade", "família"],
    free: false,
    hours: "Ter–Dom, consultar site",
    price: "Ingresso simbólico",
    tip: "Exposição museológica permanente sobre a biodiversidade — confirme horários de funcionamento.",
    exhibitions: [
      {
        title: "Exposição permanente",
        note: "Acervo zoológico em exposição no edifício histórico.",
      },
    ],
  },
  {
    id: "monumento",
    name: "Monumento à Independência",
    area: "Ipiranga · Parque da Independência",
    mapQuery: maps("Monumento à Independência"),
    status: "confirmed",
    tags: ["história", "patrimônio"],
    free: true,
    hours: "Ter–Dom, 9h–16h30",
    price: "Grátis",
    tip: "Cripta com os restos de D. Pedro I e museu do monumento — combina com Ipiranga + Casa do Grito.",
    exhibitions: [
      {
        title: "Cripta Imperial e museu do monumento",
        note: "Visita à cúpula do monumento e exposição sobre a Independência.",
      },
    ],
  },
  {
    id: "masp",
    name: "MASP — Museu de Arte de São Paulo",
    area: "Paulista · Av. Paulista, 1578",
    mapQuery: maps("MASP Museu de Arte de São Paulo"),
    status: "confirmed",
    tags: ["arte", "acervo"],
    free: false,
    hours: "Ter–Dom, 10h–18h",
    price: "Pago (R$ 42 a R$ 85, ingresso único p/ todas as exposições)",
    tip: "Agendamento online obrigatório em masp.org.br/ingressos. 🆕 Rosa Elena Curruchich e a sala de vídeo de Edgar Calel estreiam 30/10 — durante a viagem!",
    exhibitions: [
      {
        title: "Histórias latino-americanas (coletiva)",
        until: "31 jan 2027",
        note: "Mostra-âncora de 2026 ocupando cinco andares do Edifício Pietro Maria Bardi — 187 obras de 20 países.",
      },
      {
        title: "SOL CALERO: CASA MARÍA LIONZA",
        note: "Individual da artista venezuelana, em cartaz desde jul/2026 no Edifício Pietro Maria Bardi.",
      },
      {
        title: "Rosa Elena Curruchich: crônicas de Comalapa",
        until: "4 abr 2027",
        note: "🆕 Abre 30/10 no Edifício Lina Bo Bardi — retrospectiva da pintora maia Kaqchikel, com mais de 80 obras.",
      },
      {
        title: "Sala de vídeo: Edgar Calel",
        until: "31 jan 2027",
        note: "🆕 Estreia 30/10 no 2º subsolo — poética ritual da cosmovisão maia-kaqchikel.",
      },
      {
        title: "Acervo em transformação (longa duração)",
        note: "Coleção histórica do MASP no cavalete de Lina Bo Bardi.",
      },
    ],
  },
  {
    id: "japanhouse",
    name: "Japan House São Paulo",
    area: "Paulista · Av. Paulista, 52",
    mapQuery: maps("Japan House São Paulo"),
    status: "confirmed",
    tags: ["cultura japonesa", "design", "família"],
    free: true,
    hours: "10h–19h",
    price: "Grátis",
    tip: "Prédio assinado por Kengo Kuma, com restaurante e loja no térreo — fica no início da Paulista; a estação Brigadeiro (L2-Verde) fica a uns 700 m, dá pra ir a pé pelo calçadão.",
    exhibitions: [
      {
        title: "Cerâmica em curso",
        until: "30 mai 2027",
        note: "História, técnicas e design da cerâmica japonesa — exposição inédita.",
      },
      {
        title: "Shiro: uma escala de nuances",
        note: "Mostra sobre o branco (shiro) no design e na cultura japonesa.",
      },
    ],
  },
  {
    id: "itaucultural",
    name: "Itaú Cultural",
    area: "Paulista · Av. Paulista, 149",
    mapQuery: maps("Itaú Cultural"),
    status: "confirmed",
    tags: ["arte", "história", "Brasiliana"],
    free: true,
    hours: "Ter–Sáb, 11h–20h · Dom/feriado, 11h–19h",
    price: "Grátis",
    tip: "Peça ANYWHERE no Teatro nos dias 30/10, 31/10 e 1/11 — ingressos gratuitos pela plataforma Inti, retirada às terças.",
    exhibitions: [
      {
        title: "Solange Pessoa: outras escalas — desenhos, filmes e instalação",
        until: "1 nov 2026",
        lastDays: true,
        note: "⚡ Encerra no domingo 1/11 — última chance. Curadoria de Franklin Pedroso.",
      },
      {
        title: "Ocupação Anísio Teixeira",
        until: "15 nov 2026",
        note: "Trajetória do educador (1900–1971) e sua atuação na educação pública brasileira.",
      },
      {
        title: "Espaço Milú Villela — Brasiliana (permanente, piso 7)",
        note: "185 obras de 154 artistas, de Tarsila a Hélio Oiticica.",
      },
      {
        title: "Espaço Herculano Pires — Arte no Dinheiro (permanente, piso 6)",
      },
      {
        title: "Espaço Olavo Setubal — Coleção Brasiliana Itaú (permanente)",
      },
    ],
  },
];

export const otherSpots = [
  "Theatro Municipal de SP — espetáculos e visitas guiadas (sem exposição fixa)",
  "Teatro Renault — musicais (sem exposição)",
  "Sala São Paulo — concertos da OSESP (sem exposição)",
  "Palacete Rosa / Palácio dos Cedros — espaços de eventos, agenda avulsa",
  "Cidade Matarazzo — complexo com a Casa Bradesco (ver acima)",
  "Parque Trianon — parque público, sem exposição",
];

export const statusLabel: Record<Status, string> = {
  confirmed: "Em cartaz",
  transition: "Em transição",
  rotative: "Programação rotativa",
};

export const statusColor: Record<Status, string> = {
  confirmed: "bg-emerald-100 text-emerald-800 border-emerald-200",
  transition: "bg-amber-100 text-amber-800 border-amber-200",
  rotative: "bg-sky-100 text-sky-800 border-sky-200",
};
