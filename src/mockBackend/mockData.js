// mockData.js
const { v4: uuidv4 } = require('uuid');

// Usuários
const users = [
  {
    id: "1",
    email: "admin@oneway.com",
    name: "Administrador",
    role: "admin",
    password: "admin123",
  },
  {
    id: "2",
    email: "editor@oneway.com",
    name: "Editor",
    role: "editor",
    password: "editor123",
  },
];

// Devocionais
const devocionais = [
  {
    id: "1",
    date: "2025-05-18",
    title: "Confiança em Tempos Difíceis",
    verse: "Salmos 46:1",
    verseText:
      "Deus é o nosso refúgio e fortaleza, socorro bem presente na angústia.",
    content:
      "Nos momentos de dificuldade, é importante lembrar que Deus está sempre presente...",
    prayer:
      "Senhor, ajuda-me a confiar em Ti mesmo quando tudo parece incerto...",
    application:
      "Hoje, identifique uma área de preocupação em sua vida e entregue-a conscientemente a Deus.",
    authorId: "1",
  },
  {
    id: "2",
    date: "2025-05-19",
    title: "Andando pela Fé",
    verse: "2 Coríntios 5:7",
    verseText: "Porque andamos por fé, e não pelo que vemos.",
    content:
      "A vida cristã é uma jornada de fé. Frequentemente somos chamados a dar passos sem ver o caminho completo...",
    prayer:
      "Pai, fortalece minha fé para confiar em Teus caminhos mesmo quando não posso ver aonde estou indo...",
    application:
      "Reflita sobre uma decisão recente onde você teve que confiar em Deus sem ter todas as respostas.",
    authorId: "2",
  },
  {
    id: "3",
    date: "2025-05-20",
    title: "O Poder da Palavra",
    verse: "Hebreus 4:12",
    verseText: "Porque a palavra de Deus é viva, e eficaz...",
    content: "A Bíblia não é apenas um livro comum, mas a Palavra viva de Deus...",
    prayer: "Senhor, que Tua Palavra tome raiz profunda em meu coração...",
    application: "Separe um momento hoje para meditar em uma passagem bíblica.",
    authorId: "1",
  },
];

// Artigos
const artigos = [
  {
    id: "1",
    title: "Entendendo a Graça de Deus",
    author: "Pr. João Silva",
    date: "2025-05-10",
    summary:
      "Um estudo profundo sobre a graça imerecida de Deus e como ela transforma nossas vidas.",
    content: "A graça de Deus é um conceito fundamental no cristianismo...",
    imageUrl: "/placeholder.svg",
    tags: ["graça", "salvação", "cristianismo"],
  },
  {
    id: "2",
    title: "Vivendo em Comunidade",
    author: "Dra. Maria Santos",
    date: "2025-05-12",
    summary:
      "Como a vida em comunidade reflete o plano de Deus para a Igreja.",
    content:
      "Desde o princípio, Deus planejou que vivêssemos em comunidade...",
    imageUrl: "/placeholder.svg",
    tags: ["igreja", "comunidade", "relacionamentos"],
  },
  {
    id: "3",
    title: "O Significado do Batismo",
    author: "Pr. Carlos Oliveira",
    date: "2025-05-15",
    summary: "Uma explicação bíblica sobre o significado e importância do batismo na vida cristã.",
    content: "O batismo é um dos sacramentos mais importantes da fé cristã...",
    imageUrl: "/placeholder.svg",
    tags: ["batismo", "sacramentos", "fé"],
  },
];

// Eventos
const eventos = [
  {
    id: "1",
    title: "Conferência de Jovens 2025",
    date: "2025-07-15",
    time: "19:00",
    location: "Centro de Eventos Principal",
    description:
      "Uma noite de adoração e mensagem para jovens de toda a cidade.",
    imageUrl: "/placeholder.svg",
    registerLink: "https://exemplo.com/registro",
  },
  {
    id: "2",
    title: "Retiro de Famílias",
    date: "2025-08-10",
    time: "08:00",
    location: "Sítio Recanto da Paz",
    description:
      "Um final de semana para fortalecer laços familiares com base nos princípios cristãos.",
    imageUrl: "/placeholder.svg",
    registerLink: "https://exemplo.com/retiro",
  },
  {
    id: "3",
    title: "Culto de Celebração",
    date: "2025-05-25",
    time: "10:00",
    location: "Templo Principal",
    description: "Culto especial de celebração e gratidão pelos 20 anos da igreja.",
    imageUrl: "/placeholder.svg",
    registerLink: "https://exemplo.com/culto-celebracao",
  },
];

