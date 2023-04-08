import http from 'http.common';

const getUserObjectByEmailOrName = (emailOrNumber) => {
  return http.get(`users/otp/${emailOrNumber}`);
};
const AboutService = {
  getUserObjectByEmailOrName,
};

export default AboutService;
