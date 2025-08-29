import { create } from 'zustand';
import type { IConversation } from '../types/IConversation';

export const useConversationsStore = create<{
  userConversations: IConversation[];
  setUserConversations: (userConversations: IConversation[]) => void;
}>((set) => ({
  userConversations: [],
  setUserConversations: (userConversations) =>
    set({ userConversations: userConversations || [] }),
}));
