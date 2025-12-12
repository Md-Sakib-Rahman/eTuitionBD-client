import React from "react";
import { Link, NavLink, Outlet } from "react-router";
import ThemeController from "../Pages/Shared/Navbar/themecontroller/ThemeContoller";
import { GrOverview } from "react-icons/gr";
import { GrDocumentSound } from "react-icons/gr";
import { MdConnectWithoutContact } from "react-icons/md";
import { FaChartPie } from "react-icons/fa";
const StudentDashboardLayout = () => {
  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
       
        <nav className="navbar w-full bg-base-300">
          <label
            htmlFor="my-drawer-4"
            aria-label="open sidebar"
            className="btn btn-square btn-ghost"
          >
            
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth="2"
              fill="none"
              stroke="currentColor"
              className="my-1.5 inline-block size-4"
            >
              <path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"></path>
              <path d="M9 4v16"></path>
              <path d="M14 10l2 2l-2 2"></path>
            </svg>
          </label>
          <div className="px-4 w-full flex items-center gap-10 max-sm:gap-4">
            <h2 className="text-3xl max-sm:text-sm max-md:text-md font-bold tracking-tighter text-base-content">
              eTuition<span className="text-primary">BD</span>
            </h2>
            <div className="h-5 w-1 bg-base-content"></div>
            <h2 className="font-bold max-md:text-sm">Student Dashboard</h2>
          </div>
          <div className="navbar-end flex justify-end items-end w-full pr-10">
            <ThemeController></ThemeController>
          </div>
        </nav>
        
        <Outlet />
      </div>

      <div className="drawer-side is-drawer-close:overflow-visible">
        <label
          htmlFor="my-drawer-4"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <div className="flex min-h-full flex-col items-start bg-base-200 is-drawer-close:w-14 is-drawer-open:w-64 ">
          
          <ul className="menu w-full grow gap-2">
            
            <li>
              <Link
                to="/"
                className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                data-tip="Homepage"
              >
               
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  strokeWidth="2"
                  fill="none"
                  stroke="currentColor"
                  className="my-1.5 inline-block size-4"
                >
                  <path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"></path>
                  <path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                </svg>
                <span className="is-drawer-close:hidden">Homepage</span>
              </Link>
            </li>
            <li>
              <NavLink
                to="/student-dashboard"
                end
                className={({ isActive }) =>
                  `is-drawer-close:tooltip is-drawer-close:tooltip-right ${
                    isActive ? "bg-primary text-primary-content" : "" 
                  }`
                }
                data-tip="OverView"
              >
               
                <GrOverview />
                <span className="is-drawer-close:hidden">OverView</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/student-dashboard/studenttuitionposts"
                end
                className={({ isActive }) =>
                  `is-drawer-close:tooltip is-drawer-close:tooltip-right ${
                    isActive ? "bg-primary text-primary-content" : "" 
                  }`
                }
                data-tip="Posts"
              >
               
                <GrDocumentSound />
                <span className="is-drawer-close:hidden">Posts</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/student-dashboard/my-sessions"
                end
                className={({ isActive }) =>
                  `is-drawer-close:tooltip is-drawer-close:tooltip-right ${
                    isActive ? "bg-primary text-primary-content" : "" 
                  }`
                }
                data-tip="My Session"
              >
                
                <MdConnectWithoutContact />
                <span className="is-drawer-close:hidden">My Session</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/student-dashboard/student-report"
                end
                className={({ isActive }) =>
                  `is-drawer-close:tooltip is-drawer-close:tooltip-right ${
                    isActive ? "bg-primary text-primary-content" : "" 
                  }`
                }
                data-tip="Reports & Analytics"
              >
                
                <FaChartPie className="size-4" />
                <span className="is-drawer-close:hidden">Reports & Analytics</span>
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboardLayout;
