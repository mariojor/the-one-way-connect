
// Mock data para simular banco de dados

// Usuários (administradores do sistema)
const users = [
  {
    id: "1",
    email: "admin@oneway.com",
    name: "Administrador",
    role: "admin", 
    password: "admin123" // Em um sistema real, nunca armazenaria senhas em texto claro
  },
  {
    id: "2",
    email: "editor@oneway.com",
    name: "Editor",
    role: "editor",
    password: "editor123"
  }
];

// Devocionais diários
const devocionais = [
  {
    id: "1",
    date: "2025-05-18",
    title: "Confiança em Tempos Difíceis",
    verse: "Salmos 46:1",
    verseText: "Deus é o nosso refúgio e fortaleza, socorro bem presente na angústia.",
    content: "Nos momentos de dificuldade, é importante lembrar que Deus está sempre presente...",
    prayer: "Senhor, ajuda-me a confiar em Ti mesmo quando tudo parece incerto...",
    application: "Hoje, identifique uma área de preocupação em sua vida e entregue-a conscientemente a Deus.",
    authorId: "1"
  },
  {
    id: "2",
    date: "2025-05-19",
    title: "Andando pela Fé",
    verse: "2 Coríntios 5:7",
    verseText: "Porque andamos por fé, e não pelo que vemos.",
    content: "A vida cristã é uma jornada de fé. Frequentemente somos chamados a dar passos sem ver o caminho completo...",
    prayer: "Pai, fortalece minha fé para confiar em Teus caminhos mesmo quando não posso ver aonde estou indo...",
    application: "Reflita sobre uma decisão recente onde você teve que confiar em Deus sem ter todas as respostas.",
    authorId: "2"
  }
];

// Artigos
const artigos = [
  {
    id: "1",
    title: "Entendendo a Graça de Deus",
    author: "Pr. João Silva",
    date: "2025-05-10",
    summary: "Um estudo profundo sobre a graça imerecida de Deus e como ela transforma nossas vidas.",
    content: "A graça de Deus é um conceito fundamental no cristianismo...",
    imageUrl: "/placeholder.svg",
    tags: ["graça", "salvação", "cristianismo"]
  },
  {
    id: "2",
    title: "Vivendo em Comunidade",
    author: "Dra. Maria Santos",
    date: "2025-05-12",
    summary: "Como a vida em comunidade reflete o plano de Deus para a Igreja.",
    content: "Desde o princípio, Deus planejou que vivêssemos em comunidade...",
    imageUrl: "/placeholder.svg",
    tags: ["igreja", "comunidade", "relacionamentos"]
  }
];

// Eventos
const eventos = [
  {
    id: "1",
    title: "Conferência de Jovens 2025",
    date: "2025-07-15",
    time: "19:00",
    location: "Centro de Eventos Principal",
    description: "Uma noite de adoração e mensagem para jovens de toda a cidade.",
    imageUrl: "/placeholder.svg",
    registerLink: "https://exemplo.com/registro"
  },
  {
    id: "2",
    title: "Retiro de Famílias",
    date: "2025-08-10",
    time: "08:00",
    location: "Sítio Recanto da Paz",
    description: "Um final de semana para fortalecer laços familiares com base nos princípios cristãos.",
    imageUrl: "/placeholder.svg",
    registerLink: "https://exemplo.com/retiro"
  }
];

module.exports = {
  users,
  devocionais,
  artigos,
  eventos
};
