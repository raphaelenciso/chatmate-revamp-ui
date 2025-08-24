import { createContext, useContext, type ReactNode } from 'react';
import type { IUserContact } from '../../types/IUserContact';
import type { IMessage } from '../../types/IMessage';

interface ChatContextValue {
  userContact?: IUserContact;
  messages: IMessage[];
  currentUserId: string;
  isTyping: boolean;
  onSendMessage: (content: string, contentType?: 'text' | 'image') => void;
}

const ChatContext = createContext<ChatContextValue | undefined>(undefined);

interface ChatProviderProps {
  children: ReactNode;
  userContact?: IUserContact;
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
  userContact,
  messages,
  currentUserId,
  isTyping,
  onSendMessage,
}: ChatProviderProps) => {
  return (
    <ChatContext.Provider
      value={{
        userContact,
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
