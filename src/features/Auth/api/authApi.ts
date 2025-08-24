import { useAxios } from '@/hooks/useAxios';
import type {
  ILoginPayload,
  IRegisterPayload,
  IAuthResponse,
} from '../types/IAuth';

// Auth API functions
export const useAuthApi = () => {
  const { POST } = useAxios();

  const register = async (payload: IRegisterPayload) => {
    const res = await POST<IAuthResponse>({
      url: '/api/auth/register',
      data: payload,
    });
    return res.data;
  };

  const login = async (payload: ILoginPayload) => {
    const res = await POST<IAuthResponse>({
      url: '/api/auth/login',
      data: payload,
    });
    return res.data;
  };

  return {
    register,
    login,
  };
};
