import type { IResponse } from '@/types/IResponse';
import type { IUser } from '@/types/IUser';

export interface IPostConversationPayload {
  participants: string[];
  lastMessage?: {
    content: string;
    sender: string;
    timestamp?: string;
  };
}

export interface IPostConversationResponse extends IResponse {
  data: IConversation;
}

export interface IConversation {
  id: string;
  participants: IUser[];
  lastMessage?: {
    content: string;
    sender: IUser;
    timestamp?: string;
  };
}

// Direct type alias instead of empty interface extension
export interface IGetConversationResponse extends IResponse {
  data: IConversation[];
}

export interface IGetConversationByParticipantsIdsPayload {
  participantsIds: string[];
}
