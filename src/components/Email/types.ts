export interface Email {
  id: number;
  folder: string;
  sender: string;
  email: string;
  initials: string;
  subject: string;
  snippet: string;
  time: string;
  isStarred: boolean;
  initialsBg: string;
  date: string;
  unread: boolean;
}
