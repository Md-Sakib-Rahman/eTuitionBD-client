import axios from "axios";
import { useContext, useEffect } from "react";
import { AuthContext } from "../Context/AuthContextProvider";
import { useNavigate } from "react-router";
import auth from "../Firebase/firebase.config"; // Adjust this import path if needed

const axiosSecureInstance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  withCredentials: true, 
});

const useAxiosSecure = () => {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const interceptor = axiosSecureInstance.interceptors.response.use(
      (response) => {
        return response;
      },
      async (error) => {
        const originalRequest = error.config;
        const status = error.response ? error.response.status : null;

        // 1. Check for expiration errors and ensure we haven't retried yet
        if ((status === 401 || status === 403) && !originalRequest._retry) {
          originalRequest._retry = true;

          try {
            const currentUser = auth.currentUser;
            
            if (currentUser) {
              // Force Firebase to issue a fresh token
              const newToken = await currentUser.getIdToken(true);
              
              // Apply the new token to the original request headers
              originalRequest.headers["authorization"] = `Bearer ${newToken}`;
              
              // Retry the exact request that just failed
              return axiosSecureInstance(originalRequest);
            }
          } catch (refreshError) {
            console.error("Token refresh failed:", refreshError);
            // If the refresh itself fails, proceed to logout
            await logout();
            navigate("/login");
            return Promise.reject(refreshError);
          }
        }

        // 2. If it's 401/403 and the retry already failed, force the logout
        if (status === 401 || status === 403) {
          console.log("Session Expired!");
          await logout();
          navigate("/login");
        }

        return Promise.reject(error);
      }
    );

    return () => {
      axiosSecureInstance.interceptors.response.eject(interceptor);
    };
  }, [logout, navigate]);

  return axiosSecureInstance;
};

export default useAxiosSecure;
// import axios from "axios";
// import { useContext, useEffect } from "react";
// import { AuthContext } from "../Context/AuthContextProvider";
// import { useNavigate } from "react-router";

// const axiosSecureInstance = axios.create({
//   baseURL: import.meta.env.VITE_BACKEND_URL,
//   withCredentials: true, 
// });

// const useAxiosSecure = () => {
//   const { logout } = useContext(AuthContext);
//   const navigate = useNavigate();
//   useEffect(() => {
//     const interceptor = axiosSecureInstance.interceptors.response.use(
//       (response) => {
//         return response;
//       },
//       async (error) => {
//         const status = error.response ? error.response.status : null;
//         if (status === 401 || status === 403) {
//           console.log("Session Expired !");
//           await logout();
//           navigate("/login");
//         }
//         return Promise.reject(error);
//       }
//     );
//     return () => {
//       axiosSecureInstance.interceptors.response.eject(interceptor);
//     };
//   }, [logout, navigate]);

//   return axiosSecureInstance;
// };

// export default useAxiosSecure;
