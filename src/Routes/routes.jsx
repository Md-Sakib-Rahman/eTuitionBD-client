import { createBrowserRouter } from "react-router";
import RootLayout from "../Layouts/RootLayout";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Auth/Login/Login";
import Register from "../Pages/Auth/Register/Register";
import StudentDashboardLayout from "../Layouts/StudentDashboardLayout";
import StudentOverView from "../Pages/Dashboard/student-dashboard/StudentOverView";
import StudentUpdateProfile from "../Pages/Dashboard/student-dashboard/StudentUpdateProfile";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        path: "/",
        element: <Home/>,
      },
      {
        path: "/login",
        element: <Login/>,
      },
      {
        path: "/register",
        element: <Register/>,
      },
    ],
  },
  {
    path: "/student-dashboard",
    element: <StudentDashboardLayout/>,
    
    children: [
      {
        path: "/student-dashboard",
        element: <StudentOverView/>,
      },
      {
        path: "/student-dashboard/profile",
        element: <StudentUpdateProfile/>,
      },
    ],
  }
]);
export default router;
