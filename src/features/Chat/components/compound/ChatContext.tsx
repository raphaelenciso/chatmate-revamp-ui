import { createContext, useContext, ReactNode } from 'react';
import type { IContact } from '../../types/IContact';
import type { IMessage } from '../../types/IChat';

interface ChatContextValue {
  contact?: IContact;
  messages: IMessage[];
  currentUserId: string;
  isTyping: boolean;
  onSendMessage: (content: string, type?: 'text' | 'image' | 'file') => void;
}

const ChatContext = createContext<ChatContextValue | undefined>(undefined);

interface ChatProviderProps {
  children: ReactNode;
  contact?: IContact;
  messages: IMessage[];
  currentUserId: string;
  isTyping: boolean;
  onSendMessage: (content: string, type?: 'text' | 'image' | 'file') => void;
}

/**
 * ChatProvider component that provides chat context to all child components
 * Manages shared state for the compound Chat component
 */
export const ChatProvider = ({
  children,
  contact,
  messages,
  currentUserId,
  isTyping,
  onSendMessage,
}: ChatProviderProps) => {
  return (
    <ChatContext.Provider
      value={{
        contact,
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
