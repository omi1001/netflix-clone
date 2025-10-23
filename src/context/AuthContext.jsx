// src/context/AuthContext.jsx

import React, { createContext, useState, useEffect, useContext } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase'; // Import your Firebase auth instance

// 1. Create the context
const AuthContext = createContext();

// 2. Create the provider component
export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true); // To check if auth state is determined

  // 3. Use Firebase's listener to track auth changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user); // Set the user object (or null if logged out)
      setLoading(false); // We now know the auth state
    });

    // Cleanup the listener when the component unmounts
    return unsubscribe;
  }, []);

  // 4. The value provided to children components
  const value = {
    currentUser,
  };

  // 5. Don't render children until the auth state is known
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

// 6. Custom hook to easily access the context
export const useAuth = () => {
  return useContext(AuthContext);
};