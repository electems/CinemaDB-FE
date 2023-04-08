import { useNavigate } from 'react-router-dom';

import { GeneralLayout } from '@/components/Layout/GeneralLayout';

import { LoginForm } from '../components/LoginForm';

export const Login = () => {
  const navigate = useNavigate();

  return (
    <GeneralLayout title="Log in to your account">
      <LoginForm onSuccess={() => navigate('/app')} />
    </GeneralLayout>
  );
};
