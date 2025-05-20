
// types.ts (opcional para organizar tipos)
export type UserRole = "admin" | "editor";

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  password: string;
}

export interface Devocional {
  id: string;
  date: string;
  title: string;
  verse: string;
  verseText: string;
  content: string;
  prayer: string;
  application: string;
  authorId: string;
}

export interface Artigo {
  id: string;
  title: string;
  author: string;
  date: string;
  summary: string;
  content: string;
  imageUrl: string;
  tags: string[];
}

export interface Evento {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
  imageUrl: string;
  registerLink: string;
}

export interface Oracao {
  id: string;
  title: string;
  author: string;
  description: string;
  content: string;
  imageUrl: string;
  category: string;
  date: string;
}

export interface Midia {
  id: string;
  title: string;
  description: string;
  author: string;
  type: "video" | "podcast" | "outro";
  url: string;
  imageUrl: string;
  duration: string;
  date: string;
}

export interface Louvor {
  id: string;
  titulo: string;
  artista: string;
  album: string;
  ano: string;
  categoria: string;
  letra?: string;
  audio?: string;
  videoUrl?: string;
  imageUrl?: string;
}

export interface Estudo {
  id: string;
  title: string;
  author: string;
  date: string;
  content: string;
  imageUrl: string;
  category: string;
  references: string;
  duration: string;
  level: string;
  description: string;
}

export interface Noticia {
  id: string;
  title: string;
  author: string;
  date: string;
  content: string;
  imageUrl: string;
  category: string;
  summary: string;
}

export interface Familia {
  id: string;
  title: string;
  description: string;
  content: string;
  author: string;
  date: string;
  category: string;
  imageUrl: string;
}

export interface Missao {
  id: string;
  title: string;
  description: string;
  location: string;
  startDate: string;
  endDate: string;
  status: string;
  leader: string;
  imageUrl: string;
}

export interface Juventude {
  id: string;
  title: string;
  description: string;
  date: string;
  location: string;
  leader: string;
  type: string;
  imageUrl: string;
}

export interface Lideranca {
  id: string;
  name: string;
  role: string;
  bio: string;
  imageUrl: string;
  email: string;
  phone: string;
  department: string;
}

export interface Comunidade {
  id: string;
  title: string;
  description: string;
  leader: string;
  meetingDay: string;
  meetingTime: string;
  location: string;
  imageUrl: string;
  members: number;
}
