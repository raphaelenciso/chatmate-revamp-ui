import type { IMessage } from '../types/IMessage';

// Mock initial messages
export const mockMessages: { [contactId: string]: IMessage[] } = {
  'ai-assistant': [
    {
      id: 'ai1',
      content:
        "Hello! I'm your AI assistant. I'm here to help you with any questions you might have. How can I assist you today?",
      senderId: 'ai-assistant',
      role: 'bot',
      contentType: 'text',
      timestamp: new Date(Date.now() - 3_600_000).toISOString(), // 1 hour ago
    },
  ],
  contact1: [
    {
      id: 'msg1',
      content: 'Hey! How are you doing?',
      senderId: 'contact1',
      role: 'user',
      contentType: 'text',
      timestamp: new Date(Date.now() - 1_800_000).toISOString(), // 30 min ago
    },
    {
      id: 'msg2',
      content:
        "I'm doing great! Just working on some new projects. How about you?",
      senderId: '1',
      role: 'user',
      contentType: 'text',
      timestamp: new Date(Date.now() - 1_700_000).toISOString(), // 28 min ago
    },
    {
      id: 'msg3',
      content: "That sounds exciting! I'd love to hear more about it sometime.",
      senderId: 'contact1',
      role: 'user',
      contentType: 'text',
      timestamp: new Date(Date.now() - 300_000).toISOString(), // 5 min ago
    },
  ],
  contact2: [
    {
      id: 'msg4',
      content: "Let's catch up later!",
      senderId: 'contact2',
      role: 'user',
      contentType: 'text',
      timestamp: new Date(Date.now() - 3_600_000).toISOString(), // 1 hour ago
    },
  ],
};
