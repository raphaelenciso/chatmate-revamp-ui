import { type ReactNode } from 'react';
import { Bot } from 'lucide-react';
import { ChatProvider } from './ChatContext';
import { ChatHeader } from './ChatHeader';
import { MessageInput } from './MessageInput';
import { TypingIndicator } from './TypingIndicator';
import { ChatMessage } from './ChatMessage';
import { ChatMessages } from './ChatMessages';
import type { IContact } from '../../types/IContact';
import type { IMessage } from '../../types/IChat';
import { cn } from '@/lib/utils';

interface ChatProps {
  children: ReactNode;
  contact?: IContact;
  messages: IMessage[];
  currentUserId: string;
  isTyping?: boolean;
  onSendMessage: (content: string, type?: 'text' | 'image' | 'file') => void;
  className?: string;
}

interface ChatCompoundComponent {
  (props: ChatProps): ReactNode;
  Header: typeof ChatHeader;
  Messages: typeof ChatMessages;
  Input: typeof MessageInput;
  Message: typeof ChatMessage;
  TypingIndicator: typeof TypingIndicator;
}

/**
 * Main Chat compound component that provides context and layout
 * Usage: <Chat><Chat.Header /><Chat.Messages /><Chat.Input /></Chat>
 */
const ChatRoot = ({
  children,
  contact,
  messages,
  currentUserId,
  isTyping = false,
  onSendMessage,
  className,
}: ChatProps) => {
  // Show welcome screen if no contact is selected
  if (!contact) {
    return (
      <div
        className={cn(
          'flex-1 flex items-center justify-center bg-background',
          className
        )}
      >
        <div className="text-center">
          <div className="p-4 bg-gradient-primary rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
            <Bot className="h-8 w-8 text-primary-foreground" />
          </div>
          <h3 className="text-xl font-semibold mb-2">Welcome to ChatMate</h3>
          <p className="text-muted-foreground">
            Select a conversation to start chatting
          </p>
        </div>
      </div>
    );
  }

  return (
    <ChatProvider
      contact={contact}
      messages={messages}
      currentUserId={currentUserId}
      isTyping={isTyping}
      onSendMessage={onSendMessage}
    >
      <div className={cn('flex-1 flex flex-col h-full', className)}>
        {children}
      </div>
    </ChatProvider>
  );
};

// Create the compound component with attached subcomponents
export const Chat = ChatRoot as ChatCompoundComponent;

// Attach subcomponents to the main component
Chat.Header = ChatHeader;
Chat.Messages = ChatMessages;
Chat.Input = MessageInput;
Chat.Message = ChatMessage;
Chat.TypingIndicator = TypingIndicator;
