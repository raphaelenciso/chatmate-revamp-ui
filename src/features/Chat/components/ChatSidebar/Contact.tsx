import type { IUserContact } from '../../types/IUserContact';
import { cn } from '@/lib/utils';
import AvatarWithStatus from '../AvatarWithStatus';

interface ContactProps {
  userContact: IUserContact;
  onSelect: (userContact: IUserContact) => void;
  isActive: boolean;
}

const Contact = ({ userContact, isActive, onSelect }: ContactProps) => {
  return (
    <div
      onClick={() => onSelect(userContact)}
      className={cn(
        'w-full  flex items-center space-x-3 p-2 rounded-lg cursor-pointer transition-colors ',
        isActive ? 'bg-primary/10' : 'hover:bg-muted'
      )}
    >
      <div className="relative">
        <AvatarWithStatus
          avatar={userContact.avatar}
          name={userContact.name}
          status={userContact.status}
          isAI={userContact.isAI}
        />
      </div>

      <div className="flex items-center justify-between w-full min-w-0 ">
        <div className="w-full  ">
          <div className="flex items-center justify-between">
            <h3 className="font-medium text-sm truncate">{userContact.name}</h3>
          </div>
          <p
            className={cn(
              'text-xs text-muted-foreground truncate',
              !!userContact.unreadCount && 'font-bold'
            )}
          >
            {userContact.lastMessage ||
              `${userContact.status === 'online' ? 'Online' : `Last seen ${userContact.lastSeen}`}`}
          </p>
        </div>

        {!!userContact.unreadCount && (
          <div className="bg-primary rounded-full  aspect-square  size-2 " />
        )}
      </div>
    </div>
  );
};

export default Contact;
