import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOrderAction } from "../../features/Order/orderAction";
import { Link } from "react-router-dom";
// import ReviewForm from "../../components/reviews/Reviews";
// import GenerateReceiptPDF from "../../utils/GenerateReceiptPDF";
// import Receipt from "../../components/Receipt/Receipt";

const UserOrderPage = () => {
  const dispatch = useDispatch();
  const { orders, loading, error } = useSelector((state) => state.orders);
  useEffect(() => {
    dispatch(getOrderAction());
  }, [dispatch]);

  const handleRefresh = () => {
    dispatch(getOrderAction());
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Paid":
        return "bg-green-100 text-green-800";
      case "Pending":
        return "bg-orange-100 text-orange-800";
      case "Processing":
        return "bg-yellow-100 text-yellow-800";
      case "Failed":
        return "bg-red-100 text-red-800";
      case "Refunded":
        return "bg-gray-100 text-gray-700";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  // const handleDownloadReceipt = (order) => {
  //   GenerateReceiptPDF(order, Receipt).catch((err) => {
  //     console.error("Error generating PDF:", err);
  //   });
  // };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
        <p className="text-sm text-red-700">{error}</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8 pt-[18vh]">
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="px-6 py-5 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-2xl font-semibold text-gray-800">
            My Order History
          </h2>
          <button
            onClick={handleRefresh}
            className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-2 rounded-md cursor-pointer"
          >
            Refresh
          </button>
        </div>

        {orders?.length === 0 ? (
          <div className="text-center py-12">
            <svg
              className="mx-auto h-12 w-12 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
              />
            </svg>
            <h3 className="mt-2 text-lg font-medium text-gray-900">
              No orders yet
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              You haven't placed any orders.{" "}
              <Link to="/menu" className="text-blue-600 hover:text-blue-500">
                Browse our menu
              </Link>{" "}
              to get started.
            </p>
          </div>
        ) : (
          <div className="divide-y divide-gray-200">
            {orders?.map((order) => (
              <div key={order._id} className="px-6 py-5">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-center space-x-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                        order.payment.status
                      )}`}
                    >
                      {order.payment.status}
                    </span>
                    <span
                      className="px-3 py-1 rounded-full text-xs bg-gray-100 text-gray-800 font-medium"
                      title="Order Status"
                    >
                      {order.orderStatus}
                    </span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      Order #{order._id.slice(-6).toUpperCase()}
                    </p>
                    <p className="text-sm text-gray-500">
                      Ordered on:{" "}
                      {new Date(order.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="mt-3 sm:mt-0">
                    <p className="text-lg font-semibold text-gray-900">
                      ${order.totalAmount.toFixed(2)}
                    </p>
                    {/* <button
                      onClick={() => handleDownloadReceipt(order)}
                      className="bg-green-600 hover:bg-green-700 text-white text-sm px-3 py-1 rounded-md"
                    >
                      Download Receipt
                    </button> */}
                  </div>
                </div>

                <div className="mt-4">
                  <p className="text-sm text-gray-500 mb-2">
                    Payment: {order.payment.method}{" "}
                    {order.payment.transactionId && (
                      <>
                        | Transaction ID:{" "}
                        <span className="text-gray-700 font-mono">
                          {order.payment.transactionId}
                        </span>
                      </>
                    )}
                  </p>
                  <h4 className="text-sm font-medium text-gray-900 mb-2">
                    Items:
                  </h4>
                  <div className="space-y-3">
                    {order.items.map((item, index) => (
                      <div key={index} className="flex items-start">
                        {item.productId?.image ? (
                          <img
                            className="h-16 w-16 rounded-md object-cover"
                            src={item.productId.image}
                            alt={item.productId.title || "Product"}
                          />
                        ) : (
                          <div className="h-16 w-16 rounded-md bg-gray-100 flex items-center justify-center text-gray-400 text-xs">
                            No image
                          </div>
                        )}
                        <div className="ml-4 flex-1">
                          <div className="flex items-center justify-between">
                            <p className="text-sm font-medium text-gray-900">
                              {item.productId?.title || "Unknown Item"}
                            </p>
                            <p className="text-sm text-gray-500 ml-2">
                              ${item.price.toFixed(2)}
                            </p>
                          </div>
                          <p className="text-sm text-gray-500">
                            Qty: {item.quantity}
                          </p>
                          {/* <ReviewForm foodId={item.productId?._id} /> */}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserOrderPage;
