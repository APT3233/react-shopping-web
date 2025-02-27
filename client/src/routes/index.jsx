import { useRoutes } from "react-router-dom";
import SignIn from "../pages/auth/SignIn";
import SignUp from "../pages/auth/SignUp";
import DefaultLayout from "../components/Layout/DefaultLayout";
import Error from "../pages/Error404";
import AdminLayout from "../components/Layout/AdminLayout/AdminLayout";
import Dashboard from "../pages/admin/Dashboard";


const routes = [
  {
    path: "/",
    element: <DefaultLayout />
  },
  {
    path: "/sign-in",
    element: <SignIn />
  },
  {
    path: "/sign-up",
    element: <SignUp />
  },
  {
    path: "*",
    element: <Error />
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
        element: <Dashboard />
      }
    ]
  },
 

]


export default function AllRoute() {
  const router = useRoutes(routes)
  return <>{router}</>
}