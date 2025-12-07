import { createBrowserRouter } from "react-router";
import RootLayout from "../Layouts/RootLayout";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Auth/Login/Login";
import Register from "../Pages/Auth/Register/Register";
import StudentDashboardLayout from "../Layouts/StudentDashboardLayout";
import StudentOverView from "../Pages/Dashboard/student-dashboard/StudentOverView";
import StudentUpdateProfile from "../Pages/Dashboard/student-dashboard/StudentUpdateProfile";
import StudentDashboardRoutes from "./StudentDashboardRoutes";
import TutorDashboardLayout from "../Layouts/TutorDashboardLayout";
import TutorDashboardRoutes from "./TutorDashboardRoutes";
import TutorOverView from "../Pages/Dashboard/tutor-dashboard/TutorOverView";
import TutorUpdateProfile from "../Pages/Dashboard/tutor-dashboard/TutorUpdateProfile";

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
    element: <StudentDashboardRoutes><StudentDashboardLayout/></StudentDashboardRoutes>,
    
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
  },
  {
    path: "/tutor-dashboard",
    element: <TutorDashboardRoutes><TutorDashboardLayout/></TutorDashboardRoutes>,
    children: [
      {
        path: "/tutor-dashboard",
        element: <TutorOverView/>,
      },
      {
        path: "/tutor-dashboard/profile",
        element: <TutorUpdateProfile/>,
      }
    ],
    
  }
]);
export default router;
