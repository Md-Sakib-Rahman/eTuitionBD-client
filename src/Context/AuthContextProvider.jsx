import React, { createContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import auth from "../Firebase/firebase.config";
import axios from "axios";
import useAxiosPublic from "../AxiosInstance/AxiosPublicInstance";
export const AuthContext = createContext(null);

const AuthContextProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);
  const [loader, setLoader] = useState(true);
  const axiosPublic = useAxiosPublic();  
  const provider = new GoogleAuthProvider();

  const signInWithGoogle = () => {
    setLoader(true);
    return signInWithPopup(auth, provider);
  };
  const signUpWithEmailPassword = (email, password) => {
    setLoader(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };
  const loginWithEmailPassword = (email, password) => {
    setLoader(true);
    return signInWithEmailAndPassword(auth, email, password);
  };
  const logout = () => {
    return signOut(auth);
  };

  const updateUserProfile = (updatedData) => {
    return updateProfile(auth.currentUser, updatedData);
  };
  const saveToDB = async (userInfo, token) => {
    await axiosPublic
      .post(`/users`, userInfo , {
        
         headers: {
           authorization: `Bearer ${token}`
         }
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        axios.post(`${import.meta.env.VITE_BACKEND_URL}/logout`, {}, { withCredentials: true })
            .then(() => {
                 setUserData(null);
                 setLoader(false);
            });
        console.log(err);
      });
  };
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
        if (user) {
          setUserData(user);
          setLoader(true);

          user.getIdToken().then((token) => {
            axios
              .post(
                `${import.meta.env.VITE_BACKEND_URL}/jwt`,
                { email: user.email },
                {
                  withCredentials: true,
                  headers: { authorization: `Bearer ${token}` },
                }
              )
              .then(() => {
                axios.get(`${import.meta.env.VITE_BACKEND_URL}/my-user`, { withCredentials: true })
                .then((res) => {
                    
                    const fullUserData = {
                        ...user, 
                        ...res.data     
                    };
                    
                    setUserData(fullUserData);
                    setLoader(false);  
                })
                .catch((err) => {
                    console.error("Failed to fetch user data:", err);
                    setLoader(false);
                });
              })
              .catch((err) => {
                console.error("Token sync failed", err);
                
                setLoader(false);
              });
          });

          // ...
        } else {
          axios.post(
                `${import.meta.env.VITE_BACKEND_URL}/logout`, 
                {}, 
                { withCredentials: true }
            ).then(() => {
                setUserData(null);
                setLoader(false);
            }).catch(() => {
                
                setUserData(null);
                setLoader(false);
            });
        }
      });

    return () => {
      unsubscribe();
    };
  }, []);

  const data = {
    userData,
    setUserData,
    signInWithGoogle,
    signUpWithEmailPassword,
    loginWithEmailPassword,
    updateUserProfile,
    logout,
    loader,
    setLoader,
    saveToDB,
  };

  return <AuthContext.Provider value={data}>{children}</AuthContext.Provider>;
};

export default AuthContextProvider;
