import { ToastContainer } from "react-toastify";
import "./App.css";

import { Route, Routes } from "react-router-dom";
import LoginPage from "./pages/Auth/LoginPage";

import SignupPage from "./pages/Auth/SignupPage";
import ForgotPassword from "./pages/Auth/ForgotPassword";
import ResetPassword from "./pages/Auth/ResetPasswordPage";
import Footer from "./components/shared/Footer";
import { HomePage } from "./pages/Auth/HomePage";

import Header from "./components/Header/Header";

function App() {
  return (
    <>
      <Header></Header>
      <Routes>
        {/* public Routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/signup" element={<SignupPage />} />

        {/* private Routes */}
      </Routes>
      <Footer />
      <ToastContainer position="top-center" autoClose={2000} />
    </>
  );
}

export default App;
