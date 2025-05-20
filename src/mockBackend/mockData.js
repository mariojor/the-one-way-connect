
// Dados para simulação do backend

// Usuários
const users = [
  { id: '1', name: 'Admin', email: 'admin@example.com', password: 'senha123', role: 'admin' },
  { id: '2', name: 'João Silva', email: 'joao@example.com', password: 'senha123', role: 'user' },
  { id: '3', name: 'Maria Santos', email: 'maria@example.com', password: 'senha123', role: 'user' }
];

// Devocionais
const devocionais = [
  {
    id: '1',
    date: '2025-05-20',
    title: 'A Paz de Deus',
    verse: 'Filipenses 4:7',
    verseText: 'E a paz de Deus, que excede todo o entendimento, guardará os vossos corações e os vossos pensamentos em Cristo Jesus.',
    content: 'Nos momentos de ansiedade e preocupação, a paz de Deus nos sustenta. Esta paz não é uma simples ausência de problemas, mas uma presença divina que acalma nossa alma mesmo em meio às tempestades da vida.',
    prayer: 'Senhor, pedimos que sua paz inunde nossos corações hoje. Ajude-nos a descansar em sua presença mesmo quando as circunstâncias ao nosso redor são caóticas.',
    application: 'Reserve momentos de silêncio hoje para experimentar a paz de Deus. Quando sentir ansiedade, respire fundo e lembre-se que Ele está no controle.',
    authorId: '1'
  },
  {
    id: '2',
    date: '2025-05-19',
    title: 'Fé para Avançar',
    verse: 'Hebreus 11:1',
    verseText: 'Ora, a fé é a certeza daquilo que esperamos e a prova das coisas que não vemos.',
    content: 'A fé nos permite enxergar além das circunstâncias. Através dela, podemos confiar no plano de Deus mesmo quando não vemos o caminho completo à nossa frente.',
    prayer: 'Deus, aumenta nossa fé. Ajuda-nos a confiar em Ti quando não entendemos o que está acontecendo em nossas vidas.',
    application: 'Identifique uma área da sua vida onde você precisa exercitar mais fé. Escreva uma declaração de confiança em Deus relacionada a esta área.',
    authorId: '1'
  }
];

// Artigos
const artigos = [
  {
    id: '1',
    title: 'O Poder da Gratidão na Vida Cristã',
    content: 'A gratidão transforma nossa perspectiva e nos aproxima de Deus. Quando praticamos o agradecimento diário, nossos olhos se abrem para as bênçãos que muitas vezes não percebemos...',
    author: 'Pr. Carlos Oliveira',
    imageUrl: 'https://images.unsplash.com/photo-1558611848-73f7eb4001a1?q=80&w=1000',
    date: '2025-04-15',
    category: 'Vida Cristã',
    tags: ['gratidão', 'espiritualidade', 'práticas cristãs']
  },
  {
    id: '2',
    title: 'Discipulado no Século 21',
    content: 'O que significa seguir a Jesus em um mundo digital e hiperconectado? Este artigo explora os desafios e oportunidades para o discipulado cristão nos dias atuais...',
    author: 'Dra. Ana Beatriz Lima',
    imageUrl: 'https://images.unsplash.com/photo-1507692049790-de58290a4334?q=80&w=1000',
    date: '2025-04-22',
    category: 'Discipulado',
    tags: ['missão', 'tecnologia', 'evangelismo']
  }
];

// Eventos
const eventos = [
  {
    id: '1',
    title: 'Conferência de Adoração',
    description: 'Uma noite especial de louvor e adoração com ministros de música de todo o país.',
    location: 'Igreja Central',
    date: '2025-06-15T19:00:00',
    endDate: '2025-06-15T22:00:00',
    imageUrl: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=1000',
    category: 'Louvor',
    isHighlighted: true
  },
  {
    id: '2',
    title: 'Retiro de Jovens',
    description: 'Um final de semana de comunhão, estudo da palavra e atividades para jovens de 15 a 25 anos.',
    location: 'Acampamento Águas Vivas',
    date: '2025-07-20T14:00:00',
    endDate: '2025-07-22T12:00:00',
    imageUrl: 'https://images.unsplash.com/photo-1506869640319-fe1a24fd76dc?q=80&w=1000',
    category: 'Juventude',
    isHighlighted: false
  }
];

