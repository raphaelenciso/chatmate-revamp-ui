export interface IContact {
  id: string;
  name: string;
  avatar: string;
  status: 'online' | 'away' | 'busy' | 'offline';
  lastMessage?: string;
  unreadCount?: number;
  lastSeen?: string;
  isAI?: boolean;
}
