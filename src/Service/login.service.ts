import http from '../http.common';

const getUserObjectByEmailOrName = (emailOrNumber: string) => {
  return http.get(`users/otp/${emailOrNumber}`);
};
const getAboutUs = (language: string) => {
  return http.get(`/aboutus/${language}/aboutus`);
};
const LoginService = {
  getUserObjectByEmailOrName,
  getAboutUs,
};

export default LoginService;
