// src/main.tsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './App'
import DashBoard from '../src/pages/DashBoardPage'
import CryptoMarketPage from '../src/pages/CryptoMarketPage'
import './index.css' 



const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/", 
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