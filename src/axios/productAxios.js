import { axiosApiCall } from "./axiosApiCall";

const PRODUCT_API_URL = `${import.meta.env.VITE_APP_API_BASE_URL}/api/v1/product/`;


//GET ALL PRODUCTS | GET  |  PUBLIC
export const getAllProducts = () => {
  return axiosApiCall({
    method: "get",

    url: PRODUCT_API_URL,
  });
};

export const getAllFilterProductApi = (query) => {
  const obj = {
    url: `${PRODUCT_API_URL}filterProduct?${query}`,
    method: "get",
  };
  console.log(obj.url);
  return axiosApiCall(obj);
};

