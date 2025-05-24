import { ToastContainer } from "react-toastify";
import "./App.css";
import { Button } from "@/components/ui/button";
import { Route, Routes } from "react-router-dom";
import LoginPage from "./pages/Auth/LoginPage";
import ForgotPassword from "./pages/Auth/ForgotPassword";

function App() {
  return (
    <>
      <Routes>
        {/* public Routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        {/* private Routes */}
      </Routes>
      <ToastContainer position="top-center" autoClose={2000} />

      <div className="text-green-700 text-5xl">
        Home Page Coming soon ...
        <div className="flex flex-col items-center justify-center min-h-svh">
          <Button>Click me</Button>
        </div>
      </div>
    </>
  );
}

export default App;
