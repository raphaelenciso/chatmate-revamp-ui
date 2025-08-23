import { ChatPage } from '@/features/Chat';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/chat')({
  component: ChatPage,
});
