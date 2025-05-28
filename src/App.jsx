import { ToastContainer } from "react-toastify";
import "./App.css";
import { Button } from "@/components/ui/button";
import { Route, Routes } from "react-router-dom";
import LoginPage from "./pages/Auth/LoginPage";
import ForgotPassword from "./pages/Auth/ForgotPassword";
import Footer from "./components/shared/Footer";

function App() {
  return (
    <>
      <Routes>
        {/* public Routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        {/* private Routes */}
      </Routes>
      <Footer />
      <ToastContainer position="top-center" autoClose={2000} />
    </>
  );
}

export default App;
