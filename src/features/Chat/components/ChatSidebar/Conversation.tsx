import { cn } from '@/lib/utils';
import AvatarWithStatus from '../AvatarWithStatus';
import type { IConversation } from '../../types/IConversation';

interface ConversationProps {
  conversation: IConversation;
  onSelect: (conversation: IConversation) => void;
  isActive: boolean;
}

const Conversation = ({
  conversation,
  isActive,
  onSelect,
}: ConversationProps) => {
  return (
    <div
      onClick={() => onSelect(conversation)}
      className={cn(
        'w-full  flex items-center space-x-3 p-2 rounded-lg cursor-pointer transition-colors ',
        isActive ? 'bg-primary/8' : 'hover:bg-muted'
      )}
    >
      <div className="relative">
        <AvatarWithStatus
          avatar={conversation.participants[0].avatar}
          name={conversation.participants[0].username}
          isOnline={conversation.participants[0].isOnline}
        />
      </div>

      <div className="flex items-center justify-between w-full min-w-0 ">
        <div className="w-full  ">
          <div className="flex items-center justify-between">
            <h3 className="font-medium text-sm truncate">
              {conversation.participants[0].username}
            </h3>
          </div>
          <p
            className={cn(
              'text-xs text-muted-foreground truncate'
              // !!userContact.unreadCount && 'font-bold'
            )}
          >
            {conversation.lastMessage.content ||
              `${conversation.participants[0].isOnline ? 'Online' : `Last seen ${conversation.participants[0].lastSeen}`}`}
          </p>
        </div>

        {/* {!!userContact.unreadCount && (
          <div className="bg-primary rounded-full  aspect-square  size-2 " />
        )} */}
      </div>
    </div>
  );
};

export default Conversation;
