import { useRoutes } from "react-router-dom";
import SignIn from "../pages/auth/SignIn";
import SignUp from "../pages/auth/SignUp";
import DefaultLayout from "../components/Layout/DefaultLayout/DefaultLayout";
import Error from "../pages/Error404";
import AdminLayout from "../components/Layout/AdminLayout/AdminLayout";
import Dashboard from "../pages/admin/Dashboard";
import Product from "../pages/product";
import Home from "../pages/home";
import Cart from "../pages/cart";
import Contact from "../pages/contact";
import CheckOut from "../pages/check-out";

const routes = [
  {
    path: "/",
    element: <DefaultLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "product",
        element: <Product />
      },
      {
        path: "cart",
        element: <Cart />
      },
      {
        path: "contact",
        element: <Contact />
      },
      {
        path: "check-out",
        element: <CheckOut />
      }
    ],
  },
  {
    path: "/sign-in",
    element: <SignIn />,
  },
  {
    path: "/sign-up",
    element: <SignUp />,
  },
  {
    path: "*",
    element: <Error />,
  },

  // Private Router
  // {
  //   path: "/admin",
  //   element: <AdminLayout />,
  //   children: [
  //     {
  //       index: true,
  //       element: <Dashboard />
  //     }
  //   ]
  // }
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
    ],
  },
];

export default function AllRoute() {
  const router = useRoutes(routes);
  return <>{router}</>;
}
