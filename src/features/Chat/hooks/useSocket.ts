import { useEffect } from 'react';
import { io } from 'socket.io-client';
import { toast } from 'sonner';

import { API_URL } from '@/lib/config';
import { useSocketStore } from '@/stores/socketStore';
import { useAuthStore } from '@/stores/authStore';
import { useConversationsStore } from '../stores/conversationsStore';
import type { IConversation } from '../types/IConversation';

/**
 * Custom hook to manage socket connection lifecycle
 * Handles connection, disconnection, error handling, and token refresh
 */
export const useSocket = () => {
  const socket = useSocketStore((state) => state.socket);
  const setSocket = useSocketStore((state) => state.setSocket);
  const user = useAuthStore((state) => state.user);
  const setUser = useAuthStore((state) => state.setUser);
  const setUserConversations = useConversationsStore(
    (state) => state.setUserConversations
  );

  useEffect(() => {
    // Don't connect if user is not authenticated
    if (!user?.accessToken) return;

    // Create new socket connection
    const newSocket = io(API_URL, {
      auth: {
        accessToken: user.accessToken,
        refreshToken: user.refreshToken,
      },
    });

    // Handle successful connection
    newSocket.on('connect', () => {
      toast.success('Websocket connected');
      setSocket(newSocket);
    });

    // Handle connection errors
    newSocket.on('connect_error', (error) => {
      console.error('Socket connection error:', error.message);
      toast.error('Connection Error: ' + error.message);
      if (error.message === 'invalid access token') {
        setUser(null);
      }
    });

    // Handle token refresh events
    newSocket.on('token_refreshed', () => {
      console.log('Tokens refreshed');
    });

    newSocket.on('user-online', (userId: string) => {
      console.log('User online:', userId);

      // Use callback function to get current state
      setUserConversations((currentConversations: IConversation[]) => {
        console.log(
          'Current conversations when user comes online:',
          currentConversations
        );

        const conversationsToUpdate = currentConversations?.filter(
          (conversation: IConversation) =>
            conversation.participants.some(
              (participant) => participant.id === userId
            )
        );

        if (!conversationsToUpdate?.length) {
          console.log('No conversations found for user:', userId);
          return currentConversations;
        }

        console.log(
          'Updating conversations for online user:',
          userId,
          conversationsToUpdate
        );

        return currentConversations.map((conversation: IConversation) => {
          const hasParticipant = conversation.participants.some(
            (participant) => participant.id === userId
          );

          if (!hasParticipant) return conversation;

          return {
            ...conversation,
            participants: conversation.participants.map((participant) =>
              participant.id === userId
                ? { ...participant, isOnline: true }
                : participant
            ),
          };
        });
      });
    });

    newSocket.on('user-offline', (userId: string) => {
      console.log('User offline:', userId);

      // Use callback function to get current state
      setUserConversations((currentConversations: IConversation[]) => {
        console.log(
          'Current conversations when user goes offline:',
          currentConversations
        );

        const conversationsToUpdate = currentConversations?.filter(
          (conversation: IConversation) =>
            conversation.participants.some(
              (participant) => participant.id === userId
            )
        );

        if (!conversationsToUpdate?.length) {
          console.log('No conversations found for user:', userId);
          return currentConversations;
        }

        console.log(
          'Updating conversations for offline user:',
          userId,
          conversationsToUpdate
        );

        return currentConversations.map((conversation: IConversation) => {
          const hasParticipant = conversation.participants.some(
            (participant) => participant.id === userId
          );

          if (!hasParticipant) return conversation;

          return {
            ...conversation,
            participants: conversation.participants.map((participant) =>
              participant.id === userId
                ? { ...participant, isOnline: false }
                : participant
            ),
          };
        });
      });
    });

    // Cleanup function - disconnect socket and clear from store
    return () => {
      newSocket.disconnect();
      setSocket(null);
    };
  }, [
    user?.accessToken,
    user?.refreshToken,
    setSocket,
    setUser,
    setUserConversations,
  ]);

  return { socket };
};
