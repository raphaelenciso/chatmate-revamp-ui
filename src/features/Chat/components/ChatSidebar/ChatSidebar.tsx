import { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Plus, Users, Sun, Moon } from 'lucide-react';
import { getInitials } from '../../utils/stringHelpers';
import Contact from './Contact';
import { cn } from '@/lib/utils';
import type { IUserContact } from '../../types/IUserContact';
import useAuthStore from '@/stores/authStore';
import useThemeStore from '@/stores/themeStore';

interface ChatSidebarProps {
  userContacts: IUserContact[];
  activeContactId?: string;
  onContactSelect: (userContact: IUserContact) => void;
  className?: string;
}

export const ChatSidebar = ({
  userContacts,
  activeContactId,
  onContactSelect,

  className,
}: ChatSidebarProps) => {
  const user = useAuthStore((state) => state.user);
  const theme = useThemeStore((state) => state.theme);
  const setTheme = useThemeStore((state) => state.setTheme);

  const [searchQuery, setSearchQuery] = useState('');

  const filteredContacts = userContacts.filter((contact) =>
    contact.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className={cn('relative w-full flex flex-col h-full', className)}>
      <div className="p-3 flex flex-col gap-2">
        <div className="flex justify-between items-center">
          <div className="text-lg  font-bold  flex items-center gap-2">
            <Avatar className="h-10 w-10">
              <AvatarImage src={user?.avatar || ''} alt={user?.name || ''} />
              <AvatarFallback>{getInitials(user?.name || '')}</AvatarFallback>
            </Avatar>
            <span>Chats</span>
          </div>
          <div className="flex gap-2">
            <Button
              variant="ghost"
              size="sm"
              className="flex-1 rounded-full aspect-square size-4  !p-4 bg-primary-foreground"
            >
              <Plus className=" size-4 " />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="flex-1 rounded-full aspect-square size-4  !p-4 bg-primary-foreground"
            >
              <Users className="  " />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="flex-1 rounded-full aspect-square size-4  !p-4 bg-primary-foreground"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            >
              <Sun className="size-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute size-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
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
              className="pl-10 rounded-full bg-primary-foreground"
            />
          </div>
        </div>
      </div>

      {/* Contacts List */}
      <div className="w-full  h-full overflow-y-auto px-2">
        {filteredContacts.map((userContact) => (
          <Contact
            key={userContact.id}
            userContact={userContact}
            isActive={activeContactId === userContact.id}
            onSelect={onContactSelect}
          />
        ))}
      </div>
    </div>
  );
};
