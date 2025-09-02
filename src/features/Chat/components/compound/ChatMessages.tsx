import { useRef, useEffect } from 'react';
import { useChatContext } from './ChatContext';
import { ChatMessage } from './ChatMessage';
import { TypingIndicator } from './TypingIndicator';

/**
 * ChatMessages compound component for displaying message list
 * Automatically scrolls to bottom and handles typing indicator
 */
export const ChatMessages = () => {
  const { messages, conversation, isTyping } = useChatContext();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  if (!conversation) return;

  return (
    <div className="h-full p-3 flex flex-col-reverse overflow-y-auto my-12 ">
      <div className="space-y-4">
        {messages.map((message) => {
          return <ChatMessage key={message.id} message={message} />;
        })}

        {isTyping && <TypingIndicator />}

        <div ref={messagesEndRef} />
      </div>
    </div>
  );
};
