import { useEffect, useState } from 'react';

import { ChatSidebar } from '../components/ChatSidebar/ChatSidebar';
import { ChatWindow } from '../components/ChatWindow';

import type { IMessage } from '../types/IMessage';

import { useAuthStore } from '@/stores/authStore';
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
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [isNewChatDialogOpen, setIsNewChatDialogOpen] = useState(false);

  const { postConversation, getConversations } = useConversationsApi();
  const { postMessage, getMessagesByConversationId } = useMessagesApi();

  const { socket } = useSocket();
  const currentUser = useAuthStore((state) => state.user);
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

  const handleOnConversationSelect = async (conversation: IConversation) => {
    // Check if contact already exists
    // TODO: userconversation should paginated and this should be check on all users conversations
    let existingContact: IConversation | undefined;

    // Ensure userConversations is always an array
    const currentConversations = userConversations || [];

    if (currentConversations.length > 0) {
      existingContact = currentConversations.find(
        (c) => c.id === conversation.id
      );
    }

    console.log(existingContact);

    if (existingContact) {
      // If contact exists, just select it
      setActiveConversation(existingContact);
      const messages = await getMessagesByConversationId(existingContact.id);
      console.log(messages);
      setMessages(messages.data);
    } else {
      // Temporary add to the conversations list
      setUserConversations([conversation, ...currentConversations]);
      setActiveConversation(conversation);
      setMessages([]);
    }
  };

  const handleSendMessage = async (content: string) => {
    if (!currentUser || !activeConversation) return;

    if (activeConversation.id.includes('temporary')) {
      const response = await postConversation({
        participants: [activeConversation.participants[0].id, currentUser?.id],
        lastMessage: {
          content,
          sender: currentUser.id,
        },
      });
      setActiveConversation(response.data);
    } else {
      const response = await postMessage({
        conversation: activeConversation.id,
        sender: currentUser.id,
        content,
      });
      setMessages((prev) => [...prev, response.data]);
      // setUserConversations(
      //   (prev) =>
      //     prev.map((c) =>
      //       c.id === activeConversation.id ? { ...c, lastMessage: content } : c
      //     ) as IConversation[]
      // );
    }

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
  };

  useEffect(() => {
    const fetchConversations = async () => {
      try {
        const response = await getConversations();
        // Ensure we're setting an array
        const conversations = response?.data || [];

        setUserConversations(conversations);
      } catch (error) {
        console.error('Error fetching conversations:', error);
        setUserConversations([]);
      }
    };

    if (!socket) return;
    fetchConversations();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socket]);

  if (!socket) return <div>Loading...</div>;

  return (
    <div className="h-screen max-h-screen flex gap-2 bg-muted p-3 overflow-hidden ">
      <ChatSidebar
        userConversations={userConversations || []}
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
        messages={messages}
        currentUserId={currentUser?.id || ''}
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
