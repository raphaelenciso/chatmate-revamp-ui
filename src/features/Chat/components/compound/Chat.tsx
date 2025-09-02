import { type ReactNode } from 'react';
import { Bot } from 'lucide-react';
import { ChatProvider } from './ChatContext';
import { ChatHeader } from './ChatHeader';
import { MessageInput } from './MessageInput';
import { TypingIndicator } from './TypingIndicator';
import { ChatMessage } from './ChatMessage';
import { ChatMessages } from './ChatMessages';

import type { IMessage } from '../../types/IMessage';
import { cn } from '@/lib/utils';
import type { IConversation } from '../../types/IConversation';

interface ChatProps {
  children: ReactNode;
  conversation?: IConversation;
  messages: IMessage[];
  currentUserId: string;
  isTyping?: boolean;
  onSendMessage: (content: string, contentType?: 'text' | 'image') => void;
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
  conversation,
  messages,
  currentUserId,
  isTyping = false,
  onSendMessage,
  className,
}: ChatProps) => {
  if (!conversation) {
    return (
      <div
        className={cn(
          'flex-1 h-full flex items-center justify-center bg-background',
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
      conversation={conversation}
      messages={messages}
      currentUserId={currentUserId}
      isTyping={isTyping}
      onSendMessage={onSendMessage}
    >
      <div className={cn('flex-1 flex flex-col h-full relative', className)}>
        {children}
      </div>
    </ChatProvider>
  );
};

// Create the compound component with attached subcomponents
export const Chat = ChatRoot as ChatCompoundComponent;

// Attach subcomponents to the main component
Chat.Header = ChatHeader;
Chat.Message = ChatMessage;
Chat.Messages = ChatMessages;
Chat.TypingIndicator = TypingIndicator;
Chat.Input = MessageInput;
