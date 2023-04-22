import {
  createContext,
  useState,
  useEffect,
  ReactNode,
  SetStateAction,
} from "react";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import axios from "axios";
import { api } from "../services/api";

export const AdminProvider = {};
// useEffect(() => {
//   const token = localStorage.getItem("@cinimaDb:Token");

//   if (token) {
//     api.defaults.headers.common["Authorization"] = token;
//   }
//   api
//     .get("/users")
//     .then((res) => {
//       setListaDeProfissionais(res.data);
//     })
//     .catch((err) => console.log(err));

//   api
//     .get("/db")
//     .then((res) => setComentario(res.data.reviews))
//     .catch((err) => console.error(err));

//   api
//     .get("https://horasvitais.herokuapp.com/medics")
//     .then((res) => setMeusMedicos(res.data))
//     .catch((err) => console.log(err));
// }, [meusMedicos]);
/* ============================================ */
