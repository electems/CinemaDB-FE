import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import GlobalStyle from "./styles/global";
import reportWebVitals from "./reportWebVitals";
import { ContextProvider } from "./contexts/contextLogin";
import { ProfissionalProvider } from "./Providers/contextProfissional";
import { ToastContainer } from "react-toastify";
import { PerfilProfissionalProvider } from "./Providers/contextPerfilProfissional";
import App from "./App";
import "./styles/index.css";
import "./styles/tailwind.css";
import axios from "axios";

axios.interceptors.request.use(
  (req) => {
    // Add configurations here
    return req;
  },
  (err) => {
    return Promise.reject(err);
  }
);
axios.interceptors.response.use(
  (res) => {
    // Add configurations here
    if (res.status === 201) {
      console.log("Posted Successfully");
    }
    return res;
  },
  (err) => {
    return Promise.reject(err);
  }
);
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ContextProvider>
        <GlobalStyle />
        <ToastContainer />
        <ProfissionalProvider>
          <PerfilProfissionalProvider>
            <App></App>
          </PerfilProfissionalProvider>
        </ProfissionalProvider>
      </ContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);
reportWebVitals();
