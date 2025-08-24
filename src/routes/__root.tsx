import useThemeStore from '@/stores/themeStore';
import { createRootRoute, Outlet, useNavigate } from '@tanstack/react-router';
import { useEffect } from 'react';

import { useAuthStore } from '@/stores/authStore';
import { Toaster } from 'sonner';
// import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';

const Root = () => {
  const theme = useThemeStore((state) => state.theme);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const navigate = useNavigate();

  // Handle authentication redirects on component mount
  useEffect(() => {
    const handleAuthRedirect = async () => {
      // Add small delay to ensure store is ready

      if (isAuthenticated) {
        // Redirect authenticated users to chat
        navigate({ to: '/chat' });
      } else {
        // Redirect unauthenticated users to login
        navigate({ to: '/login' });
      }
    };

    handleAuthRedirect();
  }, [isAuthenticated, navigate]);

  return (
    <div className={theme}>
      <Outlet />
      <Toaster richColors expand={false} />
      {/* <TanStackRouterDevtools /> */}
    </div>
  );
};

export const Route = createRootRoute({
  component: Root,
});
