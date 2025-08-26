import { useAxios } from '@/hooks/useAxios';

import type { IPostMessagePayload } from '../types/IMessage';

export const useMessagesApi = () => {
  const { POST } = useAxios();

  const postMessage = async (payload: IPostMessagePayload) => {
    const response = await POST({
      url: '/api/messages',
      data: payload,
    });
    return response.data;
  };

  return { postMessage };
};
