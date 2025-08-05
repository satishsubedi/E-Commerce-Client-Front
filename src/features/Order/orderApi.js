import { axiosApiCall } from "../../axios/axiosApiCall";
const apiBaseUrl = import.meta.env.VITE_APP_API_BASE_URL;

const orderApiEndPoint = `${apiBaseUrl}/api/v1/order/history`;
export const getOrderApi = () => {
  const token = sessionStorage.getItem("accessJWT");
  console.log("🔵 Order API token:", token);
  const obj = {
    url: orderApiEndPoint,
    method: "get",
    isPrivate: true,
    headers: { Authorization: `Bearer ${token}` },
  };
  console.log("Order API token:", token);
  return axiosApiCall(obj);
};
