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

import AdminDashboard from "../Pages/UserDashBoard/Admindashboard/AdminDashboard";
import ManageUsers from "../Pages/UserDashBoard/ManageUsers";
import AdminProfile from "../Pages/UserDashBoard/Admindashboard/AdminProfile";
import UserDashboard from "../Pages/UserDashBoard/UserDashboard";
import Reports from "../Pages/UserDashBoard/Admindashboard/Reports";
import Announcement from "../Pages/UserDashBoard/Admindashboard/Announcement";
import ShowAnnouncement from "../ShowAnnouncement/ShowAnnouncement";
import AllComments from "../Pages/AllComments/CommentsPage";
import CommentsPage from "../Pages/AllComments/CommentsPage";
import Payment from "../Pages/UserDashBoard/Payment";

export const router = createBrowserRouter([
  // Public routes
  {
    path: "/",
    Component: RootLayouts,
    children: [
      { index: true, Component: Home} ,
       { path: "post/:_id", Component: PostDetails },
       { path: "show-announcement", Component: ShowAnnouncement }

        
      
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
  path: "/dashboard",
  element: <PrivateRoutes><UserDashboard /></PrivateRoutes>,
  children: [
    { index: true, element: <MyProfile /> },
    { path: "my-profile", element: <MyProfile /> },
    { path: "add-post", element: <AddPost /> },
    { path: "my-post", element: <MyPosts /> },
    { path: "membership", element: <MembershipPage /> },
    { path: "comments/:postId", element: < CommentsPage/> },
    { path: "membership/payment/:paymentId", element: < Payment/> },

    // Admin-only routes
    
    { path: "manage-users", element: <ManageUsers /> },
    { path: "reported-comments", element: <Reports></Reports> },
    { path: "announcement", element: <Announcement /> },
  ]
}


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
