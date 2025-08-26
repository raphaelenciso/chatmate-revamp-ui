export interface IPostConversationPayload {
  participants: string[];
}

export interface IConversation {
  id: string;
  participants: {
    id: string;
    avatar: string;
    username: string;
    isOnline: boolean;
    lastSeen: Date;
  }[];
  lastMessage: {
    content: string;
    readyBy: {
      id: string;
      readAt: Date;
    }[];
    sender: {
      id: string;
    };
  };
}

// Direct type alias instead of empty interface extension
export type IGetConversationResponse = Array<IConversation>;
