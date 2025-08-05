// import { clearCart } from "@/store/cart/cartSlice";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearCart } from "../../features/cart/cartAction";

const SuccessPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);
  const lastOrder = useSelector((state) => state.orders?.orders?.slice(-1)[0]);

  //this is for clearing the cart items after payment success
  useEffect(() => {
    let cleared = false;
    if (!cleared) {
      dispatch(clearCart());
      cleared = true;
    }
  }, [dispatch]);
  //This is for users alread logged in
  const handleViewOrders = () => {
    navigate("/orderHistory");
  };

  //This is for guest user
  const handleRegister = () => {
    navigate("/register");
  };
  return (
    <div className=" bg-gray-100 h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center w-full max-w-lg">
        <svg
          viewBox="0 0 24 24"
          className="text-green-600 w-16 h-16 mx-auto my-4"
        >
          <path
            fill="currentColor"
            d="M12,0A12,12,0,1,0,24,12,12.014,12.014,0,0,0,12,0Zm6.927,8.2-6.845,9.289a1.011,1.011,0,0,1-1.43.188L5.764,13.769a1,1,0,1,1,1.25-1.562l4.076,3.261,6.227-8.451A1,1,0,1,1,18.927,8.2Z"
          ></path>
        </svg>

        <h3 className="text-2xl font-semibold text-gray-900">
          Payment Successful!
        </h3>
        <p className="text-gray-600 mt-2">
          Thank you for completing your secure payment.
        </p>

        {/*This is for showing Order ID if available */}
        {lastOrder && (
          <p className="text-sm text-gray-500 mt-1">
            Your Order ID:{" "}
            <span className="font-mono font-semibold">
              #{lastOrder._id?.slice(-6).toUpperCase()}
            </span>
          </p>
        )}

        <p className="mt-2 text-gray-700">We’ve emailed you the receipt.</p>

        <div className="mt-6 flex flex-col gap-3">
          {user?._id ? (
            <button
              onClick={handleViewOrders}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md"
            >
              View My Orders
            </button>
          ) : (
            <button
              onClick={handleRegister}
              className="px-6 py-3 bg-amber-500 hover:bg-amber-600 text-white font-semibold rounded-md"
            >
              Register to Track My Order
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default SuccessPage;
