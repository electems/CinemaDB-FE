import { GeneralLayout } from '@/components/Layout/GeneralLayout';

import { LoginRegisterForm } from '../component/LoginRegisterForm';

export const LoginRegister = () => {
  return (
    <GeneralLayout title="Login/Register">
      <LoginRegisterForm />
    </GeneralLayout>
  );
};
