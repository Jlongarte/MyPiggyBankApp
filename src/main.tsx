// src/main.tsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './App'
import DashBoard from '../src/pages/DashBoardPage'
import CryptoMarketPage from '../src/pages/CryptoMarketPage'
import './index.css' 
import ServicesPage from './pages/ServicesPage'
import Register from './pages/Register'
import Login from './pages/Login'
import Home from './pages/Home'



const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/", 
        element: <Home />
      },
      {
        path: "dashboard", 
        element: <DashBoard />
      },
      {
        path: "crypto", 
        element: <CryptoMarketPage />
      },
      {
        path: "services", 
        element: <ServicesPage />
      },
      {
        path: "register", 
        element: <Register />
      },
      {
        path: "login", 
        element: <Login />
      }
    ]
  }
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)