
// mockData.ts
import { User, Devocional, Artigo, Evento, Oracao, Midia, Louvor, Estudo, Noticia, Familia, Missao, Juventude, Lideranca, Comunidade } from "./types";

const users: User[] = [
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

const devocionais: Devocional[] = [
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

const artigos: Artigo[] = [
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
    title: "O Desafio do Discipulado",
    author: "Paulo Oliveira",
    date: "2025-05-15",
    summary: "Explorando o chamado de Jesus para fazer discípulos em todas as nações.",
    content: "O discipulado é mais do que transmitir informações, é um estilo de vida...",
    imageUrl: "/placeholder.svg",
    tags: ["discipulado", "missões", "igreja"],
  },
];

const eventos: Evento[] = [
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
    title: "Culto de Ação de Graças",
    date: "2025-06-20",
    time: "19:30",
    location: "Igreja Central",
    description: "Um momento especial para agradecer a Deus por todas as bênçãos.",
    imageUrl: "/placeholder.svg",
    registerLink: "https://exemplo.com/acao-gracas",
  },
];

const oracoes: Oracao[] = [
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
    title: "Oração por Sabedoria",
    author: "Dr. Paulo Martins",
    description: "Como buscar a sabedoria divina para decisões importantes",
    content: "Pai celestial, tua palavra diz que devemos buscar a sabedoria...",
    imageUrl: "/placeholder.svg",
    category: "Oração",
    date: "2025-05-19",
  }
];

const midias: Midia[] = [
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

const louvores: Louvor[] = [
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
  }
];

const estudos: Estudo[] = [
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
    level: "intermediario",
    description: "Um estudo sobre os métodos de ensino de Jesus e suas parábolas"
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
    level: "avancado",
    description: "Uma análise aprofundada da teologia paulina em Romanos"
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
    level: "intermediario",
    description: "Descobrindo as mensagens relevantes dos profetas menores"
  }
];

