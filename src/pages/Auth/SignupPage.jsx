import { assets } from "../../assets/asset";
import SignupForm from "../../components/log-in/SignupForm";

export default function Signupage() {
  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2">
      {/* Left section (form) */}
      <SignupForm />

      {/* Right section (image) */}
      <div className="hidden md:block relative h-screen">
        <img
          src={assets.Auth}
          alt="Leaf Background"
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>
    </div>
  );
}
