import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import reportWebVitals from "./reportWebVitals";
import { ContextProvider } from "./contexts/contextLogin";
import { ToastContainer } from "react-toastify";
import "./styles/index.css";
import "./styles/tailwind.css";

import { GlobalStyle } from "./styles/global";
import AppMain, { AdminMain } from "./App";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <GlobalStyle />
      <ToastContainer />
      <ContextProvider>
        <AdminMain></AdminMain>
      </ContextProvider>
      <AppMain></AppMain>
    </BrowserRouter>
  </React.StrictMode>
);
reportWebVitals();
