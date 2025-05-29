import React from "react";
import { assets } from "../../assets/asset";
import ForgotPasswordForm from "../../components/log-in/ForgotPasswordForm";
const ForgotPassword = () => {
  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2">
      {/* Left section (form) */}
      <ForgotPasswordForm />

      {/* Right section (image) */}
      <div className="hidden md:block relative h-screen">
        <img
          src={assets.b1}
          alt="Leaf Background"
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>
    </div>
  );
};

export default ForgotPassword;
