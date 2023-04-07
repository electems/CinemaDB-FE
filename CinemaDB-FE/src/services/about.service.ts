import axios from "axios";
import http from "http.common";

const getAll = (language) => {
  return http.get(`/aboutus/${language}/aboutus`);
};

const AboutService = {
  getAll,
};

export default AboutService;
