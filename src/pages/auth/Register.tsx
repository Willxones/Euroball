/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import { Button, Checkbox, Label, Spinner, TextInput } from "flowbite-react";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../components/AuthProvider";
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";

const firestore = getFirestore();

export function Register() {
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();
  
  const [error, setError] = useState<string | null>(null);

  if (!authContext) {
    throw new Error("AuthContext is not available. Ensure AuthProvider is wrapped around this component.");
  }

  const { createUser, loading, user } = authContext;

  // If authentication is still loading, display a loading indicator
  if (loading) {
    return <div className="py-12 text-center"><Spinner aria-label="Default status example" size="xl" /></div>;
  }

  // If the user is already authenticated, redirect to the home page
  if (user) {
    navigate("/");
    return null;
  }

  const validateUsername = (username: string): string | null => {
    const usernameRegex = /^[a-zA-Z0-9]{3,12}$/;
    const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(username);

    if (isEmail) {
      return "Usernames cannot be an email.";
    }
    if (!usernameRegex.test(username)) {
      return "Username must be 3 to 12 characters and contain only letters and numbers.";
    }
    return null; // Valid username
  };

  const handleFormSubmit = async (e: any) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    const repeatPassword = e.target['repeat-password'].value;
    const username = e.target.username.value; // Get the username

    // Validate the username
    const usernameError = validateUsername(username);
    if (usernameError) {
      setError(usernameError);
      return;
    }

    // Simple password match validation
    if (password !== repeatPassword) {
      setError("Passwords do not match");
      return;
    }

    // Check if the username is already taken
    const usernameRef = doc(firestore, "usernames", username);
    const usernameSnap = await getDoc(usernameRef);
    if (usernameSnap.exists()) {
      setError("Username already taken");
      return;
    }

    // Create the user in Firebase Authentication
    createUser(email, password)
      .then(async (userCredential) => {
        const uid = userCredential.user.uid;

        // Store the username in Firestore, linked to the user's UID
        await setDoc(doc(firestore, "usernames", username), {
          uid,
          email,
        });

        // Store additional user data in a separate collection if needed
        await setDoc(doc(firestore, "users", uid), {
          username,
          email,
        });

        navigate("/"); // Redirect to home after successful registration
      })
      .catch((error: { message: string }) => {
        setError(error.message); // Display the error message
      });

    e.target.reset();
  };

  return (
    <>
      <form className="mx-auto flex w-full max-w-lg flex-col gap-4 py-12" onSubmit={handleFormSubmit}>
        <h1 className="text-xl font-semibold dark:text-white">Register for an account</h1>
        <p className="dark:text-white">
          Already have an account? <a className="text-blue-500" href="/login">Click here to sign in</a>
        </p>
        {error && <p className="text-red-500">{error}</p>} {/* Show error message if registration fails */}
        
        <div>
          <div className="mb-2 block">
            <Label htmlFor="username" value="Your username" />
          </div>
          <TextInput id="username" name="username" placeholder="Choose a unique username" required />
        </div>

        <div>
          <div className="mb-2 block">
            <Label htmlFor="email" value="Your email" />
          </div>
          <TextInput id="email" name="email" type="email" placeholder="name@somemail.com" required />
        </div>

        <div>
          <div className="mb-2 block">
            <Label htmlFor="password" value="Your password" />
          </div>
          <TextInput id="password" name="password" type="password" required />
        </div>

        <div>
          <div className="mb-2 block">
            <Label htmlFor="repeat-password" value="Repeat password" />
          </div>
          <TextInput id="repeat-password" name="repeat-password" type="password" required />
        </div>

        <div className="flex items-center gap-2">
          <Checkbox id="agree" required />
          <Label htmlFor="agree" className="flex">
            I agree with the&nbsp;
            <a href="#" className="text-cyan-600 hover:underline dark:text-cyan-500">
              terms and conditions
            </a>
          </Label>
        </div>
        <Button type="submit">Register new account</Button>
      </form>
    </>
  );
}
