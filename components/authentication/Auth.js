import React, { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/router";
import { LoadingOverlay } from "@mantine/core";

import { auth, googleProvider } from "../../firebase";
import { signInWithPopup, signOut, onAuthStateChanged, deleteUser } from 'firebase/auth';

import { useNotify } from "../../components/notification/Notify";




// Store - managing global state using Context
const AuthContext = createContext()
export function useAuth() {
  return useContext(AuthContext)
}

// 
// Auth Wrapper
// 
export function AuthProvider({ children }) {
  const router = useRouter();
  
  const { addNotification } = useNotify(); 

  const [tourbookUser, setTourbookUser] = useState()
  const [isNewUser, setIsNewUser] = useState(false);
  const [currentUser, setCurrentUser] = useState();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isNewUser) router.push( "/profile/create") 
  }, [isNewUser])

  useEffect(() => {
    setIsLoading(true);
    const unSubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        await fetch(`/api/user/emailId/${user.email}`)
          .then((response) => response.json())
          .then((response) => {
            // condition based on if New / Existing User
            if (!response.success) {
              setIsNewUser(true);
              addNotification({ title: "New User", message: "Create a profile before proceeding forward.." });
            } else setTourbookUser(response.Item);
            setIsLoading(false);
          })
      } else {
        setIsLoading(false);
      }
      setCurrentUser(user);
      
      
    });
    return unSubscribe
  }, [])

  async function googleLogin() {
    setIsLoading(true);
    await signInWithPopup(auth, googleProvider).then(() => {
      setIsLoading(false);
      addNotification({ title: "Logged In", message: "" });
    } 
      
    );
  }

  async function logout() {
    setIsLoading(true);
    setTourbookUser(null)
    await signOut(auth).then(() => {
      addNotification({ title: "Logged Out!", message: "" });
      router.push('/')
    })
  }

  async function checkNewUser() {
    
  }

  const value = {
    currentUser,
    tourbookUser,
    isNewUser,
    setIsNewUser,
    googleLogin,
    logout,
  };
  
  return (
    <>
      <AuthContext.Provider value={value}>
        <LoadingOverlay
          visible={isLoading}
          overlayOpacity={0.9}
          loaderProps={{ size: "md", color: "blue", variant: "dots" }}
        />
        {children}
      </AuthContext.Provider>
    </>
  );
}

