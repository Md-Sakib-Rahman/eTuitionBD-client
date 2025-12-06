import React, { useContext } from 'react'
import Logo from '../../../assets/Logo.png'
import { Link } from 'react-router'
import ThemeContoller from './themecontroller/ThemeContoller'
import { ThemeContext } from '../../../Context/ThemeContextProvide'

const Navbar = () => {
  const {theme} =useContext(ThemeContext)
  const navlinks = ["Home", "Tuitions", "Tutors", "About", "Contact"]
  return (
    <div className={`navbar max-md:px-4  shadow-sm  ${theme == "black-purple" ? ("bg-gray-900"):("bg-white")} rounded-2xl px-10 w-[90%] mx-auto fixed top-0 right-0 left-0 mt-2 z-10`}>
  <div className="navbar-start">
    <div className="dropdown">
      <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
      </div>
      <ul
        tabIndex="-1"
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
        {navlinks.map((link, index) => {
        return (
          <li key={index}> <Link >{link} </Link></li>
         )          
        })}
      </ul>
    </div>
    <Link to="/"><img className='w-[40px]  ' src={Logo} alt="" /></Link>
  </div>
  <div className="navbar-center hidden lg:flex">
    <ul className="menu menu-horizontal px-1 ">
      {navlinks.map((link, index) => {
        return (
          <li key={index} className='rounded-xl hover:bg-primary  mx-2'  > <Link >{link} </Link></li>
         )
          
        })}
    </ul>
  </div>
  <div className="navbar-end flex items-center gap-4">
    <ThemeContoller/>
    <a className="btn btn-primary max-md:btn-sm">Login</a>
  </div>
</div>
  )
}

export default Navbar
