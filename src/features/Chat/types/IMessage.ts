import type { IUser } from '@/types/IUser';
import type { IConversation } from './IConversation';

export type RoleType = 'user' | 'bot';
export type ContentType = 'text' | 'image';

export interface IMessage {
  id: string;
  conversation: IConversation;
  sender: IUser;
  content: string;
  timestamp: string;
  readBy: {
    user: IUser;
    readAt: string;
  }[];
}

export interface IPostMessagePayload {
  conversation: string;
  sender: string;
  content: string;
}
