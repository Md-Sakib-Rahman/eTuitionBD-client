import React, { createContext, use, useEffect, useState } from "react";
import { GoogleAuthProvider, onAuthStateChanged, signInWithPopup } from "firebase/auth";
import auth from "../Firebase/firebase.config";
export const AuthContext = createContext(null);

const AuthContextProvider = ({ children }) => {
  const [userData, setUserData] = useState({});
  const [loader, setLoader] = useState(false);

  const provider = new GoogleAuthProvider();

  const signInWithGoogle = () => {
    setLoader(true);
    return signInWithPopup(auth, provider);
  };
  const signUpWithEmailPassword = () => {
    return;
  };
  const loginWithEmailPassword = () => {
    return;
  };
  const logout = () => {
    return;
  };

  useEffect(() => {
    const unsubscribe = () => {
      setLoader(true);
      onAuthStateChanged(auth, (user) => {
        if (user) {
          setUserData(user)
          const uid = user.uid;
          setLoader(false);
          // ...
        } else {
          setLoader(false);
        }
      });
    };

    return () => unsubscribe();
  }, []);

  const data = {
    userData,
    setUserData,
    signInWithGoogle,
    signUpWithEmailPassword,
    loginWithEmailPassword,
    logout,
    loader,
  };

  return <AuthContext.Provider value={data}>{children}</AuthContext.Provider>;
};

export default AuthContextProvider;
