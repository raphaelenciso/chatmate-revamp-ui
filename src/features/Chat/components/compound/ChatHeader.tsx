import { Button } from '@/components/ui/button';
import { MoreVertical, ChevronLeft } from 'lucide-react';
import { useChatContext } from './ChatContext';
import type { IUserContact } from '../../types/IUserContact';
import AvatarWithStatus from '../AvatarWithStatus';

interface ChatHeaderProps {
  userContact?: IUserContact;
  showCallButtons?: boolean;
  onMoreClick?: () => void;
  onBackClick?: () => void;
}

/**
 * Reusable ChatHeader component for displaying chat userContact info and actions
 * Shows userContact avatar, name, status and optional action buttons
 */
export const ChatHeader = ({
  userContact: propContact,
  onMoreClick,
  onBackClick,
}: ChatHeaderProps) => {
  // Use context userContact if no prop userContact is provided (compound component usage)
  const contextContact = useChatContext()?.userContact;
  const userContact = propContact || contextContact;

  if (!userContact) {
    return null;
  }
  return (
    <div className="px-3 py-2 border-b border-border  flex items-center justify-between">
      <div className="flex items-center space-x-3">
        <ChevronLeft
          className="size-6 hover:cursor-pointer hover:opacity-75 text-primary block sm:hidden"
          onClick={onBackClick}
        />

        <AvatarWithStatus
          avatar={userContact.avatar}
          name={userContact.name}
          status={userContact.status}
          isAI={userContact.isAI}
          className="h-9 w-9"
        />
        <div>
          <h2 className="font-semibold text-sm">{userContact.name}</h2>
          <p className="text-xs text-muted-foreground">
            {userContact.isAI
              ? 'AI Assistant'
              : userContact.status === 'online'
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
