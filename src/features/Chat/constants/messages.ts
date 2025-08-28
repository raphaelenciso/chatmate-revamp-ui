import type { IMessage } from '../types/IMessage';

// Mock initial messages
export const mockMessages: { [contactId: string]: IMessage[] } = {
  'ai-assistant': [
    {
      id: 'ai1',
      content:
        "Hello! I'm your AI assistant. I'm here to help you with any questions you might have. How can I assist you today?",
      sender: {
        id: 'ai-assistant',
        username: 'AI Assistant',
        avatar: 'https://via.placeholder.com/150',
        email: 'ai-assistant@example.com',
        role: 'bot',
      },
      conversation: {
        id: 'ai-assistant',
        participants: [],
        lastMessage: {
          content: '',
          readyBy: [],
          sender: { id: 'ai-assistant' },
        },
      },
      timestamp: new Date(Date.now() - 3_600_000).toISOString(), // 1 hour ago
      readBy: [],
    },
  ],
};
