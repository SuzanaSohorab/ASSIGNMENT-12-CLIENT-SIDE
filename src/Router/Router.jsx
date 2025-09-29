import { createBrowserRouter } from "react-router-dom";
import RootLayouts from "../Layouts/RootLayouts";
import Home from "../Pages/Home/Home";
import AuthLayout from "../Layouts/AuthLayout";
import Login from "../Pages/Authentication/Login/Login";
import Registration from "../Pages/Authentication/Registration/Registration";

import PrivateRoutes from "../Routes/PrivateRoutes";
import Dashboard from "../Pages/UserDashBoard/Dashboard";
import MyProfile from "../Pages/UserDashBoard/MyProfile";
import AddPost from "../Pages/UserDashBoard/AddPost";
import MyPosts from "../Pages/UserDashBoard/MyPosts";
import PostDetails from "../Pages/PostDetails/PostDetails";
import MembershipPage from "../Pages/MemberShips/MembershipPage";

export const router = createBrowserRouter([
  // Public routes
  {
    path: "/",
    Component: RootLayouts,
    children: [
      { index: true, Component: Home} ,
       { path: "post/:_id", Component: PostDetails },

        
      
    ],
  },
  {
    path: "/",
    Component: AuthLayout,
    children: [
      { path: "login", Component: Login },
      { path: "register", Component: Registration },
    ],
  },

  {
    path:"dashboard",
    element: <PrivateRoutes><Dashboard></Dashboard></PrivateRoutes> ,
    children:[
          { index: true, Component: MyProfile }, 
          { path: "my-profile", Component: MyProfile },
          { path: "add-post", Component: AddPost },
          { path: "my-post", Component: MyPosts },
          { path: "membership", Component: MembershipPage },
    ]
  },
  //   {
  //   path: "dashboard",
  //   Component: (
  //     <PrivateRoutes>
  //       <Dashboard />
  //     </PrivateRoutes>
  //   ),
  //   children: [
  //     { index: true, Component: MyProfile} , // default page
  //     { path: "my-profile", Component: MyProfile} ,
  //     { path: "add-post", Component: AddPost },
  //     { path: "my-post", Component: MyPosts },
  //   ],
  // },
  // Private Dashboard routes
  // {
  //   element: <PrivateRoutes />, 
  //   children: [
  //     {
  //       path: "dashboard",
  //       element: Dashboard,
  //       children: [
  //         { index: true, element: MyProfile }, // default page
  //         { path: "my-profile", element: MyProfile },
  //         { path: "add-post", element: AddPost },
  //         { path: "my-post", element: MyPosts },
  //       ],
  //     },
  //   ],
  // },
]);
