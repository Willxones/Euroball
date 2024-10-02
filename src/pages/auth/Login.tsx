/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import { Button, Checkbox, Label, Spinner, TextInput } from "flowbite-react";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../components/AuthProvider";
import { getFirestore, collection, query, where, getDocs } from "firebase/firestore";

const firestore = getFirestore();

export function Login() {
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();
  
  const [error, setError] = useState<string | null>(null);
  const [rememberMe, setRememberMe] = useState(false);
  const [savedEmail, setSavedEmail] = useState<string | null>(null);

  if (!authContext) {
    throw new Error("AuthContext is not available. Ensure AuthProvider is wrapped around this component.");
  }

  const { loginUser, loading, user } = authContext;

  // Load the saved email from local storage when the component mounts
  useEffect(() => {
    const email = localStorage.getItem('savedEmail');
    if (email) {
      setSavedEmail(email);
      setRememberMe(true); // Set remember me checkbox to checked
    }
  }, []);

  // If the user is already authenticated, redirect to the home page
  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  const isEmail = (input: string) => /\S+@\S+\.\S+/.test(input); // Simple email validation check

  const handleFormSubmit = async (e: any) => {
    e.preventDefault();
    const input = e.target.emailOrUsername.value;
    const password = e.target.password.value;
  
    setError(null); // Reset error state before trying to log in
  
    let email = input;
  
    try {
      // If the input is not an email, assume it's a username and fetch the corresponding email
      if (!isEmail(input)) {
        const q = query(collection(firestore, "users"), where("username", "==", input));
        const querySnapshot = await getDocs(q);
  
        if (querySnapshot.empty) {
          throw new Error("Username not found");
        }
  
        // Get the associated email from the query result
        const userData = querySnapshot.docs[0].data();
        email = userData.email;
      }
  
      // Attempt to log in using the email (from input or Firestore) and password
      await loginUser(email, password);

      // Store the email in local storage if Remember Me is checked
      if (rememberMe) {
        localStorage.setItem('savedEmail', email);
      } else {
        localStorage.removeItem('savedEmail');
      }

      navigate("/"); // Redirect to home after successful login
    } catch (error: any) {
      let errorMessage = error.message; // Get the error message
      if (errorMessage.includes('Firebase: ')) {
        errorMessage = errorMessage.replace('Firebase: ', '');
      }
      setError(errorMessage); // Store the cleaned error message
    }
  
    e.target.reset(); // Clear the form fields
  };

  return (
    <>
      <form className="mx-auto flex w-full max-w-lg flex-col gap-4 py-12" onSubmit={handleFormSubmit}>
        <h1 className="text-xl font-semibold dark:text-white">Login to your account</h1>
        <p className="dark:text-white">
          Don't have an account? <a className="text-blue-500" href="/register">Click here to sign up</a>
        </p>
        {/* Show error message if login fails */}
        {error && <p className="text-sm text-red-500">{error}</p>}
        
        <div>
          <div className="mb-2 block">
            <Label htmlFor="emailOrUsername" value="Email or Username" />
          </div>
          <TextInput id="emailOrUsername" name="emailOrUsername" type="text" placeholder="Enter your email or username" defaultValue={savedEmail || ''} required />
        </div>
        
        <div>
          <div className="mb-2 block">
            <Label htmlFor="password" value="Your password" />
          </div>
          <TextInput id="password" name="password" type="password" required />
        </div>
        
        <div className="flex items-center gap-2">
          <Checkbox id="remember" checked={rememberMe} onChange={() => setRememberMe(!rememberMe)} />
          <Label htmlFor="remember">Remember me</Label>
          <a className="ml-auto mr-0 text-sm text-blue-500" href="/password-reset">Reset Password</a>
        </div>
        
        <Button type="submit">Login</Button>
        
        {/* Show loading spinner only when loading is true and not when there's an error */}
        {loading && !error && (
          <div className="py-4 text-center">
            <Spinner aria-label="Loading" size="xl" />
          </div>
        )}
      </form>
    </>
  );
}
