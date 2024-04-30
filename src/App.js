import React from "react";
import { ToastContainer } from "react-toastify";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./pages/Login/Login";
import Home from "./pages/Home/Home";
import LandPage from "./pages/LandPage/LandPage";
import Cadastrar from "./pages/Cadastrar/Cadastrar";
import Calendario from "./pages/Calendario/Calendario";
import Projetos from "./pages/Projetos/Projetos";
import Config from "./pages/Config/Config";
import "@fontsource/montserrat";
import Sidebar from "./Componets/Sidebar/Sidebar";
import "./App.css";
import Header from "./Componets/Header/Header";

function App() {
  const router = createBrowserRouter([
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/",
      element: <LandPage />,
    },
    {
      path: "/cadastrar",
      element: <Cadastrar />,
    },
    {
      path: "/home",
      element: <Home />,
    },
    {
      path: "/calendario",
      element: <Calendario />,
    },
    {
      path: "/projetos",
      element: <Projetos />,
    },
    {
      path: "/config",
      element: <Config />,
    },
  ]);

  return (
    <div className="container">
      <Sidebar />
      <div className="appContainer">
        <Header />
        <div className="pages">
          <RouterProvider router={router} />
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default App;
