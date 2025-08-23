import { useRef, useEffect } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useChatContext } from './ChatContext';
import { ChatMessage } from './ChatMessage';
import { TypingIndicator } from './TypingIndicator';

/**
 * ChatMessages compound component for displaying message list
 * Automatically scrolls to bottom and handles typing indicator
 */
export const ChatMessages = () => {
  const { messages, currentUserId, userContact, isTyping } = useChatContext();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  return (
    <ScrollArea className="flex-1 p-3">
      <div className="space-y-4">
        {messages.map((message) => {
          const isOwn = message.senderId === currentUserId;

          return (
            <ChatMessage
              key={message.id}
              message={message}
              isOwn={isOwn}
              userContact={userContact}
              currentUserId={currentUserId}
            />
          );
        })}

        {isTyping && <TypingIndicator />}

        <div ref={messagesEndRef} />
      </div>
    </ScrollArea>
  );
};
