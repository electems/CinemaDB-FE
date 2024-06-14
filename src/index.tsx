import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import reportWebVitals from './reportWebVitals'
import { ContextProvider } from './contexts/contextLogin'
import { ToastContainer } from 'react-toastify'
// import './styles/index.css'
// import './styles/tailwind.css'
// import './styles/font.css'

import { GlobalStyle } from './styles/global'
import AppMain, { AdminMain } from './App'
import './chap8/index.css'
import App from './chap8/App'


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
)
root.render(
  <BrowserRouter>
    {/* <GlobalStyle />
    <ToastContainer />
    <ContextProvider>
      <AdminMain></AdminMain>
    </ContextProvider>
    <AppMain></AppMain> */}
    <App/>
  </BrowserRouter>
)
reportWebVitals()
