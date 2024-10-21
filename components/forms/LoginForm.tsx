"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

import { Form } from "@/components/ui/form";
import CustomFormField, { FormFieldType } from "../CustomFormField";
import SubmitButton from "../SubmitButton";

import { loginUser } from "@/lib/actions/login-patient.actions";
const LoginForm = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: { email: string; password: string }) => {
    setIsLoading(true);

    try {
      const response = await loginUser(data.email, data.password);
      console.log("Login response:", response); // Log the response
      if (response) {
        const userId = response.userId; // Adjust this based on your actual response structure
        router.push(`/patients/${userId}/new-appointment/success`); // Redirect to the success page
      } else {
        console.error("Login failed");
      }
    } catch (error: any) {
      console.error("An error occurred during login:", error);
      alert(error.message); // Show the error message to the user
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 w-full max-w-md">
        <section className="mb-12 space-y-4">
          <h1 className="header">Welcome back👋</h1>
          <p className="text-dark-700">Please login to continue.</p>
        </section>

        <CustomFormField
          fieldType={FormFieldType.INPUT}
          control={form.control}
          name="email"
          label="Email"
          placeholder="johndoe@gmail.com"
          iconSrc="/assets/icons/email.svg"
          iconAlt="email"
        />

        <CustomFormField
          fieldType={FormFieldType.INPUT}
          control={form.control}
          name="password"
          label="Password"
          type="password"
          placeholder="••••••••"
          iconSrc="/assets/icons/password.svg"
          iconAlt="password"
        />

        <SubmitButton isLoading={isLoading}>Log In</SubmitButton>

        <p className="text-center mt-4">
          Don't have an account?{" "}
          <a href="/" className="text-blue-500 hover:underline">
            Sign up
          </a>
        </p>
      </form>
    </Form>
  );
};

export default LoginForm;
