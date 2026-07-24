import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './App'
import PublicLayout from './layouts/PublicLayout'

import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import ServicesPage from './pages/ServicesPage'

import DashBoard from './pages/DashBoardPage'
import CryptoMarketPage from './pages/CryptoMarketPage'

import './index.css'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      // RUTAS CON NAVBAR (Usan PublicLayout)
      {
        element: <PublicLayout />,
        children: [
          {
            path: "/",
            element: <Home />
          },
          {
            path: "services",
            element: <ServicesPage />
          },
          {
            path: "login",
            element: <Login />
          },
          {
            path: "register",
            element: <Register />
          }
        ]
      },
      // RUTAS SIN NAVBAR (Panel de control / Privadas)
      {
        path: "dashboard",
        element: <DashBoard />
      },
      {
        path: "crypto",
        element: <CryptoMarketPage />
      }
    ]
  }
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)