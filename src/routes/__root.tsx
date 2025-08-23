import useThemeStore from '@/stores/themeStore';
import { createRootRoute, Outlet } from '@tanstack/react-router';
// import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';

const Root = () => {
  const theme = useThemeStore((state) => state.theme);
  return (
    <div className={theme}>
      <Outlet />
      {/* <TanStackRouterDevtools /> */}
    </div>
  );
};

export const Route = createRootRoute({
  component: Root,
});