// Orações
const oracoes = [
  {
    id: '1',
    title: 'Oração pela Família',
    author: 'Pr. Roberto Alves',
    description: 'Uma oração especial pela unidade e proteção das famílias',
    content: 'Pai celestial, nós te agradecemos pelo dom precioso da família. Pedimos que proteja cada lar representado aqui, traga cura para relacionamentos quebrados, restaure a comunicação onde há silêncio e ajude-nos a expressar amor uns aos outros como Cristo nos amou...',
    imageUrl: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=1000',
    category: 'Família',
    date: '2025-05-10T10:00:00'
  },
  {
    id: '2',
    title: 'Oração por Cura e Restauração',
    author: 'Dra. Luiza Mendes',
    description: 'Oração para tempos de enfermidade e recuperação',
    content: 'Senhor Jesus, Grande Médico, aproximamo-nos do trono da graça pedindo cura. Sabemos que tens poder sobre toda enfermidade e que por tuas feridas somos sarados. Ministra com teu toque divino àqueles que sofrem física, emocional ou espiritualmente...',
    imageUrl: 'https://images.unsplash.com/photo-1532413992378-f169ac26fff0?q=80&w=1000',
    category: 'Cura',
    date: '2025-05-12T10:00:00'
  }
];

// Mídias (Vídeos e Podcasts)
const midias = [
  {
    id: '1',
    title: 'A Parábola do Bom Samaritano',
    author: 'Pr. Ricardo Gondim',
    description: 'Uma análise profunda de como esta parábola se aplica aos dias atuais',
    url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    thumbnailUrl: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=1000',
    type: 'video',
    duration: '45:20',
    category: 'Estudos Bíblicos',
    date: '2025-04-25T14:30:00'
  },
  {
    id: '2',
    title: 'Navegando Crises com Fé',
    author: 'Dra. Cleide Santos',
    description: 'Podcast sobre como manter a fé em tempos difíceis',
    url: 'https://soundcloud.com/example/episode123',
    thumbnailUrl: 'https://images.unsplash.com/photo-1614680376573-df3480f0c6ff?q=80&w=1000',
    type: 'podcast',
    duration: '32:15',
    category: 'Vida Cristã',
    date: '2025-05-01T10:00:00'
  }
];

// Notícias Cristãs
const noticias = [
  {
    id: '1',
    title: 'Nova Tradução da Bíblia para Comunidades Indígenas',
    content: 'Um grupo de linguistas e missionários concluiu a tradução do Novo Testamento para a língua Wai Wai, beneficiando milhares de indígenas na Amazônia...',
    author: 'Equipe Editorial',
    imageUrl: 'https://images.unsplash.com/photo-1542601098-8fc114e148e2?q=80&w=1000',
    date: '2025-05-15T09:00:00',
    category: 'Missões',
    tags: ['Bíblia', 'Tradução', 'Povos Indígenas']
  },
  {
    id: '2',
    title: 'Igreja Mobiliza Ajuda para Vítimas de Enchentes',
    content: 'Igrejas de várias denominações uniram forças para fornecer alimentos, água e abrigo para famílias afetadas pelas recentes enchentes no sul do país...',
    author: 'João Martins',
    imageUrl: 'https://images.unsplash.com/photo-1574634534894-89d7576c8259?q=80&w=1000',
    date: '2025-05-18T11:30:00',
    category: 'Ação Social',
    tags: ['Solidariedade', 'Enchentes', 'Ajuda Humanitária']
  }
];

