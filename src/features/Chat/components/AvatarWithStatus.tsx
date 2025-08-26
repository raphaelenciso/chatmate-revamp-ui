import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Bot } from 'lucide-react';
import { getInitials } from '../utils/stringHelpers';
import { cn } from '@/lib/utils';

interface AvatarWithStatusProps {
  avatar: string;
  name: string;
  isOnline?: boolean;
  isAI?: boolean;
  className?: string;
}

const AvatarWithStatus = ({
  avatar,
  name,
  isOnline,
  isAI,
  className,
}: AvatarWithStatusProps) => {
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
          className={`absolute bottom-0 right-0 size-3 ${isOnline ? 'bg-green-500' : 'bg-red-500'} rounded-full`}
        />
      )}
    </div>
  );
};
export default AvatarWithStatus;
