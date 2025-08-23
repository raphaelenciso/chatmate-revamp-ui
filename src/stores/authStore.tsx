import { create } from 'zustand';
import { type IUser } from '@/types/IUser';

interface AuthStore {
  user: IUser | null;
  setUser: (user: IUser | null) => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: {
    id: '1',
    name: 'John Doe',
    email: 'john.doe@example.com',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=john',
    role: 'user',
    access_token:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4YTliNzlkZTUyMWNiZThmYWYyODY5YSIsImVtYWlsIjoicHN5cnV6MThAZ21haWwuY29tIiwicm9sZSI6InVzZXIiLCJpYXQiOjE3NTU5NTMwNTMsImV4cCI6MTc1NjU1Nzg1M30.l-VDy15QgYQ8BTK8c46HG-oT_g7pzDg966Ap69P6EOM',
    refresh_token:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4YTliNzlkZTUyMWNiZThmYWYyODY5YSIsImVtYWlsIjoicHN5cnV6MThAZ21haWwuY29tIiwicm9sZSI6InVzZXIiLCJpYXQiOjE3NTU5NTMwNTMsImV4cCI6MTc1NjU1Nzg1M30.l-VDy15QgYQ8BTK8c46HG-oT_g7pzDg966Ap69P6EOM',
  },
  setUser: (user) => set({ user }),
}));
