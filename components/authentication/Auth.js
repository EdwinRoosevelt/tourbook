import React, { createContext, useContext, useState, useEffect } from "react";
import { LoadingOverlay } from "@mantine/core";

import { auth, googleProvider } from "../../firebase";
import { signInWithPopup, signOut, onAuthStateChanged, deleteUser } from 'firebase/auth';


// Store - managing global state using Context
const AuthContext = createContext()
export function useAuth() {
  return useContext(AuthContext)
}

// 
// Auth Wrapper
// 
export function AuthProvider({ children }) {
  
  const [currentUser, setCurrentUser] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const unSubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setIsLoading(false);
    });
    return unSubscribe
  }, [])

  async function googleLogin() {
    await signInWithPopup(auth, googleProvider).then(
      setIsLoading(true)
    );
  }

  async function logout() {
    await signOut(auth)
  }

  const value = {
    currentUser,
    googleLogin,
    logout,
  };
  
  return (
    <>
      <AuthContext.Provider value={value}>
        <LoadingOverlay
          visible={isLoading}
          loaderProps={{ size: "md", color: "blue", variant: "dots" }}
        />
        {children}
      </AuthContext.Provider>
    </>
  );
}

