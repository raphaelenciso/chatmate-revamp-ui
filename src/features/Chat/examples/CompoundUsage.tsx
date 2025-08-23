import { Chat } from '../components/Chat';
import type { IContact } from '../types/IContact';
import type { IMessage } from '../types/IChat';

// Example usage of the compound Chat component

/**
 * Basic usage - All components with context
 */
export const BasicChatExample = ({
  contact,
  messages,
  currentUserId,
  onSendMessage,
}: {
  contact: IContact;
  messages: IMessage[];
  currentUserId: string;
  onSendMessage: (message: string) => void;
}) => {
  return (
    <Chat
      contact={contact}
      messages={messages}
      currentUserId={currentUserId}
      onSendMessage={onSendMessage}
    >
      <Chat.Header />
      <Chat.Messages />
      <Chat.Input />
    </Chat>
  );
};

/**
 * Custom header with actions
 */
export const ChatWithCustomHeader = ({
  contact,
  messages,
  currentUserId,
  onSendMessage,
}: {
  contact: IContact;
  messages: IMessage[];
  currentUserId: string;
  onSendMessage: (message: string) => void;
}) => {
  const handleMoreClick = () => {
    console.log('More options clicked');
  };

  return (
    <Chat
      contact={contact}
      messages={messages}
      currentUserId={currentUserId}
      onSendMessage={onSendMessage}
    >
      <Chat.Header onMoreClick={handleMoreClick} />
      <Chat.Messages />
      <Chat.Input />
    </Chat>
  );
};

/**
 * Input without emoji picker
 */
export const ChatWithoutEmojis = ({
  contact,
  messages,
  currentUserId,
  onSendMessage,
}: {
  contact: IContact;
  messages: IMessage[];
  currentUserId: string;
  onSendMessage: (message: string) => void;
}) => {
  return (
    <Chat
      contact={contact}
      messages={messages}
      currentUserId={currentUserId}
      onSendMessage={onSendMessage}
    >
      <Chat.Header />
      <Chat.Messages />
      <Chat.Input showEmojiPicker={false} />
    </Chat>
  );
};

/**
 * Standalone components (without compound pattern)
 */
export const StandaloneComponents = () => {
  const contact: IContact = {
    id: '1',
    name: 'John Doe',
    avatar: '/avatar.jpg',
    status: 'online',
  };

  const handleSend = (message: string) => {
    console.log('Sending:', message);
  };

  return (
    <div className="space-y-4">
      {/* Standalone Header */}
      <Chat.Header contact={contact} />

      {/* Standalone Input */}
      <Chat.Input onSend={handleSend} placeholder="Type your message..." />
    </div>
  );
};
