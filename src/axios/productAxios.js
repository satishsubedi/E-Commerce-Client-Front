import { axiosApiCall } from "./axiosApiCall";

const USER_API_URL = `${import.meta.env.VITE_APP_API_BASE_URL}/api/v1/product/`;

//GET ALL PRODUCTS | GET  |  PUBLIC
export const getAllProducts = () => {
  return axiosApiCall({
    method: "get",
    url: USER_API_URL,
  });
};
