import axios from 'axios';
import { toast } from 'sonner';
import type { IUser } from '@/types/IUser';
import type { AxiosResponse } from 'axios';
import type { IAxios } from '@/types/IAxios';
import { API_URL } from '@/lib/config';
import { useAuthStore } from '@/stores/authStore';

// const URL_WITHOUT_TOAST = new Set(['/login']);

// const errorRoutesWithoutToast = ({
//   errorMessage,
//   status,
//   url,
// }: {
//   errorMessage: string;
//   status: number;
//   url: string;
// }) => {
//   return (
//     (status === 403 && errorMessage === 'User not registered') ||
//     (status === 404 && URL_WITHOUT_TOAST.has(url)) ||
//     errorMessage === 'No Translated Sentence Found'
//   );
// };

export const useAxios = () => {
  const instance = axios.create({
    baseURL: API_URL,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  instance.interceptors.request.use(
    (request) => {
      const { user } = useAuthStore.getState();
      if (user?.access_token) {
        request.headers.Authorization = `Bearer ${user.access_token}`;
      }

      if (request.data instanceof FormData) {
        delete request.headers['Content-Type'];
      }

      return request;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  instance.interceptors.response.use(
    (response) => {
      return response;
    },
    async (error) => {
      const { user, setUser } = useAuthStore.getState();

      // IF OFFLINE / NO INTERNET CONNECTION
      if (
        !globalThis.navigator.onLine &&
        !error.response &&
        error.code === 'ERR_NETWORK'
      ) {
        toast.error(
          'No internet connection. Please check your connection and try again.'
        );
        throw error;
      }

      // IF TOKEN EXPIRED (but not for invalid credentials/password errors)
      if (
        error.response?.status === 401 &&
        error.response.data?.server_response?.includes(
          'Invalid token signature'
        )
        // &&
        // error.config?.url !== '/api/v1/user/profile' // Don't refresh for profile update errors
      ) {
        try {
          const { data } = await axios.post(`${API_URL}/api/auth/refresh`, {
            refresh_token: user?.refresh_token,
          });

          setUser({
            ...(user as IUser),
            access_token: data.access_token as string,
            refresh_token: data?.refresh_token as string,
          });

          const originalRequest = error.config;
          originalRequest.headers.Authorization = `Bearer ${data.access_token}`;
          return await instance(originalRequest);
        } catch (refreshError) {
          toast.error('Session expired. Please login again.');
          setUser(null);
          return Promise.reject(refreshError);
        }
      }

      toast.error(error.response?.data?.server_response || error.message);
      throw error;
    }
  );

  const GET = async <R, P = unknown, B = unknown>(
    args: IAxios<P, B>
  ): Promise<AxiosResponse<R>> => {
    return instance({
      ...args,
      method: 'GET',
    });
  };

  const POST = async <R, P = unknown, B = unknown>(
    args: IAxios<P, B>
  ): Promise<AxiosResponse<R>> => {
    return instance({
      ...args,
      method: 'POST',
    });
  };

  const PUT = async <R, P = unknown, B = unknown>(
    args: IAxios<P, B>
  ): Promise<AxiosResponse<R>> => {
    return instance({
      ...args,
      method: 'PUT',
    });
  };

  const DELETE = async <R, P = unknown, B = unknown>(
    args: IAxios<P, B>
  ): Promise<AxiosResponse<R>> => {
    return instance({
      ...args,
      method: 'DELETE',
    });
  };

  return {
    instance,
    GET,
    POST,
    PUT,
    DELETE,
  };
};
