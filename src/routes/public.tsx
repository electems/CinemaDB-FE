import { lazyImport } from '@/utils/lazyImport';

const { LoginRoutes } = lazyImport(() => import('@/features/film'), 'LoginRoutes');

const { OttRoutes } = lazyImport(() => import('@/features/film'), 'OttRoutes');

const { PublicRoutes } = lazyImport(() => import('@/features/film'), 'PublicRoutes');

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
  {
    path: '/*',
    element: <PublicRoutes />,
  },
  {
    path: '/cinema/*',
    element: <OttRoutes />,
  },
];
