import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Theme store with persistence
const useThemeStore = create(
  persist<{
    theme: 'light' | 'dark' | 'system';
    setTheme: (theme: 'light' | 'dark' | 'system') => void;
  }>(
    (set) => ({
      theme: 'system',
      setTheme: (theme) => set({ theme }),
    }),
    {
      name: 'theme-storage', // unique name for localStorage key
    }
  )
);

export default useThemeStore;
