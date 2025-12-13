import React, { useContext } from "react";
import { AuthContext } from "../Context/AuthContextProvider";
import { Navigate } from "react-router";
import LoadingSpinner from "../Components/GlobalLoader";

const AdminDashboardRoutes = ({ children }) => {
  const { userData, loader } = useContext(AuthContext);
  if (loader) {
    return <LoadingSpinner />;
  }
  if(userData.role === "admin"){
    
      return <div>{children}</div>;
    
  }else{
    return <Navigate to="/login" />; 
  }
};

export default AdminDashboardRoutes;
