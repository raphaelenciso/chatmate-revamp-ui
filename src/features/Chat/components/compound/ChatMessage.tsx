import { formatTime } from '../../utils/dateHelpers';
import type { IMessage } from '../../types/IChat';
import type { IUserContact } from '../../types/IUserContact';

interface ChatMessageProps {
  message: IMessage;
  isOwn: boolean;
  userContact?: IUserContact;
  currentUserId: string;
}

/**
 * Reusable ChatMessage component for displaying individual chat messages
 * Handles different message types and styling based on sender
 */
export const ChatMessage = ({
  message,
  isOwn,
  userContact,
}: ChatMessageProps) => {
  const isAI = message.senderId === userContact?.id && userContact?.isAI;

  return (
    <div className={`flex ${isOwn ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${
          isOwn ? 'bg-primary' : 'bg-primary-foreground '
        }`}
      >
        <p
          className={`text-sm ${
            isOwn
              ? 'text-white'
              : isAI
                ? 'text-foreground'
                : 'text-card-foreground'
          }`}
        >
          {message.content}
        </p>
        <p
          className={`text-xs mt-1 ${
            isOwn ? 'text-secondary' : 'text-muted-foreground'
          }`}
        >
          {formatTime(message.timestamp)}
        </p>
      </div>
    </div>
  );
};
