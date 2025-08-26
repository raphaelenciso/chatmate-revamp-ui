export type RoleType = 'user' | 'bot';
export type ContentType = 'text' | 'image';

export interface IMessage {
  id: string;
  conversation: string | null;
  sender: RoleType;
  content: string;
  timestamp: string;
  readBy: {
    user: string;
    readAt: string;
  }[];
}

export interface IPostMessagePayload {
  conversation: string;
  sender: string;
  content: string;
}