const noticias: Noticia[] = [
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

const familias: Familia[] = [
  {
    id: "1",
    title: "Princípios Bíblicos para o Casamento",
    description: "Como construir um relacionamento conjugal saudável baseado na Palavra de Deus",
    content: "O casamento, como instituição divina, foi projetado para refletir o relacionamento de Cristo com a Igreja...",
    author: "Pr. Carlos e Ana Rodrigues",
    date: "2025-05-12",
    category: "Casamento",
    imageUrl: "/placeholder.svg"
  },
  {
    id: "2",
    title: "Educação de Filhos com Propósito",
    description: "Estratégias para criar filhos com valores cristãos em um mundo secular",
    content: "A educação dos filhos é uma das mais importantes responsabilidades que Deus confia aos pais...",
    author: "Dra. Patrícia Mendes",
    date: "2025-05-15",
    category: "Filhos",
    imageUrl: "/placeholder.svg"
  },
  {
    id: "3",
    title: "Finanças Familiares à Luz da Bíblia",
    description: "Princípios bíblicos para administração financeira no lar",
    content: "A Bíblia contém mais de 2.000 versículos sobre dinheiro e posses, mostrando a importância deste tema...",
    author: "Economista João Paulo Silva",
    date: "2025-05-18",
    category: "Finanças",
    imageUrl: "/placeholder.svg"
  }
];

const missoes: Missao[] = [
  {
    id: "1",
    title: "Projeto Água Viva",
    description: "Construção de poços artesianos em regiões carentes da África",
    location: "Moçambique",
    startDate: "2025-06-10",
    endDate: "2025-08-15",
    status: "Em preparação",
    leader: "Pr. Marcos Oliveira",
    imageUrl: "/placeholder.svg"
  },
  {
    id: "2",
    title: "Missão Esperança",
    description: "Assistência médica e evangelização em comunidades ribeirinhas",
    location: "Amazonas, Brasil",
    startDate: "2025-07-05",
    endDate: "2025-07-20",
    status: "Inscrições abertas",
    leader: "Dra. Cláudia Mendes",
    imageUrl: "/placeholder.svg"
  },
  {
    id: "3",
    title: "Luz nas Nações",
    description: "Treinamento de líderes locais e plantação de igrejas",
    location: "Índia",
    startDate: "2025-09-01",
    endDate: "2025-10-15",
    status: "Planejamento",
    leader: "Pr. Paulo e Sara Rodrigues",
    imageUrl: "/placeholder.svg"
  }
];

const juventudes: Juventude[] = [
  {
    id: "1",
    title: "Acampamento Impacto",
    description: "Três dias de imersão espiritual para jovens de 15 a 25 anos",
    date: "2025-07-10",
    location: "Acampamento Vida Nova",
    leader: "Pr. Lucas Santos",
    type: "Acampamento",
    imageUrl: "/placeholder.svg"
  },
  {
    id: "2",
    title: "Jovens em Adoração",
    description: "Noite de louvor e comunhão para a juventude",
    date: "2025-06-15",
    location: "Igreja Central",
    leader: "Ministério de Jovens",
    type: "Evento",
    imageUrl: "/placeholder.svg"
  },
  {
    id: "3",
    title: "Discipulado Radical",
    description: "Curso de 8 semanas sobre discipulado e missão para jovens",
    date: "2025-06-01",
    location: "Sala de Estudos da Igreja",
    leader: "Pedro Oliveira",
    type: "Curso",
    imageUrl: "/placeholder.svg"
  }
];

const liderancas: Lideranca[] = [
  {
    id: "1",
    name: "Pr. Roberto Almeida",
    role: "Pastor Titular",
    bio: "Formado em Teologia, serve como pastor há mais de 20 anos...",
    imageUrl: "/placeholder.svg",
    email: "pr.roberto@igreja.org",
    phone: "(11) 98765-4321",
    department: "Pastoral"
  },
  {
    id: "2",
    name: "Ana Cristina Santos",
    role: "Coordenadora de Missões",
    bio: "Com vasta experiência em campos missionários, coordena projetos nacionais e internacionais...",
    imageUrl: "/placeholder.svg",
    email: "ana.missoes@igreja.org",
    phone: "(11) 91234-5678",
    department: "Missões"
  },
  {
    id: "3",
    name: "João Paulo Silva",
    role: "Líder de Jovens",
    bio: "Trabalha com juventude há 10 anos, formado em pedagogia...",
    imageUrl: "/placeholder.svg",
    email: "joao.jovens@igreja.org",
    phone: "(11) 99876-5432",
    department: "Juventude"
  }
];

const comunidades: Comunidade[] = [
  {
    id: "1",
    title: "Célula Vida Nova",
    description: "Grupo familiar que se reúne para estudar a Bíblia e compartilhar experiências",
    leader: "Carlos e Maria Silva",
    meetingDay: "Quarta-feira",
    meetingTime: "20:00",
    location: "Zona Norte",
    imageUrl: "/placeholder.svg",
    members: 15
  },
  {
    id: "2",
    title: "Grupo Esperança",
    description: "Pequeno grupo voltado para casais jovens",
    leader: "Paulo e Juliana Santos",
    meetingDay: "Sexta-feira",
    meetingTime: "19:30",
    location: "Zona Sul",
    imageUrl: "/placeholder.svg",
    members: 12
  },
  {
    id: "3",
    title: "Célula Universitários",
    description: "Grupo de estudantes universitários que buscam crescer na fé",
    leader: "Lucas Oliveira",
    meetingDay: "Quinta-feira",
    meetingTime: "18:30",
    location: "Próximo à Universidade",
    imageUrl: "/placeholder.svg",
    members: 20
  }
];

export { users, devocionais, artigos, eventos, oracoes, midias, louvores, estudos, noticias, familias, missoes, juventudes, liderancas, comunidades };
