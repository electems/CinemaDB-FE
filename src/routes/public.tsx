import { lazyImport } from '@/utils/lazyImport';

const { LoginRoutes } = lazyImport(() => import('@/features/film'), 'LoginRoutes');

const { OttRoutes } = lazyImport(() => import('@/features/film'), 'OttRoutes');

const { FilmRoutes } = lazyImport(() => import('@/features/film'), 'FilmRoutes');

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
  {
    path: 'film*',
    element: <FilmRoutes />,
  },
];
