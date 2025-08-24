import { useAxios } from '@/hooks/useAxios';
import type { IUserGetPayload, IUserGetResponse } from '../types/IUsers';

// Auth API functions
export const useUsersApi = () => {
  const { GET } = useAxios();

  const getUsers = async (payload?: IUserGetPayload) => {
    const res = await GET<IUserGetResponse>({
      url: '/api/users',
      params: payload,
    });
    return res.data;
  };

  return {
    getUsers,
  };
};
