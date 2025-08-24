import axios from 'axios';
import { toast } from 'sonner';
import type { IUser } from '@/types/IUser';
import type { AxiosResponse } from 'axios';
import type { IAxios } from '@/types/IAxios';
import { API_URL } from '@/lib/config';
import { useAuthStore } from '@/stores/authStore';

// Routes that should not show toast errors
const ROUTES_WITHOUT_TOAST = new Set(['/api/auth/login', '/api/auth/register']);

// Check if route should be excluded from toast errors
const shouldExcludeFromToast = (url: string): boolean => {
  return ROUTES_WITHOUT_TOAST.has(url);
};

export const useAxios = () => {
  const instance = axios.create({
    baseURL: API_URL,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  instance.interceptors.request.use(
    (request) => {
      const { user, isAuthenticated } = useAuthStore.getState();
      if (isAuthenticated) {
        request.headers.Authorization = `Bearer ${user?.accessToken}`;
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
            refresh_token: user?.refreshToken,
          });

          setUser({
            ...(user as IUser),
            accessToken: data.accessToken as string,
            refreshToken: data?.refreshToken as string,
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

      // Only show toast error if route is not excluded
      if (!shouldExcludeFromToast(error.config?.url || '')) {
        toast.error(
          error.response?.data?.server_response || error.response?.data?.message
        );
      }
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