// Orações
const oracoes = [
  {
    id: "1",
    title: "Oração pela Família",
    author: "Pastor José",
    description: "Um guia para orar pelos familiares e pelo fortalecimento do lar",
    content: "Senhor, te agradecemos pelas famílias e pedimos que abençoes cada lar...",
    imageUrl: "/placeholder.svg",
    category: "Oração",
    date: "2025-05-15",
  },
  {
    id: "2",
    title: "Oração por Cura e Saúde",
    author: "Missionária Ana",
    description: "Orações específicas para momentos de enfermidade",
    content: "Deus de toda consolação, venho diante de ti para interceder pelos enfermos...",
    imageUrl: "/placeholder.svg",
    category: "Intercessão",
    date: "2025-05-17",
  },
  {
    id: "3",
    title: "Oração por Proteção",
    author: "Evangelista Pedro",
    description: "Oração por proteção divina contra todo mal",
    content: "Pai Celestial, agradecemos por Tua proteção e cuidado constantes...",
    imageUrl: "/placeholder.svg",
    category: "Proteção",
    date: "2025-05-19",
  }
];

// Mídias
const midias = [
  {
    id: "1",
    title: "Entendendo a Graça de Deus",
    description: "Uma explicação profunda sobre o conceito da graça divina",
    author: "Pr. Carlos Oliveira",
    type: "video",
    url: "https://exemplo.com/videos/graca",
    imageUrl: "https://images.unsplash.com/photo-1535016120720-40c646be5580",
    duration: "25:14",
    date: "2025-05-10",
  },
  {
    id: "2",
    title: "Diálogos de Fé",
    description: "Conversas profundas sobre questões teológicas",
    author: "Dr. Paulo Santos",
    type: "podcast",
    url: "https://exemplo.com/podcast/dialogos",
    imageUrl: "https://images.unsplash.com/photo-1590602847861-f357a9332bbc",
    duration: "45:21",
    date: "2025-05-12",
  },
  {
    id: "3",
    title: "Música para Adoração",
    description: "Coletânea de músicas para momentos de adoração pessoal",
    author: "Ministério de Louvor Vida",
    type: "outro",
    url: "https://exemplo.com/musicas/adoracao",
    imageUrl: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4",
    duration: "1:05:32",
    date: "2025-05-14",
  }
];

// Notícias
const noticias = [
  {
    id: "1",
    title: "Nova Tradução da Bíblia é Lançada",
    author: "Redação",
    date: "2025-05-18",
    content: "Uma nova tradução da Bíblia foi lançada hoje, com foco na linguagem contemporânea...",
    imageUrl: "/placeholder.svg",
    category: "Literatura",
    summary: "Tradução moderna traz linguagem mais acessível aos leitores contemporâneos."
  },
  {
    id: "2",
    title: "Conferência Reúne Líderes Cristãos",
    author: "Maria Silva",
    date: "2025-05-17",
    content: "Mais de 500 líderes cristãos se reuniram na conferência anual para discutir desafios...",
    imageUrl: "/placeholder.svg",
    category: "Eventos",
    summary: "Evento discutiu os principais desafios da igreja na atualidade."
  },
  {
    id: "3",
    title: "Projeto Missionário Alcança Nova Região",
    author: "João Santos",
    date: "2025-05-16",
    content: "O projeto missionário Luz do Mundo expandiu suas operações para uma nova região...",
    imageUrl: "/placeholder.svg",
    category: "Missões",
    summary: "Iniciativa leva ajuda humanitária e mensagem cristã a comunidades isoladas."
  }
];

