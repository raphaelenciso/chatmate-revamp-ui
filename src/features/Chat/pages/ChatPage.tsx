import { useEffect, useState } from 'react';

import { ChatSidebar } from '../components/ChatSidebar/ChatSidebar';
import { ChatWindow } from '../components/ChatWindow';

import type { IMessage } from '../types/IMessage';

import { useAuthStore } from '@/stores/authStore';
import { mockMessages } from '../constants/messages';
import { cn } from '@/lib/utils';
import { NewChatDialog } from '../components/NewChatDialog';
import { useSocket } from '../hooks/useSocket';

import { useMessagesApi } from '../api/messagesApi';
import { useConversationsApi } from '../api/conversationsApi';
import type { IConversation } from '../types/IConversation';
import { useConversationsStore } from '../stores/conversationsStore';

export const ChatPage = () => {
  const [activeConversation, setActiveConversation] = useState<
    IConversation | undefined
  >();
  const [messages, setMessages] = useState<{ [contactId: string]: IMessage[] }>(
    mockMessages
  );
  const [isNewChatDialogOpen, setIsNewChatDialogOpen] = useState(false);

  const { postConversation, getConversations } = useConversationsApi();
  const { postMessage } = useMessagesApi();

  const { socket } = useSocket();
  const user = useAuthStore((state) => state.user);
  const userConversations = useConversationsStore(
    (state) => state.userConversations
  );
  const setUserConversations = useConversationsStore(
    (state) => state.setUserConversations
  );

  const handleConversationSelect = (conversation: IConversation) => {
    setActiveConversation(conversation);
    // Mark messages as read
    // if (userContact.unreadCount) {
    //   setUserContacts((prev) =>
    //     prev.map((c) =>
    //       c.id === userContact.id ? { ...c, unreadCount: 0 } : c
    //     )
    //   );
    // }
  };

  const handleOnConversationSelect = (conversation: IConversation) => {
    // Check if contact already exists
    const existingContact = userConversations?.find(
      (c) => c.id === conversation.id
    );

    if (existingContact) {
      // If contact exists, just select it
      setActiveConversation(existingContact);
    } else {
      // Temporary add to the conversations list
      setUserConversations([conversation, ...(userConversations || [])]);
      setActiveConversation(conversation);

      // // Initialize empty messages for this contact
      setMessages((prev) => ({
        ...prev,
        [conversation.id]: [],
      }));
    }
  };

  const handleSendMessage = async (content: string) => {
    if (!user || !activeConversation) return;

    if (!activeConversation.id) {
      await postConversation({
        participants: [user?.id, activeConversation.id],
      });
    }

    await postMessage({
      conversation: activeConversation.id,
      sender: user.id,
      content,
    });

    // If it does, get the conversation id
    // Then send the message

    // const newMessage: IMessage = {
    //   id: `msg_${Date.now()}`,
    //   content,
    //   sender: 'user',
    //   conversation: null,
    //   readBy: [],
    //   timestamp: new Date().toISOString(),
    // };

    // setMessages((prev) => ({
    //   ...prev,
    //   [activeContact.id]: [...(prev[activeContact.id] || []), newMessage],
    // }));

    // // Update contact's last message
    // setUserContacts((prev) =>
    //   prev.map((c) =>
    //     c.id === activeContact.id ? { ...c, lastMessage: content } : c
    //   )
    // );
  };

  useEffect(() => {
    const fetchConversations = async () => {
      const conversations = await getConversations();
      // console.log(conversations[0].participants[0]);
      setUserConversations(conversations);
    };

    if (!socket) return;
    fetchConversations();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socket]);

  if (!socket) return <div>Loading...</div>;

  return (
    <div className="h-screen max-h-screen flex gap-2 bg-muted p-3 overflow-hidden ">
      <ChatSidebar
        userConversations={userConversations}
        activeConversationId={activeConversation?.id}
        onConversationSelect={handleConversationSelect}
        setIsNewChatDialogOpen={setIsNewChatDialogOpen}
        className={cn(
          'flex-1 rounded-xl bg-background overflow-hidden',
          !!activeConversation?.id && 'hidden sm:flex'
        )}
      />

      <ChatWindow
        conversation={activeConversation}
        messages={messages[activeConversation?.id || ''] || []}
        currentUserId={user?.id || ''}
        onSendMessage={handleSendMessage}
        onBackClick={() => setActiveConversation(undefined)}
        className={cn(
          'flex-[3] rounded-xl bg-background overflow-hidden',
          !activeConversation?.id && 'hidden sm:block'
        )}
      />

      {/* New Chat Dialog */}
      <NewChatDialog
        isOpen={isNewChatDialogOpen}
        setIsOpen={setIsNewChatDialogOpen}
        onUserSelect={handleOnConversationSelect}
      />
    </div>
  );
};
