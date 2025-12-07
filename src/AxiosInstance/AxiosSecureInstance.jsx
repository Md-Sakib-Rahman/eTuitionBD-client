import axios from "axios";
import { useContext, useEffect } from "react";
import { AuthContext } from "../Context/AuthContextProvider";
import { useNavigate } from "react-router";

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
        const status = error.response ? error.response.status : null;
        if (status === 401 || status === 403) {
          console.log("Session Expired !");
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
