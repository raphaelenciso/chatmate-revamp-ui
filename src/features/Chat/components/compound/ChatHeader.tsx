import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { MoreVertical, Bot } from 'lucide-react';
import { getInitials } from '../../utils/stringHelpers';
import { useChatContext } from './ChatContext';
import type { IContact } from '../../types/IContact';

interface ChatHeaderProps {
  contact?: IContact;
  showCallButtons?: boolean;
  onMoreClick?: () => void;
}

/**
 * Reusable ChatHeader component for displaying chat contact info and actions
 * Shows contact avatar, name, status and optional action buttons
 */
export const ChatHeader = ({
  contact: propContact,
  showCallButtons = false,
  onMoreClick,
}: ChatHeaderProps) => {
  // Use context contact if no prop contact is provided (compound component usage)
  const contextContact = useChatContext()?.contact;
  const contact = propContact || contextContact;

  if (!contact) {
    return null;
  }
  return (
    <div className="px-4 py-2 border-b border-border  flex items-center justify-between">
      <div className="flex items-center space-x-3">
        <div className="relative">
          <Avatar className="h-8 w-8">
            <AvatarImage src={contact.avatar} alt={contact.name} />
            <AvatarFallback>{getInitials(contact.name)}</AvatarFallback>
          </Avatar>
          {contact.isAI ? (
            <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-accent rounded-full flex items-center justify-center">
              <Bot className="h-3 w-3 text-accent-foreground" />
            </div>
          ) : (
            <div
              className={`absolute -bottom-1 -right-1 w-4 h-4 ${
                contact.status === 'online'
                  ? 'bg-green-500'
                  : contact.status === 'away'
                    ? 'bg-yellow-500'
                    : contact.status === 'busy'
                      ? 'bg-red-500'
                      : 'bg-muted'
              } rounded-full`}
            />
          )}
        </div>
        <div>
          <h2 className="font-semibold text-sm">{contact.name}</h2>
          <p className="text-xs text-muted-foreground">
            {contact.isAI
              ? 'AI Assistant'
              : contact.status === 'online'
                ? 'Online'
                : 'Last seen recently'}
          </p>
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <Button variant="ghost" size="sm" onClick={onMoreClick}>
          <MoreVertical className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};
