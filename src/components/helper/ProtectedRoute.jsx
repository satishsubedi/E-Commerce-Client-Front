import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import { autoLoginAction } from "../../features/user/userAction";
import LoadingSpinner from "../helper/LoadingSpinner";

const ProtectedRoute = ({ children, adminOnly = false }) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { user } = useSelector((state) => state.user);

  const [checkingAuth, setCheckingAuth] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const accessJWT = sessionStorage.getItem("accessJWT");
      const refreshJWT = localStorage.getItem("refreshJWT");

      // No tokens → redirect to login
      if (!accessJWT && !refreshJWT) {
        setCheckingAuth(false);
        return;
      }

      // If user not loaded but tokens exist, try auto-login
      if (!user?._id && (accessJWT || refreshJWT)) {
        await dispatch(autoLoginAction());
      }

      setCheckingAuth(false);
    };

    checkAuth();
  }, [dispatch, user?._id]);

  // Show loader while checking auth
  if (checkingAuth) {
    return (
      <div className="flex items-center justify-center h-screen">
        <LoadingSpinner />
      </div>
    );
  }

  // Redirect if no user after checking
  if (!user?._id) {
    return <Navigate to={`/login?redirect=${location.pathname}`} replace />;
  }

  // If adminOnly route, check role
  if (adminOnly && user?.role !== "admin") {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

export default ProtectedRoute;
