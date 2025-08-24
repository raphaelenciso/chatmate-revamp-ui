import { useState } from 'react';

import { ChatSidebar } from '../components/ChatSidebar/ChatSidebar';
import { ChatWindow } from '../components/ChatWindow';

import type { IUserContact } from '../types/IUserContact';
import type { IMessage } from '../types/IMessage';
import { mockContacts } from '../constants/contacts';
import { useAuthStore } from '@/stores/authStore';
import { mockMessages } from '../constants/messages';
import { cn } from '@/lib/utils';
import { NewChatDialog } from '../components/NewChatDialog';

export const ChatPage = () => {
  const { user } = useAuthStore();

  const [userContacts, setUserContacts] =
    useState<IUserContact[]>(mockContacts);
  const [activeContact, setActiveContact] = useState<
    IUserContact | undefined
  >();
  const [messages, setMessages] = useState<{ [contactId: string]: IMessage[] }>(
    mockMessages
  );
  const [isNewChatDialogOpen, setIsNewChatDialogOpen] = useState(false);

  const handleContactSelect = (userContact: IUserContact) => {
    setActiveContact(userContact);
    // Mark messages as read
    // if (userContact.unreadCount) {
    //   setUserContacts((prev) =>
    //     prev.map((c) =>
    //       c.id === userContact.id ? { ...c, unreadCount: 0 } : c
    //     )
    //   );
    // }
  };

  const handleOnUserSelect = (userContact: IUserContact) => {
    // Check if contact already exists
    const existingContact = userContacts.find((c) => c.id === userContact.id);

    if (existingContact) {
      // If contact exists, just select it
      setActiveContact(existingContact);
    } else {
      // Add new contact to the list
      setUserContacts((prev) => [userContact, ...prev]);
      setActiveContact(userContact);

      // // Initialize empty messages for this contact
      setMessages((prev) => ({
        ...prev,
        [userContact.id]: [],
      }));
    }
  };

  const handleSendMessage = (
    content: string,
    contentType: 'text' | 'image' = 'text'
  ) => {
    if (!user || !activeContact) return;

    const newMessage: IMessage = {
      id: `msg_${Date.now()}`,
      content,
      senderId: user.id,
      role: 'user',
      contentType,
      timestamp: new Date().toISOString(),
    };

    setMessages((prev) => ({
      ...prev,
      [activeContact.id]: [...(prev[activeContact.id] || []), newMessage],
    }));

    // Update contact's last message
    setUserContacts((prev) =>
      prev.map((c) =>
        c.id === activeContact.id ? { ...c, lastMessage: content } : c
      )
    );
  };

  return (
    <div className="h-screen max-h-screen flex gap-2 bg-muted p-3 overflow-hidden ">
      <ChatSidebar
        userContacts={userContacts}
        activeContactId={activeContact?.id}
        onContactSelect={handleContactSelect}
        setIsNewChatDialogOpen={setIsNewChatDialogOpen}
        className={cn(
          'flex-1 rounded-xl bg-background overflow-hidden',
          !!activeContact?.id && 'hidden sm:flex'
        )}
      />

      <ChatWindow
        userContact={activeContact}
        messages={messages[activeContact?.id || ''] || []}
        currentUserId={user?.id || ''}
        onSendMessage={handleSendMessage}
        onBackClick={() => setActiveContact(undefined)}
        className={cn(
          'flex-[3] rounded-xl bg-background overflow-hidden',
          !activeContact?.id && 'hidden sm:block'
        )}
      />

      {/* New Chat Dialog */}
      <NewChatDialog
        isOpen={isNewChatDialogOpen}
        setIsOpen={setIsNewChatDialogOpen}
        onUserSelect={handleOnUserSelect}
      />
    </div>
  );
};
