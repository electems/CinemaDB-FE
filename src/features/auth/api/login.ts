import { axios } from '@/lib/axios';

import { UserResponse } from '../types';

export type LoginCredentialsDTO = {
  username: string;
  password: string;
};

export const loginWithEmailAndPassword = (data: LoginCredentialsDTO): any => {
  return axios.post('auth/login', data);
};
