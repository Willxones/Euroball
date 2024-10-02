/* eslint-disable @typescript-eslint/no-explicit-any */
import {
    createUserWithEmailAndPassword,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signOut,
    User,
  } from "firebase/auth";
  import { createContext, useEffect, useState, ReactNode } from "react";
  import PropTypes from "prop-types";
  import auth from "../utils/firebaseConfig";
  
  // Define the AuthContext with a specific shape
  interface AuthContextType {
    user: User | null;
    loading: boolean;
    createUser: (email: string, password: string) => Promise<any>;
    loginUser: (email: string, password: string) => Promise<any>;
    logOut: () => Promise<void>;
  }
  
  export const AuthContext = createContext<AuthContextType | null>(null);
  
  // Define props for AuthProvider
  interface AuthProviderProps {
    children: ReactNode;
  }
  
  const AuthProvider = ({ children }: AuthProviderProps) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
  
    const createUser = (email: string, password: string) => {
      setLoading(true);
      return createUserWithEmailAndPassword(auth, email, password);
    };
  
    const loginUser = (email: string, password: string) => {
      setLoading(true);
      return signInWithEmailAndPassword(auth, email, password);
    };
  
    const logOut = () => {
      setLoading(true);
      return signOut(auth);
    };
  
    useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
        setUser(currentUser);
        setLoading(false);
      });
  
      return () => {
        unsubscribe();
      };
    }, []);
  
    const authValue: AuthContextType = {
      user,
      loading,
      createUser,
      loginUser,
      logOut,
    };
  
    return <AuthContext.Provider value={authValue}>{children}</AuthContext.Provider>;
  };
  
  AuthProvider.propTypes = {
    children: PropTypes.node.isRequired,
  };
  
  export default AuthProvider;