import { Children, useState } from "react";
import "./App.css";
import { Auth } from './Authorization/auth.jsx';
import { Home } from './Home/home.jsx';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ProfileSetup from "./Home/User Profile/settingUserProfile.jsx";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Auth key={"auth"} />,
    },
    {
      path: "Home",
      element: <Home key={"home"} />,
    },
    {
      path: "Home/profileSetup",
      element: <ProfileSetup key={"profileSetup"}/>
    }
  ]);

  return (

      <RouterProvider router={router} key="main-router" />

  );
}

export default App;
