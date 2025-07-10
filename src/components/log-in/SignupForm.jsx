import React, { useState } from "react";
import {
  initialSignupFormData,
  SignupFormControls,
} from "../../config/formCongif";
import { Label } from "@radix-ui/react-label";
import FormControl from "../common-Input/FormControl";
import useForm from "../../hooks/useForm";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "react-toastify";
import useLoading from "../../hooks/useLoading";

import LoadingSpinner from "../helper/LoadingSpinner";
import { createUser } from "../../features/user/userApi";
import { Link } from "react-router-dom";

const SignupForm = () => {
  const { formData, handleOnChange, setFormData } = useForm(
    initialSignupFormData
  );
  const { fName, lName, email, phone, password } = formData;
  const { isLoading, startLoading, stopLoading } = useLoading();
  const [showPassword, setShowPassword] = useState(false);

  // Function to handle form submission
  const handleOnSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      return toast.error("Password and confirm password do not match");
    }

    startLoading();

    try {
      const response = await createUser({
        fName,
        lName,
        email,
        phone,
        password,
      });
      console.log("Registration response:", response);

      // Handle error (status === "error")
      if (response?.status === "error") {
        toast.error(response?.message || "Registration failed");
        return;
      }

      setFormData(initialSignupFormData);
      toast.success(
        response?.message ||
          "Registration successful! Please check your email to activate your account"
      );
    } catch (error) {
      console.error("Registration failed:", error);
      toast.error(
        error.response?.data?.message ||
          error?.message ||
          "Registration failed. Please try again."
      );
    } finally {
      stopLoading();
    }
  };
  return (
    <div className="flex flex-col justify-center px-4 md:px-8 w-full">
      <div className="space-y-6">
        <h3 className="text-2xl font-bold text-green-300 mb-4 text-center">
          Sign Up Now!{" "}
        </h3>
      </div>
      <div>
        <form onSubmit={handleOnSubmit} className="space-y-4" autoComplete="on">
          {SignupFormControls.map((field, index) => (
            <div key={index}>
              {field.name === "password" || field.name === "confirmPassword" ? (
                <div>
                  <Label
                    htmlFor={field.name}
                    className="block text-sm   font-bold text-white dark:text-white "
                  >
                    {field.label}
                  </Label>
                  <div className="relative">
                    <Input
                      type={showPassword ? "text" : "password"}
                      name={field.name}
                      value={formData[field.name]}
                      onChange={handleOnChange}
                      placeholder={field.placeholder}
                      required
                      id={field.name}
                      className="bg-white dark:text-white block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-green-600 focus-visible:z-10 sm:text-sm/6"
                      autoComplete="current-password"
                    />
                    <div
                      className="absolute inset-y-0 right-0 flex items-center pr-3 bg-transparent cursor-pointer"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4 text-gray-500" />
                      ) : (
                        <Eye className="h-4 w-4 text-gray-500" />
                      )}
                    </div>
                  </div>
                </div>
              ) : (
                <FormControl
                  label={field.label}
                  handleOnChange={handleOnChange}
                  inputAttributes={{
                    type: field.type,
                    name: field.name,
                    value: formData[field.name],
                    placeholder: field.placeholder,
                    autoComplete: field.autoComplete,
                    required: true,
                    id: field.name,
                  }}
                />
              )}
            </div>
          ))}

          <div className="mt-6">
            <Button
              type="submit"
              className="w-full bg-green-800 hover:bg-green-900"
              disabled={isLoading}
            >
              {isLoading ? <LoadingSpinner /> : "Sign Up"}
            </Button>
          </div>
        </form>
      </div>
      {/* Sign up link */}
      <p className="mt-5 text-center text-sm text-white">
        Already have an account?{" "}
        <Link to="/login" className="text-blue-300 hover:underline">
          Login
        </Link>
      </p>
    </div>
  );
};

export default SignupForm;
