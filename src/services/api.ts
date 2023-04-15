import axios from "axios";
import { toast } from "react-toastify";
import { environment } from "../config/environment";
export const api = axios.create({
  baseURL: environment.baseUrl,
  headers: {
    Authorization: `Bearer ${localStorage.getItem("@cinimaDb:Token")}`,
    "Content-type": "application/json",
  },
});
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === 500) {
      toast.error(`Internal Server Error`, {
        position: "top-center",
        autoClose: false,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: 0,
      });
    }
    if (error.response.status === 401) {
      window.location.href = environment.redirectUrl;
    }
  }
);