// Estudos Bíblicos
const estudos = [
  {
    id: '1',
    title: 'As Sete Igrejas do Apocalipse',
    author: 'Dr. Paulo Roberto',
    description: 'Um estudo detalhado sobre as mensagens às sete igrejas em Apocalipse 2-3',
    content: 'O livro de Apocalipse contém mensagens específicas de Jesus para sete igrejas da Ásia Menor. Cada uma dessas mensagens oferece insights valiosos para a igreja contemporânea...',
    imageUrl: 'https://images.unsplash.com/photo-1532003885409-ed84d334f6cc?q=80&w=1000',
    category: 'Apocalipse',
    date: '2025-03-10T14:00:00',
    references: ['Apocalipse 2:1-3:22', 'Efésios 5:25-27']
  },
  {
    id: '2',
    title: 'Os Frutos do Espírito',
    author: 'Dra. Marta Almeida',
    description: 'Entendendo e cultivando os nove frutos do Espírito Santo',
    content: 'Paulo lista em Gálatas 5 nove características que devem marcar a vida de todo cristão: amor, alegria, paz, paciência, amabilidade, bondade, fidelidade, mansidão e domínio próprio...',
    imageUrl: 'https://images.unsplash.com/photo-1597892657493-6847b9640bac?q=80&w=1000',
    category: 'Vida Cristã',
    date: '2025-03-25T10:30:00',
    references: ['Gálatas 5:22-23', 'João 15:1-8']
  }
];

// Louvor
const louvores = [
  {
    id: '1',
    title: 'Oceanos',
    author: 'Hillsong (versão português)',
    lyrics: 'Tu me chamas sobre as águas\nLugar onde os meus pés podem falhar\nE ali te encontro no mistério\nNo mar profundo minha fé vai se firmar...',
    videoUrl: 'https://www.youtube.com/watch?v=1YMgVQfqHa4',
    audioUrl: 'https://soundcloud.com/example/oceanos',
    category: 'Adoração',
    date: '2025-02-15T00:00:00'
  },
  {
    id: '2',
    title: 'Tua Graça Me Basta',
    author: 'Davi Sacer',
    lyrics: 'Tua graça me basta\nÉ o que me sustenta\nE me mantém de pé\nTua graça me basta...',
    videoUrl: 'https://www.youtube.com/watch?v=7kLOPp8aBGc',
    audioUrl: 'https://soundcloud.com/example/tua-graca-me-basta',
    category: 'Adoração',
    date: '2025-02-20T00:00:00'
  }
];

// Conteúdo de Família
const familias = [
  {
    id: '1',
    title: 'Criando Filhos na Era Digital',
    author: 'Dr. Carlos Eduardo',
    description: 'Dicas práticas para pais sobre uso saudável da tecnologia',
    content: 'Com o avanço tecnológico, os pais enfrentam desafios inéditos na criação dos filhos. Este artigo aborda estratégias para estabelecer limites saudáveis e usar a tecnologia como aliada...',
    imageUrl: 'https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?q=80&w=1000',
    category: 'Educação',
    date: '2025-04-05T08:00:00'
  },
  {
    id: '2',
    title: 'Comunicação Efetiva no Casamento',
    author: 'Dra. Juliana Mendes',
    description: 'Princípios bíblicos para melhorar o diálogo entre os cônjuges',
    content: 'A comunicação é a base de um casamento saudável. Aprenda como aplicar princípios bíblicos para expressar sentimentos, resolver conflitos e fortalecer a intimidade...',
    imageUrl: 'https://images.unsplash.com/photo-1494774157365-9e04c6720e47?q=80&w=1000',
    category: 'Casamento',
    date: '2025-04-10T08:00:00'
  }
];

// Conteúdo de Missões
const missoes = [
  {
    id: '1',
    title: 'Alcançando Povos Não Alcançados',
    author: 'Pr. Pedro Campos',
    description: 'Estratégias para levar o evangelho a grupos que nunca ouviram sobre Jesus',
    content: 'Ainda existem milhares de grupos étnicos que não têm acesso ao evangelho. Este artigo explora abordagens contextualizadas para alcançar essas comunidades...',
    imageUrl: 'https://images.unsplash.com/photo-1488521787991-ed7bbafc3c9a?q=80&w=1000',
    category: 'Evangelismo',
    date: '2025-03-15T11:00:00',
    region: 'Global'
  },
  {
    id: '2',
    title: 'Missões Urbanas: Impactando as Cidades',
    author: 'Dra. Fernanda Lima',
    description: 'Como desenvolver ministérios relevantes em grandes centros urbanos',
    content: 'As cidades concentram a maioria da população mundial e apresentam desafios e oportunidades únicas para a missão cristã. Descubra estratégias eficazes para o ministério urbano...',
    imageUrl: 'https://images.unsplash.com/photo-1519501025264-65ba15a82390?q=80&w=1000',
    category: 'Missão Urbana',
    date: '2025-03-20T11:00:00',
    region: 'Urbano'
  }
];

