import React, { useContext, useState, useEffect } from "react";
import Logo from "../../../assets/Logo.png";
import { Link, NavLink } from "react-router";  
import ThemeContoller from "./themecontroller/ThemeContoller";
import { ThemeContext } from "../../../Context/ThemeContextProvide";
import { AuthContext } from "../../../Context/AuthContextProvider";
import { motion, AnimatePresence } from "framer-motion";
import { FaUserCircle, FaSignOutAlt, FaColumns } from "react-icons/fa";

const Navbar = () => {
  const { userData, logout, setUserData, loader } = useContext(AuthContext);
  const { theme } = useContext(ThemeContext);
  const [isScrolled, setIsScrolled] = useState(false);

  // Monitor scroll for subtle shadow transition
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const closeDropdown = () => {
    const elem = document.activeElement;
    if (elem) elem.blur();
  };

  const dashboardLink = userData?.role 
    ? `/${userData.role}-dashboard` 
    : "/";

  const navLinks = [
    { path: "/", label: "Home" },
    { path: "/tuitions", label: "Tuitions" },
    { path: "/tutors", label: "Tutors" },
    { path: "/about", label: "About" },
    { path: "/contact", label: "Contact" },
  ];

  const handleLogout = async () => {
    await logout();
    setUserData(null);
    closeDropdown();
  };

  return (
    <nav
      className={`fixed top-4 left-0 right-0 z-[100] mx-auto w-[95%] max-w-7xl transition-all duration-300
        ${isScrolled ? "top-2" : "top-4"}`}
    >
      <div 
        className={`navbar rounded-2xl px-4 md:px-8 transition-all duration-300 border border-white/10
          ${theme === "black-purple" 
            ? "bg-base-100/70 backdrop-blur-md shadow-[0_8px_32px_rgba(0,0,0,0.5)]" 
            : "bg-white/80 backdrop-blur-md shadow-lg"}`}
      >
        {/* Navbar Start */}
        <div className="navbar-start">
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost lg:hidden p-1 mr-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
              </svg>
            </label>
            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-4 z-[1] p-2 shadow-2xl bg-base-200 rounded-xl w-64 border border-white/5">
              {navLinks.map((link) => (
                <li key={link.path} onClick={closeDropdown}>
                  <NavLink to={link.path} className="py-3 font-medium">{link.label}</NavLink>
                </li>
              ))}
            </ul>
          </div>
          
          <Link to="/" className="flex items-center gap-2 group">
            <img className="w-9 md:w-10 transition-transform duration-300 group-hover:scale-110" src={Logo} alt="eTuitionBD" />
            <span className="hidden md:block font-black text-xl tracking-tighter text-base-content">
              eTuition<span className="text-primary">BD</span>
            </span>
          </Link>
        </div>

        {/* Navbar Center (Desktop) */}
        <div className="navbar-center hidden lg:flex">
          <ul className="flex items-center gap-2">
            {navLinks.map((link) => (
              <li key={link.label}>
                <NavLink
                  to={link.path}
                  end={link.path === "/"}
                  className={({ isActive }) =>
                    `relative px-4 py-2 text-sm font-bold uppercase tracking-widest transition-all duration-300
                    ${isActive 
                      ? "text-primary" 
                      : "text-base-content/60 hover:text-primary"}`
                  }
                >
                  {({ isActive }) => (
                    <>
                      {link.label}
                      {isActive && (
                        <motion.div 
                          layoutId="nav-underline"
                          className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full mx-4"
                        />
                      )}
                    </>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>

        {/* Navbar End */}
        <div className="navbar-end gap-2 md:gap-4">
          <ThemeContoller />

          {loader ? (
            <div className="w-10 h-10 flex items-center justify-center">
              <span className="loading loading-spinner loading-sm text-primary"></span>
            </div>
          ) : userData ? (
            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="btn btn-ghost btn-circle avatar online">
                <div className="w-10 rounded-full ring-2 ring-primary ring-offset-base-100 ring-offset-2">
                  <img src={userData?.photoURL || "https://i.pravatar.cc/150?u=fake"} alt="User" />
                </div>
              </label>

              <ul tabIndex={0} className="menu menu-sm dropdown-content mt-4 z-[1] p-4 shadow-2xl bg-base-200 rounded-2xl w-64 border border-white/5 space-y-2">
                <div className="px-2 py-2 border-b border-white/5 mb-2">
                  <p className="text-xs font-black text-gray-500 uppercase tracking-widest">Account</p>
                  <p className="font-bold text-base-content truncate">{userData.displayName || "User"}</p>
                </div>
                
                <li>
                  <Link to={dashboardLink} className="flex items-center gap-3 py-3" onClick={closeDropdown}>
                    <FaColumns className="text-primary" />
                    <span className="font-bold">Dashboard</span>
                    <span className="badge badge-primary badge-xs ml-auto">PRO</span>
                  </Link>
                </li>
                
                <li>
                  <button onClick={handleLogout} className="flex items-center gap-3 py-3 text-error hover:bg-error/10" onClick={closeDropdown}>
                    <FaSignOutAlt />
                    <span className="font-bold">Secure Logout</span>
                  </button>
                </li>
              </ul>
            </div>
          ) : (
            <Link to="/login" className="btn btn-primary btn-sm md:btn-md rounded-[--radius-field] font-black uppercase tracking-widest text-[10px] md:text-xs">
              Log In
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;