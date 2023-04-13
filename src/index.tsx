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

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement,
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
  </React.StrictMode>,
);
reportWebVitals();
