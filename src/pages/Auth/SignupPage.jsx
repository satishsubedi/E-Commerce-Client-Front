import { assets } from "../../assets/asset";
import SignupForm from "../../components/log-in/SignupForm";

export default function Signupage() {
  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center"
      style={{ backgroundImage: `url(${assets.sbg1})` }}
    >
      <div className="bg-white/200 backdrop-blur-xl p-8 rounded-lg shadow-md w-full max-w-md">
        <SignupForm />
      </div>
    </div>
  );
}
