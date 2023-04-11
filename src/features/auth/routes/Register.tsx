import { useNavigate } from 'react-router-dom';

import { GeneralLayout } from '@/components/Layout/GeneralLayout';

import { RegisterForm } from '../components/RegisterForm';

export const Register = () => {
  const navigate = useNavigate();

  return (
    <GeneralLayout title="Register your account">
      <RegisterForm onSuccess={() => navigate('/app')} />
    </GeneralLayout>
  );
};
