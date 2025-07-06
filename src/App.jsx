import { ToastContainer } from "react-toastify";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import LoginPage from "./pages/Auth/LoginPage";
import SignupPage from "./pages/Auth/SignupPage";
import ForgotPassword from "./pages/Auth/ForgotPassword";
import Footer from "./components/shared/Footer";
import { HomePage } from "./pages/Auth/HomePage";
import Header from "./components/Header/Header";
import ChangePasswordForm from "./components/log-in/ResetPasswordForm";
import ActiveUserPage from "./pages/ActiveUserPage";
import ProductDetailPage from "./pages/products/ProductDetailPage";
import AllProductsPage from "./pages/products/AllProductsPage";

function App() {
  return (
    <>
      <Header></Header>
      <Routes>
        {/* public Routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/change-password" element={<ChangePasswordForm />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/activate-user" element={<ActiveUserPage />} />
        <Route path="/allproducts" element={<AllProductsPage />} />
        <Route path="/product-detail/:slug" element={<ProductDetailPage />} />

        {/* private Routes */}
      </Routes>
      <Footer />
      <ToastContainer position="top-center" autoClose={2000} />
    </>
  );
}

export default App;
