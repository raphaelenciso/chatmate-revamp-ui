export type RoleType = 'user' | 'bot';
export type ContentType = 'text' | 'image';

export interface IMessage {
  id: string;
  senderId: string;
  role: RoleType;
  contentType: ContentType;
  content: string;
  timestamp: string;
}
