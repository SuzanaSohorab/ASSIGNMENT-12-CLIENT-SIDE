
import { createBrowserRouter } from "react-router";
import RootLayouts from "../Layouts/RootLayouts";
import Home from "../Pages/Home/Home";
import AuthLayout from "../Layouts/AuthLayout";
import Login from "../Pages/Authentication/Login/Login";
import Registration from "../Pages/Authentication/Registration/Registration";


export const router = createBrowserRouter([
  {
    path: "/",
    Component:RootLayouts,
    children:[
      {
        index: true,
        Component:Home
      }
    ]
  
  },
  {
    path:'/',
    Component:AuthLayout,
    children:[
      {
        path:'login',
        Component:Login,

      },
      {
        path:'register',
        Component:Registration,

      },
    ]

  }
]);