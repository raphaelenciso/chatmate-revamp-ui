import { useState } from 'react';
import { Chat } from './compound/Chat';
import type { IMessage } from '../types/IMessage';
import type { IUserContact } from '../types/IUserContact';

interface ChatWindowProps {
  userContact?: IUserContact;
  messages: IMessage[];
  currentUserId: string;
  onSendMessage: (content: string, contentType?: 'text' | 'image') => void;
  className?: string;
  onBackClick?: () => void;
}

export const ChatWindow = ({
  userContact,
  messages,
  currentUserId,
  onSendMessage,
  className,
  onBackClick,
}: ChatWindowProps) => {
  const [isTyping, setIsTyping] = useState(false);

  const handleSendMessage = (message: string) => {
    onSendMessage(message);

    // Simulate AI response if chatting with AI
    if (userContact?.id === 'ai-assistant') {
      setIsTyping(true);
      setTimeout(() => {
        setIsTyping(false);
        const aiResponses = [
          "I'm here to help! What would you like to know?",
          "That's an interesting question. Let me think about it...",
          "I understand what you're saying. Here's my perspective:",
          "Great question! I'd be happy to assist you with that.",
          'Thanks for sharing that with me. How can I help further?',
        ];
        const randomResponse =
          aiResponses[Math.floor(Math.random() * aiResponses.length)];
        onSendMessage(randomResponse, 'text');
      }, 1500);
    }
  };

  return (
    <Chat
      userContact={userContact}
      messages={messages}
      currentUserId={currentUserId}
      isTyping={isTyping}
      onSendMessage={handleSendMessage}
      className={className}
    >
      <Chat.Header onBackClick={onBackClick} />
      <Chat.Messages />
      <Chat.Input />
    </Chat>
  );
};
