import type { IUserContact } from '../types/IUserContact';
import { generateUserAvatarUrl } from '@/utils/avatarUtils';

export const mockContacts: IUserContact[] = [
  {
    id: 'ai-assistant',
    username: 'AI Assistant',
    email: 'ai@assistant.com',
    avatar: generateUserAvatarUrl('ai-assistant', 'bottts'),
    // lastMessage: "I'm here to help you!",
    // isAI: true,
  },
  {
    id: 'contact1',
    username: 'Alice Johnson',
    email: 'alice@example.com',
    avatar: generateUserAvatarUrl('alice@example.com', 'lorelei'),
  },
  {
    id: 'contact2',
    username: 'Bob Smith',
    email: 'bob@example.com',
    avatar: generateUserAvatarUrl('bob@example.com', 'lorelei'),
  },
];
