import type { IUser } from '@/types/IUser';

export interface IUserContact extends IUser {
  id: string;
  name: string;
  email: string;
  avatar: string;
  status: 'online' | 'away' | 'busy' | 'offline';
  lastMessage?: string;
  unreadCount?: number;
  lastSeen?: string;
  isAI?: boolean;
}
