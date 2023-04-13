import { Login } from '@/types/login.types';
import storage from '@/utils/storage';

import http from '../http.common';
const token = storage.getToken();
const getUserObjectByEmailOrName = (emailOrNumber: string) => {
  return http.get(`auth/otp/${emailOrNumber}`);
};
const getAboutUs = (language: string) => {
  return http.get(`aboutus/${language}/aboutus`);
};
const getRegistrationForm = (language: string, formLayout: string) => {
  return http.get(`form/${language}/${formLayout}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};
const createUser = (user: any) => {
  return http.post(`users/createuser`, user);
};
const getUserAndPassword = (user: Login) => {
  return http.post(`auth/login/`, user);
};
const LoginService = {
  getUserObjectByEmailOrName,
  getAboutUs,
  getRegistrationForm,
  createUser,
  getUserAndPassword,
};

export default LoginService;
