import { createBrowserRouter } from "react-router";
import MainLayout from "../../layout/MainLayout/MainLayout";
import Home from "../../components/Home/Home";
import AuthLayout from "../../layout/AuthLayout/AuthLayout";

import { Register } from "../../layout/AuthLayout/auth/Register/Register";
import { Login } from "../../layout/AuthLayout/auth/Login/Login";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    children: [
      {
        index: true,
        Component: Home,
      },
    ],
  },
  {
    path: "/auth",
    Component: AuthLayout,
    children: [
      {
        path: "login",
        Component: Login,
      },
      {
        path: "register",
        Component: Register,
      },
    ],
  },
]);
