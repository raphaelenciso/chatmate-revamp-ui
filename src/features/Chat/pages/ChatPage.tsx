import { useState, useEffect } from 'react';

import { ChatSidebar } from '../components/ChatSidebar/ChatSidebar';
import { ChatWindow } from '../components/ChatWindow';
import { toast } from 'sonner';

import type { IContact } from '../types/IContact';
import { mockContacts } from '../constants/contacts';
import useAuthStore from '@/stores/authStore';

interface Message {
  id: string;
  content: string;
  senderId: string;
  timestamp: Date;
  type: 'text' | 'image' | 'file';
}

export const ChatPage = () => {
  const { user, setUser } = useAuthStore();

  const [contacts, setContacts] = useState<IContact[]>([]);
  const [activeContact, setActiveContact] = useState<IContact | undefined>();
  const [messages, setMessages] = useState<{ [contactId: string]: Message[] }>(
    {}
  );

  // Initialize mock data
  useEffect(() => {
    setContacts(mockContacts);

    // Mock initial messages
    const mockMessages: { [contactId: string]: Message[] } = {
      'ai-assistant': [
        {
          id: 'ai1',
          content:
            "Hello! I'm your AI assistant. I'm here to help you with any questions you might have. How can I assist you today?",
          senderId: 'ai-assistant',
          timestamp: new Date(Date.now() - 3_600_000), // 1 hour ago
          type: 'text',
        },
      ],
      contact1: [
        {
          id: 'msg1',
          content: 'Hey! How are you doing?',
          senderId: 'contact1',
          timestamp: new Date(Date.now() - 1_800_000), // 30 min ago
          type: 'text',
        },
        {
          id: 'msg2',
          content:
            "I'm doing great! Just working on some new projects. How about you?",
          senderId: user?.id || 'current-user',
          timestamp: new Date(Date.now() - 1_700_000), // 28 min ago
          type: 'text',
        },
        {
          id: 'msg3',
          content:
            "That sounds exciting! I'd love to hear more about it sometime.",
          senderId: 'contact1',
          timestamp: new Date(Date.now() - 300_000), // 5 min ago
          type: 'text',
        },
      ],
      contact2: [
        {
          id: 'msg4',
          content: "Let's catch up later!",
          senderId: 'contact2',
          timestamp: new Date(Date.now() - 3_600_000), // 1 hour ago
          type: 'text',
        },
      ],
    };

    setMessages(mockMessages);
  }, [user?.id]);

  // const handleLogin = (userData: User) => {
  //   setUser(userData);
  //   toast.success(`Signed in as ${userData.name}`);
  // };

  const handleLogout = () => {
    setUser(null);
    setActiveContact(undefined);
    setMessages({});

    toast.success('You have been successfully signed out.');
  };

  const handleContactSelect = (contact: IContact) => {
    setActiveContact(contact);
    // Mark messages as read
    if (contact.unreadCount) {
      setContacts((prev) =>
        prev.map((c) => (c.id === contact.id ? { ...c, unreadCount: 0 } : c))
      );
    }
  };

  const handleSendMessage = (
    content: string,
    type: 'text' | 'image' | 'file' = 'text'
  ) => {
    if (!user || !activeContact) return;

    const newMessage: Message = {
      id: `msg_${Date.now()}`,
      content,
      senderId: user.id,
      timestamp: new Date(),
      type,
    };

    setMessages((prev) => ({
      ...prev,
      [activeContact.id]: [...(prev[activeContact.id] || []), newMessage],
    }));

    // Update contact's last message
    setContacts((prev) =>
      prev.map((c) =>
        c.id === activeContact.id ? { ...c, lastMessage: content } : c
      )
    );
  };

  // const handleEndCall = () => {
  //   setCallState({ isActive: false, status: 'ended' });
  //   toast({
  //     title: 'Call ended',
  //     description: 'The call has been ended.',
  //   });
  // };

  // If in a call, show call window
  // if (callState.isActive && callState.contact) {
  //   return (
  //     <CallWindow
  //       contact={callState.contact}
  //       callType={callState.type || 'voice'}
  //       callStatus={callState.status}
  //       onEndCall={handleEndCall}
  //     />
  //   );
  // }

  // Main messaging interface
  return (
    <div className="h-screen max-h-screen flex gap-2 bg-muted p-3 overflow-hidden ">
      <ChatSidebar
        user={
          user || {
            id: '',
            name: '',
            email: '',
            avatar: '',
          }
        }
        contacts={contacts}
        activeContactId={activeContact?.id}
        onContactSelect={handleContactSelect}
        onLogout={handleLogout}
        className="flex-1 rounded-xl bg-background overflow-hidden"
      />

      <ChatWindow
        contact={activeContact}
        messages={messages[activeContact?.id || ''] || []}
        currentUserId={user?.id || ''}
        onSendMessage={handleSendMessage}
        className="flex-[3] rounded-xl bg-background overflow-hidden"
      />
    </div>
  );
};
