import { useAxios } from '@/hooks/useAxios';
import type {
  IPostConversationPayload,
  IGetConversationResponse,
  IGetConversationByParticipantsIdsPayload,
  IPostConversationResponse,
} from '../types/IConversation';

export const useConversationsApi = () => {
  const { POST, GET } = useAxios();

  const postConversation = async (payload: IPostConversationPayload) => {
    const response = await POST<IPostConversationResponse>({
      url: '/api/conversations',
      data: payload,
    });
    return response.data;
  };

  const getConversations = async (
    payload?: IGetConversationByParticipantsIdsPayload
  ) => {
    const response = await GET<IGetConversationResponse>({
      url: '/api/conversations',
      params: payload,
    });
    return response.data;
  };

  const getConversationById = async (id: string) => {
    const response = await GET({
      url: `/api/conversations/${id}`,
    });
    return response.data;
  };

  return {
    postConversation,
    getConversations,
    getConversationById,
  };
};
