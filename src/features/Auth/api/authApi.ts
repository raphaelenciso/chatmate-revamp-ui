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
    return POST<IAuthResponse>({
      url: '/api/auth/register',
      data: payload,
    });
  };

  const login = async (payload: ILoginPayload) => {
    return POST<IAuthResponse>({
      url: '/api/auth/login',
      data: payload,
    });
  };

  return {
    register,
    login,
  };
};
