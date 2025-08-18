import { axiosApiCall } from "../../axios/axiosApiCall";
const apiBaseUrl = import.meta.env.VITE_APP_API_BASE_URL;

//THis is for getting order history
const orderApiEndPoint = `${apiBaseUrl}/api/v1/order/history`;
export const getOrderApi = () => {
  const token = sessionStorage.getItem("accessJWT");
  const obj = {
    url: orderApiEndPoint,
    method: "get",
    isPrivate: true,
    headers: { Authorization: `Bearer ${token}` },
  };
  console.log("Order API token:", token);
  return axiosApiCall(obj);
};

//This is for send receipt in email
const sendReceiptEmailEndpoint = `${apiBaseUrl}/api/v1/order/send-receipt-email`;
export const sendReceiptEmail = (orderId) => {
  const token = sessionStorage.getItem("accessJWT");

  const obj = {
    url: sendReceiptEmailEndpoint,
    method: "post",
    isPrivate: true,
    headers: { Authorization: `Bearer ${token}` },
    data: { orderId },
  };

  console.log("Sending receipt email for order:", orderId);

  return axiosApiCall(obj);
};
