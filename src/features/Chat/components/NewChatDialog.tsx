/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Search, Loader2 } from 'lucide-react';
import { useUsersApi } from '../api/usersApi';
import { getInitials } from '../utils/stringHelpers';
import type { IUser } from '@/types/IUser';
import type { IConversation } from '../types/IConversation';

interface NewChatDialogProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  onUserSelect: (conversation: IConversation) => void;
}

export const NewChatDialog = ({
  isOpen,
  setIsOpen,
  onUserSelect,
}: NewChatDialogProps) => {
  const { getUsers } = useUsersApi();
  const [searchQuery, setSearchQuery] = useState('');
  const [users, setUsers] = useState<IUser[]>([]);
  const [loading, setLoading] = useState(false);

  // Search users when query changes
  useEffect(() => {
    const searchUsers = async () => {
      if (!searchQuery.trim()) {
        setUsers([]);
        return;
      }

      setLoading(true);
      try {
        const response = await getUsers({
          username: searchQuery,
          excludeSelf: true,
        });
        console.log(response);
        setUsers(response.data.users || []);
      } catch (error) {
        console.error('Error searching users:', error);
        setUsers([]);
      } finally {
        setLoading(false);
      }
    };

    searchUsers();
  }, [searchQuery]);

  const handleUserSelect = (user: IUser) => {
    onUserSelect({
      id: user.id,
      participants: [
        {
          id: user.id,
          avatar: user.avatar,
          username: user.username,
          isOnline: false,
          lastSeen: new Date(),
        },
      ],
      lastMessage: {
        content: '',
        readyBy: [],
        sender: user,
      },
    });
    setIsOpen(false);
    setSearchQuery('');
    setUsers([]);
  };

  const handleOpenChange = (newOpen: boolean) => {
    if (!newOpen) {
      setIsOpen(false);
      setSearchQuery('');
      setUsers([]);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Start New Chat</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Search Input */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search users by username..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
              autoFocus
            />
          </div>

          {/* Search Results */}
          <div className="max-h-60 overflow-y-auto space-y-1">
            {loading && (
              <div className="flex items-center justify-center py-4">
                <Loader2 className="h-4 w-4 animate-spin" />
                <span className="ml-2 text-sm text-muted-foreground">
                  Searching...
                </span>
              </div>
            )}

            {!loading && searchQuery && users.length === 0 && (
              <div className="text-center py-4 text-sm text-muted-foreground">
                No users found
              </div>
            )}

            {!loading && !searchQuery && (
              <div className="text-center py-4 text-sm text-muted-foreground">
                Type to search for users
              </div>
            )}

            {!loading &&
              users.map((user) => (
                <Button
                  key={user.id}
                  variant="ghost"
                  className="w-full justify-start p-3 h-auto"
                  onClick={() => handleUserSelect(user)}
                >
                  <Avatar className="h-8 w-8 mr-3">
                    <AvatarImage src={user.avatar} alt={user.username} />
                    <AvatarFallback className="text-xs">
                      {getInitials(user.username)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col items-start">
                    <span className="font-medium">{user.username}</span>
                    <span className="text-xs text-muted-foreground">
                      {user.email}
                    </span>
                  </div>
                </Button>
              ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
