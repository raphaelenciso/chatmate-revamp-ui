import { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Plus, Sun, Moon } from 'lucide-react';
import { getInitials } from '../../utils/stringHelpers';

import { cn } from '@/lib/utils';

import { useAuthStore } from '@/stores/authStore';
import useThemeStore from '@/stores/themeStore';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import Conversation from './Conversation';
import type { IConversation } from '../../types/IConversation';

interface ChatSidebarProps {
  userConversations: IConversation[] | null;
  activeConversationId?: string;
  onConversationSelect: (conversation: IConversation) => void;
  setIsNewChatDialogOpen: (isOpen: boolean) => void;

  className?: string;
}

export const ChatSidebar = ({
  userConversations,
  activeConversationId,
  onConversationSelect,
  setIsNewChatDialogOpen,

  className,
}: ChatSidebarProps) => {
  const user = useAuthStore((state) => state.user);
  const setUser = useAuthStore((state) => state.setUser);
  const theme = useThemeStore((state) => state.theme);
  const setTheme = useThemeStore((state) => state.setTheme);

  const [searchQuery, setSearchQuery] = useState('');

  // useEffect(() => {
  //   const fetchUsers = async () => {
  //     const users = await getUsers({
  //       username: searchQuery,
  //       excludeSelf: true,
  //     });
  //     console.log(users);
  //   };
  //   fetchUsers();
  // }, [searchQuery, getUsers]);

  return (
    <div className={cn('relative w-full flex flex-col h-full', className)}>
      <div className="p-3 flex flex-col gap-2">
        <div className="flex justify-between items-center">
          <div className="text-lg  font-bold  flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar className="size-8 hover:cursor-pointer hover:opacity-80 transition-all">
                  <AvatarImage
                    src={user?.avatar || ''}
                    alt={user?.username || ''}
                  />
                  <AvatarFallback className="text-xs font-semibold">
                    {getInitials(user?.username || '')}
                  </AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start">
                <DropdownMenuItem
                  className="text-xs cursor-pointer"
                  onClick={() => setUser(null)}
                >
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <span>Chats</span>
          </div>
          <div className="flex gap-2">
            <Button
              variant="ghost"
              size="sm"
              className="flex-1 rounded-full aspect-square size-4  !p-4 bg-primary-foreground"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            >
              <Sun className="size-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute size-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="flex-1 rounded-full aspect-square size-4  !p-4 bg-primary-foreground"
              onClick={() => setIsNewChatDialogOpen(true)}
            >
              <Plus className=" size-4 " />
            </Button>
            {/* <Button
              variant="ghost"
              size="sm"
              className="flex-1 rounded-full aspect-square size-4  !p-4 bg-primary-foreground"
            >
              <Users className="  " />
            </Button> */}
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
        {userConversations?.map((conversation) => (
          <Conversation
            key={conversation.id}
            conversation={conversation}
            isActive={activeConversationId === conversation.id}
            onSelect={onConversationSelect}
          />
        ))}
      </div>
    </div>
  );
};
