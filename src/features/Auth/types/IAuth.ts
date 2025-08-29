import type { IResponse } from '@/types/IResponse';
import type { IUser } from '@/types/IUser';

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
  data: IUser;
}

export interface IApiError {
  server_response: string;
  message?: string;
}
