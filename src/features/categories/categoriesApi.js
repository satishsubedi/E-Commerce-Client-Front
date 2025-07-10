import { axiosApiCall } from "../../axios/axiosApiCall";

const USER_API_URL = `${import.meta.env.VITE_APP_API_BASE_URL}/api/v1/category/`;

//GET ALL CATEGORIES | GET  |  PUBLIC
export const getAllCategories = () => {
  return axiosApiCall({
    method: "get",
    url: USER_API_URL,
  });
};
