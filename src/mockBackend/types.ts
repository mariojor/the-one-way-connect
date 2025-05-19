
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
