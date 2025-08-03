import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getOrderAction } from "../../features/Order/orderAction";
import { FaBoxOpen, FaTruck, FaCheckCircle, FaSpinner } from "react-icons/fa";

const steps = [
  { label: "Order Placed", icon: <FaSpinner className="text-gray-500" /> },
  { label: "Processing", icon: <FaBoxOpen className="text-orange-500" /> },
  { label: "Dispatched", icon: <FaTruck className="text-blue-500" /> },
  { label: "Delivered", icon: <FaCheckCircle className="text-green-500" /> },
];

const OrderTrackingPage = () => {
  const { id } = useParams(); // Get order ID from URL
  const dispatch = useDispatch();
  const { orders } = useSelector((state) => state.orders);
  const [order, setOrder] = useState(null);

  useEffect(() => {
    dispatch(getOrderAction());
  }, [dispatch]);

  useEffect(() => {
    if (orders?.length > 0) {
      const selectedOrder = orders.find((o) => o._id === id);
      setOrder(selectedOrder);
    }
  }, [orders, id]);

  if (!order) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] text-gray-600">
        <p className="text-xl font-semibold">Order not found!</p>
        <Link to="/orderHistory" className="mt-4 text-blue-600 underline">
          Go back to My Orders
        </Link>
      </div>
    );
  }

  const currentStepIndex = steps.findIndex(
    (step) => step.label === order.orderStatus
  );

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Track Your Order</h1>

      <div className="bg-white shadow rounded-lg p-6">
        {/* Order Info */}
        <div className="mb-6 flex justify-between">
          <div>
            <p className="text-sm text-gray-500">Order ID</p>
            <p className="font-semibold">
              #{order._id.slice(-6).toUpperCase()}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Placed on</p>
            <p className="font-semibold">
              {new Date(order.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>

        {/* Timeline */}
        <div className="relative border-l-2 border-gray-200 pl-6">
          {steps.map((step, index) => (
            <div key={step.label} className="mb-8 last:mb-0 relative">
              {/* Icon */}
              <div
                className={`absolute -left-6 w-10 h-10 flex items-center justify-center rounded-full border-2 ${
                  index <= currentStepIndex
                    ? "bg-blue-600 border-blue-600 text-white"
                    : "bg-gray-200 border-gray-300 text-gray-500"
                }`}
              >
                {step.icon}
              </div>

              {/* Content */}
              <div className="m-6">
                <h3
                  className={`text-lg font-semibold ${
                    index <= currentStepIndex
                      ? "text-blue-600"
                      : "text-gray-500"
                  }`}
                >
                  {step.label}
                </h3>
                <p className="text-sm text-gray-500">
                  {index <= currentStepIndex
                    ? "Step completed"
                    : "Waiting to be processed"}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Delivery Info */}
        <div className="bg-gray-50 rounded-lg p-4 mt-6">
          <p className="text-sm text-gray-600">
            <span className="font-semibold">Shipping to:</span>{" "}
            {order.shippingAddresses
              ? `${order.shippingAddresses.street}, ${order.shippingAddresses.city}, ${order.shippingAddresses.state}, ${order.shippingAddresses.postalCode}, ${order.shippingAddresses.country}`
              : "No address provided"}
          </p>
          <p className="text-sm text-gray-600 mt-1">
            <span className="font-semibold">Payment Status:</span>{" "}
            {order.payment.status}
          </p>
        </div>

        {/* Back Button */}
        <div className="mt-6 flex justify-between">
          <Link
            to="/support"
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
          >
            Support
          </Link>
          <Link
            to="/orderHistory"
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
          >
            Back to Orders
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OrderTrackingPage;
