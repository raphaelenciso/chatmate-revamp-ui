import { formatTime } from '../../utils/dateHelpers';
import type { IMessage } from '../../types/IChat';
import type { IContact } from '../../types/IContact';

interface ChatMessageProps {
  message: IMessage;
  isOwn: boolean;
  contact?: IContact;
  currentUserId: string;
}

/**
 * Reusable ChatMessage component for displaying individual chat messages
 * Handles different message types and styling based on sender
 */
export const ChatMessage = ({
  message,
  isOwn,
  contact,
  currentUserId,
}: ChatMessageProps) => {
  const isAI = message.senderId === contact?.id && contact?.isAI;

  return (
    <div className={`flex ${isOwn ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${
          isOwn ? 'bg-primary' : 'bg-gray-100 text-gray-800'
        }`}
      >
        <p
          className={`text-sm ${
            isOwn
              ? 'text-primary-foreground'
              : isAI
                ? 'text-foreground'
                : 'text-card-foreground'
          }`}
        >
          {message.content}
        </p>
        <p
          className={`text-xs mt-1 ${
            isOwn
              ? 'text-primary-foreground/70'
              : isAI
                ? 'text-muted-foreground'
                : 'text-muted-foreground'
          }`}
        >
          {formatTime(message.timestamp)}
        </p>
      </div>
    </div>
  );
};
