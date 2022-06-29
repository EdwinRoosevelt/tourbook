import React, { createContext, useState, useEffect } from 'react'

import { auth, googleProvider } from "../../firebase";
import { signInWithRedirect, signOut, onAuthStateChanged } from 'firebase/auth';


// Store - managing global state using Context
const AuthContext = createContext()
export default function useAuth() {
  return useContext(AuthContext)
}

// 
// Auth Wrapper
// 
export function AuthProvider({ children }) {
  
  const [currentUser, setCurrentUser] = useState();

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });
    return unSubscribe
  }, [])

  async function googleLogin() {
    await signInWithRedirect(auth, googleProvider, );
  }

  const value = {
    currentUser,
    googleLogin,
  };
  
  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

