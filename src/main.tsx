import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './App'
import PublicLayout from './layouts/PublicLayout'
import Login from './pages/Login'
import './index.css'
import RegisterPage from './pages/RegisterPage/RegisterPage'
import Services from './pages/Services/Services'
import DashBoardPage from './pages/Dashboardpage/DashBoardPage'
import CryptoMarketPage from './pages/Crypto/CryptoMarketPage'
import Home from './pages/HomePage/Home'

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
            element: <Services />
          },
          {
            path: "login",
            element: <Login />
          },
          {
            path: "register",
            element: <RegisterPage />
          }
        ]
      },
      // RUTAS SIN NAVBAR (Panel de control / Privadas)
      {
        path: "dashboard",
        element: <DashBoardPage />
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