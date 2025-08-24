import { ChevronLeft } from 'lucide-react';
import { useChatContext } from './ChatContext';
import type { IUserContact } from '../../types/IUserContact';
import AvatarWithStatus from '../AvatarWithStatus';

interface ChatHeaderProps {
  userContact?: IUserContact;
  showCallButtons?: boolean;
  onBackClick?: () => void;
}

/**
 * Reusable ChatHeader component for displaying chat userContact info and actions
 * Shows userContact avatar, name, status and optional action buttons
 */
export const ChatHeader = ({
  userContact: propContact,

  onBackClick,
}: ChatHeaderProps) => {
  // Use context userContact if no prop userContact is provided (compound component usage)
  const contextContact = useChatContext()?.userContact;
  const userContact = propContact || contextContact;

  if (!userContact) {
    return null;
  }
  return (
    <div className="absolute top-0 left-0 w-full px-3 py-2 border-b border-border  flex items-center justify-between h-12 z-10 bg-white">
      <div className="flex items-center space-x-3">
        <ChevronLeft
          className="size-6 hover:cursor-pointer hover:opacity-75 text-primary block sm:hidden"
          onClick={onBackClick}
        />

        <AvatarWithStatus
          avatar={userContact.avatar}
          name={userContact.username}
          className="h-9 w-9"
        />
        <div>
          <h2 className="font-semibold text-sm">{userContact.username}</h2>
        </div>
      </div>
    </div>
  );
};
