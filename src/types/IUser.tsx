export interface IUser {
  id: string;
  avatar: string;
  username: string;
  email: string;
  role: 'user' | 'admin';
  isActive: boolean;
  lastSeen: string;
  isOnline: boolean;
  accessToken?: string;
  refreshToken?: string;
}
