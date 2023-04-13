import axios from "axios";

export const api = axios.create({
  baseURL: "https://horasvitais.herokuapp.com",
  timeout: 5000,
});
