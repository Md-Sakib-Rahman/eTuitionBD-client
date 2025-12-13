import React, { useContext, useState } from "react";
import Logo from "../../../assets/Logo.png";
import gradientBg from "../../../assets/Banner/Gradiant.png";
import { Link, useLocation, useNavigate } from "react-router";
import { AuthContext } from "../../../Context/AuthContextProvider";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
const Login = () => {
  const {
    loginWithEmailPassword,
    signInWithGoogle,
    saveToDB,
    loader,
    setLoader,
  } = useContext(AuthContext);
  const [loginError, setLoginError] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state?.from?.pathname || "/";
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const handleFormLogin = (data) => {
    console.log(data);
    loginWithEmailPassword(data.email, data.password)
      .then(() => {
        console.log("user logged in");
        setLoginError(false);
        setError(null);
        Swal.fire({
          position: "top-end",
          width: 400,
          height: 300,
          theme:"dark", 
          icon: "success",
          title: "Login Success !",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate(state, { replace: true });
      })
      .catch((err) => {
        setLoader(false);
        setLoginError(true);
        setError("Credentials are incorrect");
        console.log("test:", err);
      });
  };

  const handleGoogleLogin = () => {
    signInWithGoogle()
      .then(async (result) => {
        const token = await result.user.getIdToken();
        saveToDB(
          {
            name: result.user.displayName,
            email: result.user.email,
            image: result.user.photoURL,
            role: "student",
          },
          token
        );
        navigate(state, { replace: true });
      })
      .catch((err) => {
        console.log(err);
        setLoader(false);
      });
  };
  return (
    <div
      style={{ backgroundImage: `url(${gradientBg})` }}
      className={`${
        loader ? "hidden" : ""
      } hero bg-base-200 min-h-[700px] rounded-2xl bg-contain bg-no-repeat bg-start  mb-12`}
    >
      <div className="hero-content flex-col w-full ">
        <div className="flex items-center justify-center w-full mb-8">
          <div className="border-r-2 border-base-content/20 pr-6 h-[60px] flex flex-col justify-center items-end">
            <h1 className="text-2xl font-bold text-right leading-tight text-base-content/70">
              Login <br />
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
            <form onSubmit={handleSubmit(handleFormLogin)} className="fieldset">
              <label className="label">Email</label>
              <input
                name="email"
                type="email"
                {...register("email", { required: "Email is required" })}
                className={`input w-full ${errors.email ? "input-error" : ""}`}
                placeholder="Email"
              />
              {errors.email && (
                <span className="text-red-500 text-xs mt-1">
                  {errors.email.message}
                </span>
              )}
              <label className="label">Password</label>
              <input
                name="password"
                type="password"
                {...register("password", { required: "password is required" })}
                className={`input w-full ${
                  errors.password ? "input-error" : ""
                }`}
                placeholder="Password"
              />
              {errors.password && (
                <span className="text-red-500 text-xs mt-1">
                  {errors.password.message}
                </span>
              )}
              <div>
                <a className="link link-hover">Forgot password?</a>
              </div>
              <div>
                <Link
                  state={location.state}
                  to="/register"
                  className="link link-hover"
                >
                  Don't have an account?
                </Link>
              </div>
              <div>
                {loginError ? (
                  <p className="text-red-600 text-center">{error}</p>
                ) : (
                  ""
                )}
              </div>
              <button
                disabled={loader}
                type="submit"
                className="btn btn-neutral mt-4"
              >
                {loader ? (
                  <span className="loading loading-spinner loading-md"></span>
                ) : (
                  "Login"
                )}
              </button>
              <h2 className="text-center">OR</h2>
              <button
                onClick={handleGoogleLogin}
                type="button"
                className="btn bg-base-200 hover:bg-base-100 text-base-content hover:border-[#e5e5e5]"
              >
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
                Login with Google
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
