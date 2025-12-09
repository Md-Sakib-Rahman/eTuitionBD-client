import React, { useContext } from "react";
import { AuthContext } from "../Context/AuthContextProvider";
import { Navigate } from "react-router";

const CommonPrivateRoutes = ({ children }) => {
  const { userData, loader } = useContext(AuthContext);
  if (loader) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <span className="loading loading-spinner"></span>
      </div>
    );
  }
  if(userData){
    
      return <div>{children}</div>;
    
  }else{
    return <Navigate to="/login" />; 
  }
};

export default CommonPrivateRoutes;
