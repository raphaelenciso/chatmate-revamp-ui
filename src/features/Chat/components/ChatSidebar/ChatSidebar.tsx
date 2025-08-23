import { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Plus, Users } from 'lucide-react';
import { getInitials } from '../../utils/stringHelpers';
import Contact from './Contact';
import { cn } from '@/lib/utils';

interface Contact {
  id: string;
  name: string;
  avatar: string;
  status: 'online' | 'away' | 'busy' | 'offline';
  lastMessage?: string;
  unreadCount?: number;
  lastSeen?: string;
  isAI?: boolean;
}

interface ChatSidebarProps {
  user: {
    id: string;
    name: string;
    email: string;
    avatar: string;
  };
  contacts: Contact[];
  activeContactId?: string;
  onContactSelect: (contact: Contact) => void;
  onLogout: () => void;
  className?: string;
}

export const ChatSidebar = ({
  user,
  contacts,
  activeContactId,
  onContactSelect,
  onLogout,
  className,
}: ChatSidebarProps) => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredContacts = contacts.filter((contact) =>
    contact.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className={cn('relative w-full flex flex-col h-full', className)}>
      <div className="py-3 px-4 flex flex-col gap-2">
        <div className="flex justify-between items-center">
          <div className="text-lg  font-bold  flex items-center gap-2">
            <Avatar className="h-10 w-10">
              <AvatarImage src={user.avatar} alt={user.name} />
              <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
            </Avatar>
            <span className="text-primary">Chats</span>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="flex-1">
              <Plus className="h-4 w-4 " />
            </Button>
            <Button variant="outline" size="sm" className="flex-1">
              <Users className="h-4 w-4 " />
            </Button>
          </div>
        </div>

        <div>
          <div className="relative">
            {/* Search */}
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search conversations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 rounded-xl"
            />
          </div>
        </div>
      </div>

      {/* Contacts List */}
      <div className="w-full  h-full overflow-y-auto px-2">
        {filteredContacts.map((contact) => (
          <Contact
            key={contact.id}
            contact={contact}
            isActive={activeContactId === contact.id}
            onSelect={onContactSelect}
          />
        ))}
      </div>
    </div>
  );
};
