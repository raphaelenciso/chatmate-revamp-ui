/**
 * Compound Chat Components
 *
 * These are the smaller, reusable components that make up the Chat compound component.
 * They work together through React Context to provide a seamless chat experience.
 */

export { Chat } from './Chat';
export { ChatHeader } from './ChatHeader';
export { ChatMessage } from './ChatMessage';
export { ChatMessages } from './ChatMessages';
export { MessageInput } from './MessageInput';
export { TypingIndicator } from './TypingIndicator';
export { ChatProvider, useChatContext } from './ChatContext';
