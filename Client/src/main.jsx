import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App';
import './index.css'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Auth } from './Authorization/auth.jsx';
import { Home } from './Home/home.jsx';
import ProfileInput from './Home/User Profile/settingUserProfile';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { ThemeProvider } from './components/ui/themeProvider.jsx';
  const oAuthClient = import.meta.env.VITE_google_Oauth_Clint_Id;
  const router = createBrowserRouter([ 
    {
      path: "/",
      element: <Auth />,
    },
    {
      path: "Home",
      element: <Home />,
    },
    {
      path:"profileSetup",
      element: <ProfileInput/>
    }
  ]);
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme" >
    <GoogleOAuthProvider clientId={oAuthClient}>
    <RouterProvider router={router}>
    <App />
    </RouterProvider>
    </GoogleOAuthProvider>
    </ThemeProvider>
  </StrictMode>
)
