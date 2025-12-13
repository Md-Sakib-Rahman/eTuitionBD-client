import React, { useContext } from 'react'
import { Link } from 'react-router'
import { AuthContext } from '../../../Context/AuthContextProvider'
import Logo from '../../../assets/Logo.png' 

const Footer = () => {
  const { loader } = useContext(AuthContext)
  
  return (
    <footer className={`footer rounded-2xl sm:footer-horizontal bg-base-200 text-base-content p-10 w-[90%] mx-auto ${loader ? "hidden" : ""}`}>
      <aside>
        <Link to="/">
            <img src={Logo} alt="eTuitionBd Logo" className="w-12 h-12" />
        </Link>
        <p className="font-bold text-lg">
          eTuitionBd
        </p>
        <p className="max-w-xs text-sm opacity-80">
          A complete platform where students and tutors connect with the least amount of barrier.
        </p>
        <p className="text-xs mt-4 opacity-60">
          Copyright © {new Date().getFullYear()} - All rights reserved
        </p>
      </aside>

      <nav>
        <h6 className="footer-title">Quick Links</h6>
        <Link to="/" className="link link-hover">Home</Link>
        <Link to="/tuitions" className="link link-hover">Tuitions</Link>
        <Link to="/tutors" className="link link-hover">Tutors</Link>
        <Link to="/about" className="link link-hover">About Us</Link>
      </nav>

      <nav>
        <h6 className="footer-title">Contact</h6>
        <div className="flex flex-col gap-2">
            <span className="text-sm">Dhaka, Bangladesh</span>
            <span className="link link-hover text-sm">support@etuitionbd.com</span>
            <span className="text-sm">+880 123 456 789</span>
        </div>
      </nav>

      <nav>
        <h6 className="footer-title">Social</h6>
        <div className="grid grid-flow-col gap-4">
       
          <a href="#" target="_blank" rel="noopener noreferrer">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              className="fill-current">
              <path
                d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"></path>
            </svg>
          </a>

 
          <a href="#" target="_blank" rel="noopener noreferrer">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              className="fill-current">
               <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
            </svg>
          </a>
 
          <a href="#" target="_blank" rel="noopener noreferrer">
             <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="24" 
                height="24" 
                viewBox="0 0 24 24"
                className="fill-current">
                <path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h5v-8.306c0-4.613 5.432-5.185 5.432-1.028v9.334h5v-9.754c0-5.275-5.617-5.071-7.258-2.428v-2.818z"/>
            </svg>
          </a>
        </div>
      </nav>
    </footer>
  )
}

export default Footer