// Estudos Bíblicos
const estudos = [
  {
    id: "1",
    title: "As Parábolas de Jesus",
    author: "Pr. Roberto Souza",
    date: "2025-05-15",
    content: "As parábolas eram o método preferido de ensino de Jesus. Através delas, Ele comunicava...",
    imageUrl: "/placeholder.svg",
    category: "Novo Testamento",
    references: "Mateus 13, Lucas 15",
    duration: "45 minutos",
    level: "Intermediário"
  },
  {
    id: "2",
    title: "Estudo do Livro de Romanos",
    author: "Dra. Cláudia Ferreira",
    date: "2025-05-12",
    content: "O livro de Romanos é considerado uma das mais profundas exposições teológicas do Novo Testamento...",
    imageUrl: "/placeholder.svg",
    category: "Epístolas Paulinas",
    references: "Romanos 1-16",
    duration: "60 minutos",
    level: "Avançado"
  },
  {
    id: "3",
    title: "Introdução aos Profetas Menores",
    author: "Dr. Marcos Almeida",
    date: "2025-05-10",
    content: "Os doze profetas menores são frequentemente negligenciados, mas contêm mensagens poderosas...",
    imageUrl: "/placeholder.svg",
    category: "Antigo Testamento",
    references: "Oséias, Joel, Amós, ...",
    duration: "50 minutos",
    level: "Intermediário"
  }
];

// Louvores
const louvores = [
  {
    id: "1",
    titulo: "Águas Profundas",
    artista: "Ministério Vida",
    album: "Caminhos de Luz",
    ano: "2021",
    categoria: "Adoração",
    letra: "Em águas profundas eu vou entrar\nOnde meus pés não podem alcançar...",
    audio: "https://exemplo.com/musicas/aguas-profundas.mp3",
    videoUrl: "https://exemplo.com/videos/aguas-profundas",
    imageUrl: "/placeholder.svg"
  },
  {
    id: "2",
    titulo: "Grande é o Senhor",
    artista: "Comunidade de Adoração",
    album: "Eterno Amor",
    ano: "2019",
    categoria: "Louvor",
    letra: "Grande é o Senhor e mui digno de louvor\nNa cidade do nosso Deus, seu santo monte...",
    audio: "https://exemplo.com/musicas/grande-senhor.mp3",
    videoUrl: "https://exemplo.com/videos/grande-senhor",
    imageUrl: "/placeholder.svg"
  },
  {
    id: "3",
    titulo: "Luz do Mundo",
    artista: "Grupo Adoração Viva",
    album: "Brilha em Mim",
    ano: "2020",
    categoria: "Adoração",
    letra: "Luz do mundo vieste à terra\nPara que todos pudessem ver...",
    audio: "https://exemplo.com/musicas/luz-mundo.mp3",
    videoUrl: "https://exemplo.com/videos/luz-mundo",
    imageUrl: "/placeholder.svg"
  },
  {
    id: "4",
    titulo: "Lugar Secreto",
    artista: "Gabriela Rocha",
    album: "Lugar Secreto",
    ano: "2018",
    categoria: "Contemporânea",
    letra: "Todo o meu ser, meu coração\nSe enche de paz, me traz restauração\nEu sou guardado em Ti...",
    audio: "https://exemplo.com/musicas/lugar-secreto.mp3",
    videoUrl: "https://exemplo.com/videos/lugar-secreto",
    imageUrl: "/placeholder.svg"
  },
  {
    id: "5",
    titulo: "Nada Além do Sangue",
    artista: "Fernandinho",
    album: "Galileu",
    ano: "2015",
    categoria: "Adoração",
    letra: "Teu sangue leva-me além\nA lugares celestiais\nTua cruz livrou-me da morte e da maldição...",
    audio: "https://exemplo.com/musicas/nada-alem.mp3",
    videoUrl: "https://exemplo.com/videos/nada-alem",
    imageUrl: "/placeholder.svg"
  },
  {
    id: "6",
    titulo: "A Ele a Glória",
    artista: "Diante do Trono",
    album: "Preciso de Ti",
    ano: "2001",
    categoria: "Congregacional",
    letra: "A Ele a glória, a Ele o louvor\nA Ele o domínio, Ele é o Senhor...",
    audio: "https://exemplo.com/musicas/a-ele-gloria.mp3",
    videoUrl: "https://exemplo.com/videos/a-ele-gloria",
    imageUrl: "/placeholder.svg"
  }
];

