import { create } from 'zustand';
import { type IUser } from '@/types/IUser';

interface AuthStore {
  user: IUser | null;
  setUser: (user: IUser | null) => void;
}

const useAuthStore = create<AuthStore>((set) => ({
  user: {
    id: '1',
    name: 'John Doe',
    email: 'john.doe@example.com',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=john',
  },
  setUser: (user) => set({ user }),
}));

export default useAuthStore;
