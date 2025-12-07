import React, { useContext } from "react";
import Logo from "../../../assets/Logo.png";
import { Link } from "react-router";
import ThemeContoller from "./themecontroller/ThemeContoller";
import { ThemeContext } from "../../../Context/ThemeContextProvide";
import { AuthContext } from "../../../Context/AuthContextProvider";


const Navbar = () => {
  const { userData, logout, setUserData, loader } = useContext(AuthContext);
  const { theme } = useContext(ThemeContext);
  if(loader){
    return <div className="min-h-screen flex justify-center items-center"><span className="loading loading-spinner"></span></div>;
  }
  let dashboardLink="/";
  if(userData){
    if(userData.role ==="student"){
     dashboardLink="/student-dashboard";
  }
  else if (userData.role === "tutor") {
     dashboardLink="/tutor-dashboard";
  }
  }
  
  
  const navlinks = ["Home", "Tuitions", "Tutors", "About", "Contact"];
  const LogUserOut = () => {
    logout().then(() => {
      console.log("logged user Out");
      setUserData(null);
    });
  };

  return (
    <div
      className={`navbar max-md:px-4  shadow-sm  ${
        theme == "black-purple" ? "bg-gray-900" : "bg-white"
      } rounded-2xl px-10 w-[90%] mx-auto fixed top-0 right-0 left-0 mt-2 z-10`}
    >
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {" "}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />{" "}
            </svg>
          </div>
          <ul
            tabIndex="-1"
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            {navlinks.map((link, index) => {
              return (
                <li key={index}>
                  {" "}
                  <Link>{link} </Link>
                </li>
              );
            })}
          </ul>
        </div>
        <Link to="/">
          <img className="w-[40px]  " src={Logo} alt="" />
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 ">
          {navlinks.map((link, index) => {
            return (
              <li key={index} className="rounded-xl hover:bg-primary  mx-2">
                {" "}
                <Link>{link} </Link>
              </li>
            );
          })}
        </ul>
      </div>
      <div className="navbar-end flex items-center gap-4">
        <ThemeContoller />
        {loader ? (
          <button className="btn btn-primary">
            <span className="loading loading-spinner"></span>
          </button>
        ) : userData ? (
          <div className="dropdown dropdown-end">
            {/* Clickable Image Trigger */}
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full border-2 border-accent">
                <img
                  alt="User Profile"
                  src={
                    userData?.photoURL ||
                    "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                  }
                />
              </div>
            </div>

            {/* Dropdown Menu */}
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              <li>
                <h2>{userData.displayName}</h2>
              </li>
              <li>
                <Link to={dashboardLink} className="justify-between">
                  Dashboard
                  <span className="badge">New</span>
                </Link>
              </li>
              <li>
                <Link to="/profile">Profile</Link>
              </li>
              <li>
                {/* Ensure you have extracted 'logout' from your AuthContext */}
                <button onClick={LogUserOut} className="btn text-red-400">
                  Logout
                </button>
              </li>
            </ul>
          </div>
        ) : (
          <Link to="/login" className="btn btn-primary max-md:btn-sm">
            Login
          </Link>
        )}
        
      </div>
    </div>
  );
};

export default Navbar;
