import { lazyImport } from '@/utils/lazyImport';

const { LoginRoutes } = lazyImport(() => import('@/features/film'), 'LoginRoutes');

const { AuthRoutes } = lazyImport(() => import('@/features/auth'), 'AuthRoutes');
export const publicRoutes = [
  {
    path: '/admin/*',
    element: <AuthRoutes />,
  },
  {
    path: '/login/*',
    element: <LoginRoutes />,
  },
];
