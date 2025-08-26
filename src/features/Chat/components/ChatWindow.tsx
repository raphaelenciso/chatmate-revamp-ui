import { Chat } from './compound/Chat';
import type { IMessage } from '../types/IMessage';
import type { IConversation } from '../types/IConversation';

interface ChatWindowProps {
  conversation?: IConversation;
  messages: IMessage[];
  currentUserId: string;
  onSendMessage: (content: string, contentType?: 'text' | 'image') => void;
  className?: string;
  onBackClick?: () => void;
}

export const ChatWindow = ({
  conversation,
  messages,
  currentUserId,
  onSendMessage,
  className,
  onBackClick,
}: ChatWindowProps) => {
  return (
    <Chat
      conversation={conversation}
      messages={messages}
      currentUserId={currentUserId}
      isTyping={false}
      onSendMessage={onSendMessage}
      className={className}
    >
      <Chat.Header onBackClick={onBackClick} />
      <Chat.Messages />
      <Chat.Input />
    </Chat>
  );
};
