/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import { useNavigate } from 'react-router-dom';

import { AuthUser } from '@/features/auth';
import storage from '@/utils/storage';

export const SelectPreferenceForm: React.FC = () => {
  const navigate = useNavigate();

  const storeUserPreference = (type: string) => {
    const user: AuthUser = {
      type: type,
      id: '',
      email: '',
      firstName: '',
      lastName: '',
      bio: '',
      role: 'ADMIN',
    };
    storage.setUser(user);
    navigate('/login/step2');
  };

  return (
    <>
      <div className="bg-white_A700 font-montserrat h-[1012px] mx-auto p-10 sm:px-5 relative w-full">
        <button onClick={() => storeUserPreference('PERSON')} title="Film Person">
          Film Person
        </button>
        <br></br>
        <button onClick={() => storeUserPreference('LOVER')} type="button" title="Film Lover">
          Film Lover
        </button>
      </div>
    </>
  );
};
