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
import StudentTuitionPosts from "../Pages/Dashboard/student-dashboard/StudentTuitionPosts";
import PostJob from "../Pages/Dashboard/student-dashboard/PostJob";
import PostDetails from "../Pages/ViewPostDetails/PostDetails";
import EditPost from "../Pages/Dashboard/student-dashboard/EditPost";
import Tuitions from "../Pages/TutionsPage/Tuitions";
import CommonPrivateRoutes from "./CommonPrivateRoutes";
import AdminDashboardLayout from "../Layouts/AdminDashboardLayout";
import AdminDashboardRoutes from "./AdminDashboardRoutes";
import UserManagement from "../Pages/Dashboard/admin-dashboard/UserManagement";
import AdminUserOverview from "../Pages/Dashboard/admin-dashboard/AdminUserOverview";
import TutionManagement from "../Pages/Dashboard/admin-dashboard/TutionManagement";
import AdminTuitionOverview from "../Pages/Dashboard/admin-dashboard/AdminTuitionOverview";
import MyApplications from "../Pages/Dashboard/tutor-dashboard/MyApplications";
import Payment from "../Pages/Dashboard/student-dashboard/Payment";
import PaymentSuccess from "../Pages/Dashboard/student-dashboard/PaymentSuccess";
import MySessions from "../Pages/Dashboard/student-dashboard/MySessions";
import TutorSessions from "../Pages/Dashboard/tutor-dashboard/TutorSessions";
import Reports from "../Pages/Dashboard/admin-dashboard/Reports";
import StudentReports from "../Pages/Dashboard/student-dashboard/StudentReports";
import TutorReport from "../Pages/Dashboard/tutor-dashboard/TutorReport";
import TutorsPage from "../Pages/TuitorsPage/TutorsPage";
import UnderConstruction from "../Pages/UnderConstructionPage/UnderConstruction";
import PublicTutorPage from "../Pages/PublicTutorPage/PublicTutorPage";

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
      {
        path: "/post-details/:id",
        element: <CommonPrivateRoutes> <PostDetails/> </CommonPrivateRoutes>,
      },
      {
        path: "/tuitions",
        element: <Tuitions/>,
      },
      {
        path: "/tutors",
        element: <TutorsPage/>,
      },
      {
        path: "/tutor/:id",
        element: <PublicTutorPage/>,
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
      {
        path: "/student-dashboard/studenttuitionposts",
        element: <StudentTuitionPosts/>,
      },
      {
        path: "/student-dashboard/post-job",
        element: <PostJob/>,
      },
      {
        path: "/student-dashboard/post-details/:id",
        element: <PostDetails/>,

      },
      {
        path: "/student-dashboard/edit-post/:id",
        element: <EditPost/>,

      },
      {
        path: "/student-dashboard/payment/:id",
        element: <Payment/>,

      },
      {
        path: "/student-dashboard/payment/success",
        element: <PaymentSuccess/>,

      },
      {
        path: "/student-dashboard/my-sessions",
        element: <MySessions/>,

      },
      {
        path: "/student-dashboard/student-report",
        element: <StudentReports/>,

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
      },
      {
        path: "/tutor-dashboard/my-application",
        element: <MyApplications/>,
      },
      {
        path: "/tutor-dashboard/tutor-sessions",
        element: <TutorSessions/>,
      },
      {
        path: "/tutor-dashboard/post-details/:id",
        element: <PostDetails/>,
      },
      {
        path: "/tutor-dashboard/tutor-report",
        element: <TutorReport/>,
      }
    ],
    
  },
  {
    path: "/admin-dashboard",
    element: <AdminDashboardRoutes> <AdminDashboardLayout/> </AdminDashboardRoutes>,
    children: [
      {
        path: "/admin-dashboard",
        element: <UserManagement/>,
      },
      {
        path: "/admin-dashboard/admin-user-overview/:id",
        element: <AdminUserOverview/>,
      },
      {
        path: "/admin-dashboard/tuition-management",
        element: <TutionManagement/>,
      },
      {
        path: "/admin-dashboard/admin-tuition-overview/:id",
        element: <AdminTuitionOverview/>,
      },
      {
        path: "/admin-dashboard/reports-analytics",
        element: <Reports/>,
      },
      
    ],
    
  }
]);
export default router;
