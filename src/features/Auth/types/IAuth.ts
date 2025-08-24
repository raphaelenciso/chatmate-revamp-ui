import type { IResponse } from '@/types/IResponse';

export interface ILoginPayload {
  usernameoremail: string;
  password: string;
}

export interface IRegisterPayload {
  username: string;
  email: string;
  password: string;
  avatar?: string;
}

// API Response types
export interface IAuthResponse extends IResponse {
  data: {
    id: string;
    username: string;
    email: string;
    avatar: string;
    role: string;
    accessToken: string;
    refreshToken: string;
  };
}

export interface IApiError {
  server_response: string;
  message?: string;
}
