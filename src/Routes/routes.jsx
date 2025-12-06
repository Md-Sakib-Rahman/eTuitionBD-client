import { createBrowserRouter } from "react-router";
import RootLayout from "../Layouts/RootLayout";
import Home from "../Pages/Home/Home";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        path: "/",
        element: <Home/>,
      },
    ],
  },
]);
export default router;
