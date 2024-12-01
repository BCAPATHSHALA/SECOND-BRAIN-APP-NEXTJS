"use client";

import { useState } from "react";
import SignUpForm from "./SignupForm";
import SignInForm from "./SigninForm";
import Image from "next/image";

export default function AuthPage() {
  const [isSignIn, setIsSignIn] = useState(true);

  return (
    <div className="min-h-screen bg-seasalt flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center items-center w-full">
        <Image src={"/bolt.svg"} alt="second brain" width={100} height={100} />
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-oxfordblue">
          {isSignIn ? "Sign in to your account" : "Create a new account"}
        </h2>
        <p className="mt-2 text-center text-sm text-battleshipgray">
          Or{" "}
          <button
            onClick={() => setIsSignIn(!isSignIn)}
            className="font-medium text-primary hover:text-mediumslateblue"
          >
            {isSignIn ? "create a new account" : "sign in to your account"}
          </button>
        </p>
      </div>

      <div className="mt-2">
        <div className="rounded-lg">
          {isSignIn ? <SignInForm /> : <SignUpForm setIsSignIn={setIsSignIn} />}
        </div>
      </div>
    </div>
  );
}
