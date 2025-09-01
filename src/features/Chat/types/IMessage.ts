import type { IUser } from '@/types/IUser';
import type { IConversation } from './IConversation';
import type { IResponse } from '@/types/IResponse';

export type RoleType = 'user' | 'bot';
export type ContentType = 'text' | 'image';

export interface IMessage {
  id: string;
  conversation: IConversation;
  sender: IUser;
  content: string;
  createdAt: string;
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

export interface IPostMessageResponse extends IResponse {
  data: IMessage;
}

export interface IGetMessagesByConversationIdResponse {
  data: IMessage[];
  success: boolean;
}
