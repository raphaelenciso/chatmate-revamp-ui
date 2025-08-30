import { create } from 'zustand';
import type { IConversation } from '../types/IConversation';

export const useConversationsStore = create<{
  userConversations: IConversation[];
  setUserConversations: (
    userConversations:
      | IConversation[]
      | ((prev: IConversation[]) => IConversation[])
  ) => void;
}>((set) => ({
  userConversations: [],
  setUserConversations: (userConversations) =>
    set((state) => ({
      userConversations:
        typeof userConversations === 'function'
          ? userConversations(state.userConversations)
          : userConversations || [],
    })),
}));
