import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Bot } from 'lucide-react';
import type { IContact } from '../../types/IContact';
import { getInitials } from '../../utils/stringHelpers';
import { cn } from '@/lib/utils';

interface ContactProps {
  contact: IContact;
  isActive: boolean;
  onSelect: (contact: IContact) => void;
}

// Helper function to get status indicator color
const getStatusColor = (status: string) => {
  switch (status) {
    case 'online':
      return 'bg-green-600';
    case 'away':
      return 'bg-yellow-600';
    case 'busy':
      return 'bg-red-600';
    default:
      return 'bg-muted';
  }
};

const Contact = ({ contact, isActive, onSelect }: ContactProps) => {
  return (
    <div
      onClick={() => onSelect(contact)}
      className={cn(
        'w-full  flex items-center space-x-3 p-2 rounded-lg cursor-pointer transition-colors ',
        isActive ? 'bg-primary/10' : 'hover:bg-muted'
      )}
    >
      <div className="relative">
        <Avatar className="h-12 w-12">
          <AvatarImage src={contact.avatar} alt={contact.name} />
          <AvatarFallback>{getInitials(contact.name)}</AvatarFallback>
        </Avatar>
        {contact.isAI ? (
          <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-accent rounded-full flex items-center justify-center">
            <Bot className="h-3 w-3 text-accent-foreground" />
          </div>
        ) : (
          <div
            className={`absolute -bottom-1 -right-1 w-4 h-4 ${getStatusColor(contact.status)} rounded-full`}
          ></div>
        )}
      </div>

      <div className="flex items-center justify-between w-full min-w-0 ">
        <div className="w-full  ">
          <div className="flex items-center justify-between">
            <h3 className="font-medium text-sm truncate">{contact.name}</h3>
          </div>
          <p
            className={cn(
              'text-xs text-muted-foreground truncate',
              !!contact.unreadCount && 'font-bold'
            )}
          >
            {contact.lastMessage ||
              `${contact.status === 'online' ? 'Online' : `Last seen ${contact.lastSeen}`}`}
          </p>
        </div>

        {!!contact.unreadCount && (
          <Badge
            variant="default"
            className="ml-2 bg-primary text-primary-foreground rounded-full text-[10px] aspect-square flex items-center justify-center size-5 my-auto"
          >
            {contact.unreadCount}
          </Badge>
        )}
      </div>
    </div>
  );
};

export default Contact;
