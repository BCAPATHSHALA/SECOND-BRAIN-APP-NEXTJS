"use client";

import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import axios from "axios";
import { signupSchema, TSignupSchema } from "@/schemas/user.schemas";
import toast from "react-hot-toast";
import Button from "../ui/button";

export default function SignUpForm({
  setIsSignIn,
}: {
  setIsSignIn: (boolean: boolean) => void;
}) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TSignupSchema>({
    resolver: zodResolver(signupSchema),
  });

  const onSubmit: SubmitHandler<TSignupSchema> = async (data) => {
    setLoading(true);
    try {
      const response = await axios.post(`/api/auth/signup`, data, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.data.success) {
        setIsSignIn(true); // Redirect to the sign-in page
        toast.success(response.data.message);
      } else {
        setError(response.data.message || "Signup failed");
        toast.error(response.data.message);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setError("Sometning went wrong while signup, please try again");
        toast.error("Sometning went wrong while signup, please try again");
      } 
      console.error("Error during signup:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-lg flex items-center justify-center bg-seasalt py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="username" className="sr-only">
                Username
              </label>
              <input
                id="username"
                type="text"
                {...register("username")}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-battleshipgray text-oxfordblue rounded-t-md focus:outline-none focus:ring-mediumslateblue focus:border-mediumslateblue focus:z-10 sm:text-sm"
                placeholder="Username"
              />
              {errors.username && (
                <p className="mt-2 text-sm text-red-600">
                  {errors.username.message}
                </p>
              )}
            </div>
            <div className="relative">
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                {...register("password")}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-battleshipgray text-oxfordblue focus:outline-none focus:ring-mediumslateblue focus:border-mediumslateblue focus:z-10 sm:text-sm"
                placeholder="Password"
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOffIcon className="h-5 w-5 text-gray-400" />
                ) : (
                  <EyeIcon className="h-5 w-5 text-gray-400" />
                )}
              </button>
            </div>
            {errors.password && (
              <p className="mt-2 text-sm text-red-600">
                {errors.password.message}
              </p>
            )}
            <div className="relative">
              <label htmlFor="confirmPassword" className="sr-only">
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                {...register("confirmPassword")}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-battleshipgray text-oxfordblue rounded-b-md focus:outline-none focus:ring-mediumslateblue focus:border-mediumslateblue focus:z-10 sm:text-sm"
                placeholder="Confirm Password"
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? (
                  <EyeOffIcon className="h-5 w-5 text-gray-400" />
                ) : (
                  <EyeIcon className="h-5 w-5 text-gray-400" />
                )}
              </button>
            </div>
            {errors.confirmPassword && (
              <p className="mt-2 text-sm text-red-600">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          {error && <p className="mt-2 text-sm text-red-600">{error}</p>}

          <div>
            <Button
              variant="primary"
              type="submit"
              className="w-full"
              disabled={loading}
            >
              {loading ? "Signing up..." : "Sign up"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