// Conteúdo de Juventude
const juventudes = [
  {
    id: '1',
    title: 'Identidade Cristã na Universidade',
    author: 'Pr. Lucas Ferreira',
    description: 'Como manter sua fé durante os anos acadêmicos',
    content: 'O ambiente universitário pode apresentar desafios à fé cristã. Este artigo oferece orientações para jovens que desejam viver sua fé de forma autêntica enquanto estudam...',
    imageUrl: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=1000',
    category: 'Vida Acadêmica',
    date: '2025-02-25T15:00:00',
    ageGroup: '18-25'
  },
  {
    id: '2',
    title: 'Relacionamentos Saudáveis na Adolescência',
    author: 'Psi. Mariana Costa',
    description: 'Princípios bíblicos para amizades e namoro',
    content: 'Os relacionamentos na adolescência têm grande impacto no desenvolvimento pessoal. Aprenda como construir relações que honram a Deus e contribuem para seu crescimento...',
    imageUrl: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=1000',
    category: 'Relacionamentos',
    date: '2025-03-05T15:00:00',
    ageGroup: '13-17'
  }
];

// Conteúdo de Liderança/Ministério
const liderancas = [
  {
    id: '1',
    title: 'Liderança Servidora: O Modelo de Jesus',
    author: 'Pr. Daniel Oliveira',
    description: 'Princípios de liderança baseados no exemplo de Cristo',
    content: 'Jesus revolucionou o conceito de liderança ao apresentar um modelo baseado no serviço. Este artigo explora como aplicar esses princípios em ministérios contemporâneos...',
    imageUrl: 'https://images.unsplash.com/photo-1455849318743-b2233052fcff?q=80&w=1000',
    category: 'Liderança',
    date: '2025-01-20T09:00:00',
    ministry: 'Geral'
  },
  {
    id: '2',
    title: 'Desenvolvendo Novos Líderes na Igreja',
    author: 'Pra. Tatiana Souza',
    description: 'Estratégias para identificar e treinar a próxima geração de líderes',
    content: 'O futuro da igreja depende do desenvolvimento intencional de novos líderes. Descubra métodos eficazes para identificar potencial, oferecer mentoria e criar oportunidades de crescimento...',
    imageUrl: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=1000',
    category: 'Mentoria',
    date: '2025-01-25T09:00:00',
    ministry: 'Treinamento'
  }
];

// Conteúdo de Comunidade
const comunidades = [
  {
    id: '1',
    title: 'Grupos Pequenos: Fortalecendo Relacionamentos',
    author: 'Pr. Marcos Andrade',
    description: 'Como criar grupos pequenos eficazes na igreja',
    content: 'Os grupos pequenos proporcionam um ambiente ideal para discipulado, comunhão e crescimento espiritual. Este guia oferece princípios para iniciar e sustentar grupos pequenos saudáveis...',
    imageUrl: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=1000',
    category: 'Grupos Pequenos',
    date: '2025-04-28T16:00:00'
  },
  {
    id: '2',
    title: 'Acolhimento de Novos Membros',
    author: 'Dra. Carolina Dias',
    description: 'Estratégias para integrar visitantes e novos convertidos',
    content: 'O processo de integração é crucial para reter novos membros na comunidade cristã. Descubra práticas que fazem visitantes se sentirem bem-vindos e se tornarem parte ativa da igreja...',
    imageUrl: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=1000',
    category: 'Integração',
    date: '2025-05-05T16:00:00'
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
