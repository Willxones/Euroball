"use client";

import { sendPasswordResetEmail } from "firebase/auth";
import { Button, Label, TextInput } from "flowbite-react";
import auth from "../../utils/firebaseConfig";

export function PasswordReset() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleFormSubmit = async (e: any) => {
    e.preventDefault();
    const email = e.target.email.value; // Accessing email correctly
    try {
      await sendPasswordResetEmail(auth, email);
      console.log("Email sent");
      e.target.reset(); // Reset form after sending the email
    } catch (error) {
      console.error("Error sending email:", error); // Handle any errors
    }
  };

  return (
    <form className="mx-auto my-12 flex w-full max-w-lg flex-col gap-4" onSubmit={handleFormSubmit}>
      <h1 className="text-xl font-semibold dark:text-white">Add your email to reset your password</h1>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="email" value="Your email" />
        </div>
        <TextInput id="email" name="email" type="email" placeholder="name@somemail.com" required />
      </div>
      <Button type="submit">Send Email</Button>
    </form>
  );
}