import { create } from 'zustand';
import type { IConversation } from '../types/IConversation';

export const useConversationsStore = create<{
  userConversations: IConversation[] | null;
  setUserConversations: (userConversations: IConversation[]) => void;
}>((set) => ({
  userConversations: null,
  setUserConversations: (userConversations) => set({ userConversations }),
}));
