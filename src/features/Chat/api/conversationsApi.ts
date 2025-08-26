import { useAxios } from '@/hooks/useAxios';
import type {
  IPostConversationPayload,
  IGetConversationResponse,
} from '../types/IConversation';

export const useConversationsApi = () => {
  const { POST, GET } = useAxios();

  const postConversation = async (payload: IPostConversationPayload) => {
    const response = await POST({
      url: '/api/conversations',
      data: payload,
    });
    return response.data;
  };

  const getConversations = async () => {
    const response = await GET<IGetConversationResponse>({
      url: '/api/conversations',
    });
    return response.data;
  };

  return { postConversation, getConversations };
};
