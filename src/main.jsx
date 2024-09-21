import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Auth } from './Authorization/auth.jsx';
import { Home } from './Home/home.jsx';
import { GoogleOAuthProvider } from '@react-oauth/google';
  const key = import.meta.env.VITE_google_Oauth_Clint_Id;
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Auth />,
    },
    {
      path: "Home",
      element: <Home />,
    },
  ]);
createRoot(document.getElementById('root')).render(
    <GoogleOAuthProvider clientId={key}>
  <StrictMode>
    <RouterProvider router={router}>
    <App />
    </RouterProvider>
  </StrictMode>
    </GoogleOAuthProvider>
)
