import { useState } from "react";
import "./App.css";
import { Auth } from "./Authorization/auth";
import { Home } from "./Home/home";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

function App() {
  const router = createBrowserRouter([
    {
      path: "Auth",
      element: <Auth />,
    },
    {
      path: "Home",
      element: <Home />,
    },
  ]);

  return (
    <RouterProvider router={router}>
      <Auth />
    </RouterProvider>
  );
}

export default App;
