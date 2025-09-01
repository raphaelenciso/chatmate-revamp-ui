import { useEffect, useCallback } from 'react';
import { io, Socket } from 'socket.io-client';
import { toast } from 'sonner';

import { API_URL } from '@/lib/config';
import { useSocketStore } from '@/stores/socketStore';
import { useAuthStore } from '@/stores/authStore';
import { useConversationsStore } from '../stores/conversationsStore';
import type { IConversation } from '../types/IConversation';

// Socket event constants - Best practice to avoid typos and ensure consistency
const SOCKET_EVENTS = {
  CONNECT: 'connect',
  CONNECT_ERROR: 'connect_error',
  DISCONNECT: 'disconnect',
  TOKEN_REFRESHED: 'token_refreshed',
  USER_ONLINE: 'user-online',
  USER_OFFLINE: 'user-offline',
} as const;

// Error messages constants
const ERROR_MESSAGES = {
  INVALID_ACCESS_TOKEN: 'invalid access token',
  CONNECTION_FAILED: 'Connection failed',
  WEBSOCKET_CONNECTED: 'Websocket connected',
  CONNECTION_ERROR: 'Connection Error: ',
} as const;

/**
 * Helper function to update user online status in conversations
 * Optimized to minimize data processing and improve performance
 */
const updateUserOnlineStatus = (
  currentConversations: IConversation[],
  userId: string,
  isOnline: boolean
): IConversation[] => {
  if (!currentConversations?.length || !userId) {
    console.warn('Invalid parameters for updating user status:', {
      userId,
      conversationsLength: currentConversations?.length,
    });
    return currentConversations;
  }

  console.log(`User ${userId} is now ${isOnline ? 'online' : 'offline'}`);

  // Early return if no conversations contain this user
  const hasUserInConversations = currentConversations.some((conversation) =>
    conversation.participants.some((participant) => participant.id === userId)
  );

  if (!hasUserInConversations) {
    console.log(`No conversations found for user: ${userId}`);
    return currentConversations;
  }

  // Update only conversations that contain the user
  return currentConversations.map((conversation: IConversation) => {
    const participantIndex = conversation.participants.findIndex(
      (participant) => participant.id === userId
    );

    if (participantIndex === -1) return conversation;

    const updatedParticipants = [...conversation.participants];
    updatedParticipants[participantIndex] = {
      ...updatedParticipants[participantIndex],
      isOnline,
    };

    return {
      ...conversation,
      participants: updatedParticipants,
    };
  });
};

/**
 * Interface for socket event handlers
 */
interface SocketEventHandlers {
  onConnect: () => void;
  onConnectError: (error: Error) => void;
  onDisconnect: (reason: string) => void;
  onTokenRefreshed: () => void;
  onUserOnline: (userId: string) => void;
  onUserOffline: (userId: string) => void;
}

/**
 * Custom hook to manage socket connection lifecycle
 * Implements Socket.IO best practices for client-side management
 * Features: Event constants, proper error handling, optimized cleanup
 */
export const useSocket = () => {
  const socket = useSocketStore((state) => state.socket);
  const setSocket = useSocketStore((state) => state.setSocket);
  const user = useAuthStore((state) => state.user);
  const setUser = useAuthStore((state) => state.setUser);
  const setUserConversations = useConversationsStore(
    (state) => state.setUserConversations
  );

  // Memoized event handlers to prevent unnecessary re-renders
  const createEventHandlers = useCallback(
    (): SocketEventHandlers => ({
      onConnect: () => {
        console.log('Socket connected successfully');
        toast.success(ERROR_MESSAGES.WEBSOCKET_CONNECTED);
      },

      onConnectError: (error: Error) => {
        console.error('Socket connection error:', {
          message: error.message,
          timestamp: new Date().toISOString(),
        });

        toast.error(`${ERROR_MESSAGES.CONNECTION_ERROR}${error.message}`);

        // Handle authentication errors
        if (error.message === ERROR_MESSAGES.INVALID_ACCESS_TOKEN) {
          console.warn('Invalid access token detected, clearing user session');
          setUser(null);
        }
      },

      onDisconnect: (reason: string) => {
        console.log('Socket disconnected:', {
          reason,
          timestamp: new Date().toISOString(),
        });

        // Only show toast for unexpected disconnections
        if (reason !== 'io client disconnect') {
          toast.warning(`Connection lost: ${reason}`);
        }
      },

      onTokenRefreshed: () => {
        console.log('Authentication tokens refreshed successfully');
      },

      onUserOnline: (userId: string) => {
        if (!userId) {
          console.warn('Received user-online event with invalid userId');
          return;
        }

        console.log('User came online:', userId);
        setUserConversations((currentConversations: IConversation[]) =>
          updateUserOnlineStatus(currentConversations, userId, true)
        );
      },

      onUserOffline: (userId: string) => {
        if (!userId) {
          console.warn('Received user-offline event with invalid userId');
          return;
        }

        console.log('User went offline:', userId);
        setUserConversations((currentConversations: IConversation[]) =>
          updateUserOnlineStatus(currentConversations, userId, false)
        );
      },
    }),
    [setUser, setUserConversations]
  );

  // Socket connection management with enhanced error handling
  useEffect(() => {
    // Early return if user is not authenticated
    if (!user?.accessToken) {
      console.log('User not authenticated, skipping socket connection');
      return;
    }

    console.log('Initializing socket connection...');

    // Create socket with optimized configuration
    const newSocket: Socket = io(API_URL, {
      auth: {
        accessToken: user.accessToken,
        refreshToken: user.refreshToken,
      },
      // Timeout configuration
      timeout: 20_000,
      // Auto-connect
      autoConnect: true,
    });

    const handlers = createEventHandlers();

    // Register all event handlers using constants
    newSocket.on(SOCKET_EVENTS.CONNECT, () => {
      handlers.onConnect();
      setSocket(newSocket);
    });

    newSocket.on(SOCKET_EVENTS.CONNECT_ERROR, handlers.onConnectError);
    newSocket.on(SOCKET_EVENTS.DISCONNECT, handlers.onDisconnect);
    newSocket.on(SOCKET_EVENTS.TOKEN_REFRESHED, handlers.onTokenRefreshed);
    newSocket.on(SOCKET_EVENTS.USER_ONLINE, handlers.onUserOnline);
    newSocket.on(SOCKET_EVENTS.USER_OFFLINE, handlers.onUserOffline);

    // Enhanced cleanup function
    return () => {
      console.log('Cleaning up socket connection...');

      // Remove all event listeners to prevent memory leaks
      newSocket.off(SOCKET_EVENTS.CONNECT);
      newSocket.off(SOCKET_EVENTS.CONNECT_ERROR);
      newSocket.off(SOCKET_EVENTS.DISCONNECT);
      newSocket.off(SOCKET_EVENTS.TOKEN_REFRESHED);
      newSocket.off(SOCKET_EVENTS.USER_ONLINE);
      newSocket.off(SOCKET_EVENTS.USER_OFFLINE);

      // Disconnect and clear from store
      newSocket.disconnect();
      setSocket(null);

      console.log('Socket cleanup completed');
    };
  }, [user?.accessToken, user?.refreshToken, setSocket, createEventHandlers]);

  // Socket health monitoring (optional enhancement)
  useEffect(() => {
    if (!socket) return;

    const pingInterval = setInterval(() => {
      if (socket.connected) {
        socket.emit('ping');
      }
    }, 30_000); // Ping every 30 seconds

    return () => {
      clearInterval(pingInterval);
    };
  }, [socket]);

  return {
    socket,
    isConnected: socket?.connected ?? false,
  };
};
