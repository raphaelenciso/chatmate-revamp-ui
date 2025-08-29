import { useAxios } from '@/hooks/useAxios';

import type { IPostMessagePayload } from '../types/IMessage';

export const useMessagesApi = () => {
  const { GET, POST } = useAxios();

  const postMessage = async (payload: IPostMessagePayload) => {
    const response = await POST({
      url: '/api/messages',
      data: payload,
    });
    return response.data;
  };

  const getMessages = async (conversationId: string) => {
    const response = await GET({
      url: `/api/messages/${conversationId}`,
    });
    return response.data;
  };

  return { postMessage, getMessages };
};