// Família
const familias = [
  {
    id: "1",
    title: "Criando Filhos na Era Digital",
    author: "Pr. Ricardo e Sandra Oliveira",
    date: "2025-05-18",
    content: "Um dos maiores desafios para pais cristãos hoje é orientar os filhos no uso da tecnologia...",
    imageUrl: "/placeholder.svg",
    category: "Educação",
    resources: ["Guia para pais", "Vídeo explicativo", "Estudo bíblico relacionado"]
  },
  {
    id: "2",
    title: "Fortalecendo o Casamento",
    author: "Casal Rodrigues",
    date: "2025-05-15",
    content: "O casamento foi instituído por Deus como um pacto sagrado. Para fortalecê-lo é preciso...",
    imageUrl: "/placeholder.svg",
    category: "Casamento",
    resources: ["Guia de estudos", "Devocionais para casais", "Áudios de palestras"]
  },
  {
    id: "3",
    title: "Comunicação Efetiva em Família",
    author: "Dra. Patrícia Santos",
    date: "2025-05-12",
    content: "A comunicação é a base para relacionamentos saudáveis em família. Aprenda técnicas...",
    imageUrl: "/placeholder.svg",
    category: "Relacionamentos",
    resources: ["Exercícios práticos", "Vídeo workshop", "Material de apoio"]
  }
];

// Missões
const missoes = [
  {
    id: "1",
    title: "Projeto Amazônia",
    leader: "Pr. Fernando Lima",
    location: "Comunidades ribeirinhas do Amazonas",
    startDate: "2025-01-15",
    endDate: "2025-12-31",
    description: "Levando assistência médica, educação e a mensagem do evangelho para comunidades isoladas da Amazônia.",
    imageUrl: "/placeholder.svg",
    needs: ["Medicamentos", "Material escolar", "Voluntários"],
    updates: [
      {
        date: "2025-05-10",
        content: "Alcançamos mais 3 comunidades este mês!"
      }
    ]
  },
  {
    id: "2",
    title: "Missão África",
    leader: "Missionária Juliana Costa",
    location: "Moçambique",
    startDate: "2025-03-01",
    endDate: "2025-09-30",
    description: "Construção de poços de água potável e alfabetização de crianças em áreas rurais de Moçambique.",
    imageUrl: "/placeholder.svg",
    needs: ["Recursos financeiros", "Materiais de construção", "Professores voluntários"],
    updates: [
      {
        date: "2025-05-12",
        content: "Primeiro poço concluído, beneficiando 200 famílias!"
      }
    ]
  },
  {
    id: "3",
    title: "Alcance Urbano",
    leader: "Equipe de Jovens Missionários",
    location: "Periferia de São Paulo",
    startDate: "2025-04-10",
    endDate: "2025-10-10",
    description: "Trabalho social e evangelístico em comunidades carentes da grande São Paulo.",
    imageUrl: "/placeholder.svg",
    needs: ["Alimentos", "Roupas", "Voluntários para atividades culturais"],
    updates: [
      {
        date: "2025-05-15",
        content: "Festival cultural alcançou 500 jovens no último fim de semana!"
      }
    ]
  }
];

