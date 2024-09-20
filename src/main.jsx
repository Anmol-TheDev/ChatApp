import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Auth } from './Authorization/auth.jsx';
import { Home } from './Home/home.jsx';
import { GoogleOAuthProvider } from '@react-oauth/google';
  // const key = import.meta.env.VITE_google_Oauth_Clint_Id;
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
  console.log(import.meta.env.VITE_google_Oauth_Clint_Id)
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}>
    <GoogleOAuthProvider clientId='1037626474008-ati0s8fbhvq11utnkgorgiaioc8n41q3.apps.googleusercontent.com'>
    <App />
    </GoogleOAuthProvider>
    </RouterProvider>
  </StrictMode>
)
