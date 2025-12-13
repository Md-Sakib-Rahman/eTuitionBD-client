import React, { useContext, useEffect } from "react";
import Logo from "../../../assets/Logo.png";
import { Link, useLocation, useNavigate } from "react-router";
import gradientBg from "../../../assets/Banner/Gradiant.png";
import { AuthContext } from "../../../Context/AuthContextProvider";
import { useForm } from "react-hook-form";
import axios from "axios";
import LoadingSpinner from "../../../Components/GlobalLoader";
import Swal from "sweetalert2";
const Register = () => {
  const {
    userData,
    signInWithGoogle,
    signUpWithEmailPassword,
    updateUserProfile,
    setUserData,
    saveToDB,
    loader,
    setLoader,
  } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state?.from?.pathname || null;

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const handleFormSignIn = async (data) => {
    setLoader(true);
    const { email, name, password, role, photoFile, phone } = data;
    //

    const formData = new FormData();
    formData.append("image", photoFile[0]);
    try {
      const imgbbRes = await axios.post(
        import.meta.env.VITE_IMAGE_HOST,
        formData
      );
      console.log(imgbbRes.data.data.display_url);
      const imageUrl = imgbbRes.data.data.display_url;

      const result = await signUpWithEmailPassword(email, password);
      const user = result.user;
      const token = await user.getIdToken();
      await updateUserProfile({
        displayName: name,
        photoURL: imageUrl,
      });
      console.log("Profile Updated");
      const userInfo = {
        name: name,
        email: email,
        image: imageUrl,
        role: role,
        phone: phone
      };
      await saveToDB(userInfo, token);

      setUserData({
        ...user,
        displayName: name,
        photoURL: imageUrl,
        role: role,
        phone:phone
      });
      console.log("registration success!");
      if(state){
         navigate(state);
      }else{
        
        navigate(`/${role}-dashboard`)
      }
     

      
    } catch (err) {
      console.log(err);
      setLoader(false);
    } finally {
      setLoader(false);
    }
  };
  const handleGoogleSignIn = async () => {
    try {
      // 1. Sign in with Firebase
      const result = await signInWithGoogle();
      const user = result.user;

      // 2. Prepare User Info for your Database
      // Note: You might want to ask the user for their Role (Student/Tutor) 
      // before this step, or default it to "student".
      const userInfo = {
        name: user.displayName,
        email: user.email,
        image: user.photoURL,
        role: "student", // Default role (or prompt user to select one)
        status: "active",
      };

      // 3. Get the token specifically for the backend request
      const token = await user.getIdToken();

      // 4. Save to Database using the function from your Context
      await saveToDB(userInfo, token);

      
      navigate("/"); // Redirect to home
      
    } catch (err) {
      console.error(err);
      
    }
  };
  // const handleGoogleSignIn = () => {
  //   signInWithGoogle()
  //     .then(async (result) => {
  //       console.log(" Success Login! ", result);
  //       const user = result.user;
  //       const token = await user.getIdToken();
  //       await saveToDB(
  //         {
  //           name: result.user.displayName,
  //           email: result.user.email,
  //           image: result.user.photoURL,
  //           role: "student",
  //         },
  //         token
  //       );
  //       Swal.fire({
  //                 position: "top-end",
  //                 width: 400,
  //                 height: 300,
  //                 theme:"dark", 
  //                 icon: "success",
  //                 title: "Login Success !",
  //                 showConfirmButton: false,
  //                 timer: 1500,
  //               });
  //      navigate(`/`)
  //     })
  //     .catch((err) => {
  //       console.log("the Erorr: ", err);
  //       setLoader(false)
  //     });
  // };

  useEffect(() => {
    if (userData?.uid) {
      navigate(state, { replace: true });
    }
  }, [userData, navigate, state]);

  if (loader) {
    return <LoadingSpinner />;
  }

  return (
    <div
      style={{ backgroundImage: `url(${gradientBg})` }}
      className="hero bg-base-200 min-h-[700px] rounded-2xl  mb-12 bg-contain bg-no-repeat bg-start"
    >
      <div className="hero-content flex-col w-full ">
        <div className="flex items-center justify-center w-full mb-8 ">
          <div className="border-r-2 border-base-content/20 pr-6 h-[60px] flex flex-col justify-center items-end  ">
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
            <form
              onSubmit={handleSubmit(handleFormSignIn)}
              className="fieldset"
            >
              
              <label className="label">Name</label>
              <input
                type="text"
                {...register("name", { required: "Name is required" })}
                
                className={`input ${errors.name ? "input-error" : ""}`}
                placeholder="Name"
              />

              
              {errors.name && (
                <span className="text-red-500 text-xs mt-1">
                  {errors.name.message}
                </span>
              )}

              
              <label className="label font-semibold mt-2">Register as:</label>
              <div className="flex gap-6 mb-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    value="student"
                    {...register("role", { required: "Please select a role" })}
                    className="radio radio-primary"
                    defaultChecked
                  />
                  <span className="label-text">Student</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    value="tutor"
                    {...register("role", { required: "Please select a role" })}
                    className="radio radio-primary"
                  />
                  <span className="label-text">Tutor</span>
                </label>
              </div>
              {errors.role && (
                <span className="text-red-500 text-xs">
                  {errors.role.message}
                </span>
              )}
              <label className="label">Upload Photo:</label>
              <input
                {...register("photoFile", { required: "Photo is required" })}
                type="file"
                className="file-input file-input-md"
              />
              {errors.photoFile && (
                <span className="text-red-500 text-xs mt-1">
                  {errors.photoFile.message}
                </span>
              )}
             
              <label className="label">Email</label>
              <input
                type="email"
                {...register("email", { required: "Email is required" })}
                className={`input ${errors.email ? "input-error" : ""}`}
                placeholder="Email"
              />
              {errors.email && (
                <span className="text-red-500 text-xs mt-1">
                  {errors.email.message}
                </span>
              )}

              
              <label className="label">Phone</label>
              <input
                type="tel"
                {...register("phone", {
                  required: "Phone is required",
                  
                })}
                className={`input ${errors.password ? "input-error" : ""}`}
                placeholder="Phone"
              />
              {errors.password && (
                <span className="text-red-500 text-xs mt-1">
                  {errors.password.message}
                </span>
              )}
              <label className="label">Password</label>
              <input
                type="password"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be 6 characters",
                  },
                })}
                className={`input ${errors.password ? "input-error" : ""}`}
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
                <Link to="/login" className="link link-hover">
                  Already have an account?
                </Link>
              </div>
              <button
                disabled={loader}
                type="submit"
                className="btn btn-neutral mt-4"
              >
                
                {loader ? (
                  <span className="loading loading-spinner loading-md"></span>
                ) : (
                  "Register"
                )}
              </button>
              <h2 className="text-center">OR</h2>
              <button
                type="button"
                onClick={handleGoogleSignIn}
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
                SignUp with Google
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
