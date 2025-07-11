import { assets } from "../../assets/asset";
import LoginForm from "../../components/log-in/LoginForm";

export default function LoginPage() {
  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center"
      style={{ backgroundImage: `url(${assets.lb1})` }}
    >
      <div className="bg-white/150 backdrop-blur-xl p-8 rounded-lg shadow-md w-full max-w-md">
        <LoginForm />
      </div>
    </div>
  );
}
