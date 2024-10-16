"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

import CustomFormField, { FormFieldType } from "../CustomFormField";
import SubmitButton from "../SubmitButton";

const LoginForm = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const { handleSubmit, control } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: { email: string; password: string }) => {
    setIsLoading(true);

    try {
      // Replace with your authentication logic
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        // Redirect to the dashboard or another page upon successful login
        router.push("/dashboard");
      } else {
        // Handle login error
        console.error("Login failed");
      }
    } catch (error) {
      console.error("An error occurred during login:", error);
    }

    setIsLoading(false);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 w-full max-w-md">
      <h1 className="text-2xl font-bold">Login</h1>

      <CustomFormField
        fieldType={FormFieldType.INPUT}
        control={control}
        name="email"
        label="Email"
        placeholder="johndoe@gmail.com"
        iconSrc="/assets/icons/email.svg"
        iconAlt="email"
      />

      <CustomFormField
        fieldType={FormFieldType.INPUT}
        control={control}
        name="password"
        label="Password"
        type="password"
        placeholder="••••••••"
        iconSrc="/assets/icons/lock.svg"
        iconAlt="password"
      />

      <SubmitButton isLoading={isLoading}>Log In</SubmitButton>

      <p className="text-center mt-4">
        Don't have an account?{" "}
        <a href="/register" className="text-blue-500 hover:underline">
          Sign up
        </a>
      </p>
    </form>
  );
};

export default LoginForm;
