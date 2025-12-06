import React, { useContext } from 'react'
import Logo from "../../../assets/Logo.png";
import { Link, useNavigate } from 'react-router';
import gradientBg from '../../../assets/Banner/Gradiant.png';
import { AuthContext } from '../../../Context/AuthContextProvider';
const Register = () => {
  const {userData, signInWithGoogle} = useContext(AuthContext)
  const navigate = useNavigate()
  const state = navigate?.state || "/"

  const handleGoogleSignIn = () => {
    signInWithGoogle().then(()=>{
      console.log(" Success Login! ")
      navigate(state)
    }).catch((err)=>{
      console.log("the Erorr: ",err)
    })
  }

  if(userData?.uid){
    navigate(state)
  }

  return (
     <div 
     style={{ backgroundImage: `url(${gradientBg})` }}
     className="hero bg-base-200 min-h-[700px] rounded-2xl  mb-12 bg-contain bg-no-repeat bg-start">
      <div 
    
      className="hero-content flex-col w-full ">
        <div
          
        className="flex items-center justify-center w-full mb-8 ">
          <div
          
          className="border-r-2 border-base-content/20 pr-6 h-[60px] flex flex-col justify-center items-end  ">
            <h1 className="text-2xl font-bold text-right leading-tight text-base-content/70">
              Register <br />
              <span className="text-3xl text-primary">now!</span>
            </h1>
          </div>
          <div className="pl-6 flex items-center justify-start gap-3">
            <img className="w-12 h-12 object-contain" src={Logo} alt="Logo" />
            <h2 className="text-3xl font-bold tracking-tighter text-base-content">
              eTuition<span className="text-primary">BD</span>
            </h2>
          </div>
        </div>

        <div className="card bg-base-100 w-[400px] max-sm:w-[300px] shrink-0 shadow-2xl">
          <div className="card-body">
            <form className="fieldset">
              <label className="label">Name</label>
              <input
                name="name"
                type="text"
                className="input"
                placeholder="Email"
              />
              <label className="label font-semibold mt-2">Register as:</label>
              <div className="flex gap-6 mb-2">
                <label className="flex items-center gap-2 cursor-pointer">
                    <input 
                        type="radio" 
                        name="role" 
                        value="student" 
                        className="radio radio-primary" 
                        defaultChecked 
                    />
                    <span className="label-text">Student</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                    <input 
                        type="radio" 
                        name="role" 
                        value="tutor" 
                        className="radio radio-primary" 
                    />
                    <span className="label-text">Tutor</span>
                </label>
              </div>
              <label className="label">Email</label>
              <input
                name="email"
                type="email"
                className="input"
                placeholder="Email"
              />
              <label className="label">Password</label>
              <input
                name="password"
                type="password"
                className="input"
                placeholder="Password"
              />
              <div>
                <a className="link link-hover">Forgot password?</a>
              </div>
              <div>
                <Link to="/login" className="link link-hover">
                  Already have an account?
                </Link>
              </div>
              <button className="btn btn-neutral mt-4">Register</button>
              <h2 className="text-center">OR</h2>
              <button type="button" onClick={handleGoogleSignIn} className="btn bg-base-200 hover:bg-base-100 text-base-content hover:border-[#e5e5e5]">
                <svg
                  aria-label="Google logo"
                  width="16"
                  height="16"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                >
                  <g>
                    <path d="m0 0H512V512H0" fill="#fff"></path>
                    <path
                      fill="#34a853"
                      d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"
                    ></path>
                    <path
                      fill="#4285f4"
                      d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"
                    ></path>
                    <path
                      fill="#fbbc02"
                      d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"
                    ></path>
                    <path
                      fill="#ea4335"
                      d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"
                    ></path>
                  </g>
                </svg>
                SignUp with Google
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register
