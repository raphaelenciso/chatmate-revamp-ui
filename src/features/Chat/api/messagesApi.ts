import { useAxios } from '@/hooks/useAxios';

import type {
  IGetMessagesByConversationIdResponse,
  IPostMessagePayload,
  IPostMessageResponse,
} from '../types/IMessage';

export const useMessagesApi = () => {
  const { GET, POST } = useAxios();

  const postMessage = async (payload: IPostMessagePayload) => {
    const response = await POST<IPostMessageResponse>({
      url: '/api/messages',
      data: payload,
    });
    return response.data;
  };

  const getMessagesByConversationId = async (conversationId: string) => {
    const response = await GET<IGetMessagesByConversationIdResponse>({
      url: `/api/messages/${conversationId}`,
    });
    return response.data;
  };

  return { postMessage, getMessagesByConversationId };
};