// Juventude
const juventudes = [
  {
    id: "1",
    title: "Encontro de Jovens 2025",
    date: "2025-06-20",
    time: "19:00",
    location: "Auditório Principal",
    description: "Uma noite de louvor, mensagem e comunhão para jovens de 15 a 29 anos.",
    speaker: "Pr. Felipe Andrade",
    imageUrl: "/placeholder.svg",
    category: "Evento",
    registrationLink: "https://exemplo.com/registro-jovens"
  },
  {
    id: "2",
    title: "Identidade em Cristo",
    author: "Líder João Paulo",
    date: "2025-05-15",
    content: "Uma série de estudos sobre como formar uma identidade cristã sólida em meio às pressões sociais...",
    imageUrl: "/placeholder.svg",
    category: "Estudo",
    resources: ["Apostila", "Vídeos complementares", "Discussões em grupo"]
  },
  {
    id: "3",
    title: "Desafio Missionário Urbano",
    date: "2025-07-10",
    time: "08:00",
    location: "Centro da Cidade",
    description: "Um dia de ações sociais e evangelismo nas ruas da cidade, organizado pela juventude.",
    coordinator: "Equipe de Liderança Jovem",
    imageUrl: "/placeholder.svg",
    category: "Missões",
    registrationLink: "https://exemplo.com/desafio-urbano"
  }
];

// Liderança/Ministério
const liderancas = [
  {
    id: "1",
    title: "Formação de Líderes de Células",
    instructor: "Pr. Roberto Mendes",
    date: "2025-06-05",
    time: "19:30",
    location: "Sala de Treinamento",
    description: "Curso completo para formação e capacitação de novos líderes de células e grupos pequenos.",
    imageUrl: "/placeholder.svg",
    category: "Treinamento",
    duration: "8 semanas",
    materials: ["Manual do Líder", "Vídeos de capacitação", "Exercícios práticos"]
  },
  {
    id: "2",
    title: "Princípios de Liderança Servidora",
    author: "Dra. Cláudia Mendonça",
    date: "2025-05-12",
    content: "Um estudo aprofundado sobre os princípios bíblicos de liderança servidora exemplificada por Jesus...",
    imageUrl: "/placeholder.svg",
    category: "Estudo",
    references: "João 13, 1 Pedro 5:1-4, Filipenses 2:1-11",
    format: "E-book e videoaulas"
  },
  {
    id: "3",
    title: "Encontro de Pastores e Líderes",
    date: "2025-07-20",
    time: "09:00",
    location: "Hotel Central",
    description: "Evento anual para pastores e líderes ministeriais com workshops, palestras e momentos de comunhão.",
    speakers: ["Pr. Jorge Santos", "Dr. Marcos Almeida", "Pr. Alberto Costa"],
    imageUrl: "/placeholder.svg",
    category: "Conferência",
    registrationLink: "https://exemplo.com/encontro-lideres"
  }
];

// Comunidade
const comunidades = [
  {
    id: "1",
    title: "Ação Social no Bairro Esperança",
    date: "2025-06-15",
    time: "08:00",
    location: "Praça Central do Bairro Esperança",
    description: "Dia de serviços gratuitos para a comunidade: corte de cabelo, atendimento médico básico, orientação jurídica.",
    coordinator: "Ministério de Ação Social",
    imageUrl: "/placeholder.svg",
    category: "Ação Social",
    volunteers: 45,
    peopleReached: 350
  },
  {
    id: "2",
    title: "Projeto Educação para Todos",
    startDate: "2025-03-01",
    endDate: "2025-11-30",
    location: "Centro Comunitário",
    description: "Aulas de reforço escolar gratuitas para crianças e adolescentes em situação de vulnerabilidade.",
    coordinator: "Equipe Educação",
    imageUrl: "/placeholder.svg",
    category: "Educação",
    schedule: "Terças e quintas, 14h às 17h",
    studentsHelped: 120
  },
  {
    id: "3",
    title: "Grupo de Apoio às Famílias",
    date: "Encontros semanais",
    time: "19:00",
    location: "Sala de Reuniões",
    description: "Grupo de apoio para famílias que enfrentam desafios como dependência química, violência doméstica e outros problemas.",
    coordinator: "Equipe de Conselheiros",
    imageUrl: "/placeholder.svg",
    category: "Aconselhamento",
    testimonials: [
      {
        name: "Família Silva",
        content: "Este grupo mudou nossa dinâmica familiar completamente."
      }
    ]
  }
];

module.exports = {
  users,
  devocionais,
  artigos,
  eventos,
  oracoes,
  midias,
  noticias,
  estudos,
  louvores,
  familias,
  missoes,
  juventudes,
  liderancas,
  comunidades
};
