import type { IUserContact } from '../types/IUserContact';

export const mockContacts: IUserContact[] = [
  {
    id: 'ai-assistant',
    username: 'AI Assistant',
    email: 'ai@assistant.com',
    avatar:
      'https://api.dicebear.com/7.x/bottts/svg?seed=ai&backgroundColor=e28743',
    // lastMessage: "I'm here to help you!",
    // isAI: true,
  },
  {
    id: 'contact1',
    username: 'Alice Johnson',
    email: 'alice@example.com',
    avatar:
      'https://api.dicebear.com/7.x/avataaars/svg?seed=Valentina&backgroundColor=b6e3f4',
  },
  {
    id: 'contact2',
    username: 'Bob Smith',
    email: 'bob@example.com',
    avatar:
      'https://api.dicebear.com/7.x/avataaars/svg?seed=Mason&backgroundColor=c0aede',
  },
];
