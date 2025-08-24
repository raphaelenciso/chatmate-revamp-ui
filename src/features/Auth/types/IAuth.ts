export interface ILoginPayload {
  usernameoremail: string;
  password: string;
}

export interface IRegisterPayload {
  username: string;
  email: string;
  password: string;
}

// API Response types
export interface IAuthResponse {
  id: string;
  username: string;
  email: string;
  avatar?: string;
  role: string;
  access_token: string;
  refresh_token: string;
}

export interface IApiError {
  server_response: string;
  message?: string;
}
