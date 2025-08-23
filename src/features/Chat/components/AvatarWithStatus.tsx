import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Bot } from 'lucide-react';
import { getInitials } from '../utils/stringHelpers';
import { cn } from '@/lib/utils';

interface AvatarWithStatusProps {
  avatar: string;
  name: string;
  status: string;
  isAI?: boolean;
  className?: string;
}

const AvatarWithStatus = ({
  avatar,
  name,
  status,
  isAI,
  className,
}: AvatarWithStatusProps) => {
  // Helper function to get status indicator color
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': {
        return 'bg-gradient-to-br from-green-400 to-green-600';
      }
      case 'away': {
        return 'bg-gradient-to-br from-yellow-400 to-yellow-600';
      }
      case 'busy': {
        return 'bg-gradient-to-br from-red-400 to-red-600';
      }
      default: {
        return 'bg-gradient-to-br from-gray-400 to-gray-600';
      }
    }
  };

  return (
    <div className="relative">
      <Avatar className={cn('h-12 w-12', className)}>
        <AvatarImage src={avatar} alt={name} />
        <AvatarFallback>{getInitials(name)}</AvatarFallback>
      </Avatar>
      {isAI ? (
        <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-accent rounded-full flex items-center justify-center">
          <Bot className="h-3 w-3 text-accent-foreground" />
        </div>
      ) : (
        <div
          className={`absolute -bottom-1 -right-1 size-3 ${getStatusColor(status)} rounded-full`}
        ></div>
      )}
    </div>
  );
};
export default AvatarWithStatus;
