import { createContext, useContext, type ReactNode } from 'react';

import type { IMessage } from '../../types/IMessage';
import type { IConversation } from '../../types/IConversation';

interface ChatContextValue {
  conversation?: IConversation;
  messages: IMessage[];
  currentUserId: string;
  isTyping: boolean;
  onSendMessage: (content: string, contentType?: 'text' | 'image') => void;
}

const ChatContext = createContext<ChatContextValue | undefined>(undefined);

interface ChatProviderProps {
  children: ReactNode;
  conversation?: IConversation;
  messages: IMessage[];
  currentUserId: string;
  isTyping: boolean;
  onSendMessage: (content: string, contentType?: 'text' | 'image') => void;
}

/**
 * ChatProvider component that provides chat context to all child components
 * Manages shared state for the compound Chat component
 */
export const ChatProvider = ({
  children,
  conversation,
  messages,
  currentUserId,
  isTyping,
  onSendMessage,
}: ChatProviderProps) => {
  return (
    <ChatContext.Provider
      value={{
        conversation,
        messages,
        currentUserId,
        isTyping,
        onSendMessage,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

/**
 * Hook to access chat context
 * Must be used within a ChatProvider
 */
export const useChatContext = () => {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error('useChatContext must be used within a ChatProvider');
  }
  return context;
};
