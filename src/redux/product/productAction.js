import { toast } from "react-toastify";

import {
  getAllFilterProductApi,
  getAllProducts,
} from "../../axios/productAxios";
import { setFilteredProduct, setProduct, setProducts } from "./productSlice";


//Redux Thunk
// GET ALL PRODUCTS ACTION
export const getAllProductsAction = () => async (dispatch) => {
  try {
    const response = await getAllProducts();
    console.log("getAllProductsAction response", response);

    if (response?.status === "error") {
      return toast.error(response.message || "Something went wrong!");
    }

    // If the response is successful, dispatch the setProducts action with the products data
    dispatch(setProducts(response.payload));

    return response;
  } catch (error) {
    console.error("getAllProductsAction error", error);
    toast.error("Something went wrong!");
  }
};


export const getFilterProductAction = (query) => async (dispatch) => {
  const productInfo = await getAllFilterProductApi(query);

  const { payload, status } = productInfo;

  status === "success" && dispatch(setFilteredProduct(payload));
};


// GET PRODUCT BY ID ACTION
export const getProductByIdAction = (id) => async (dispatch) => {
  try {
    const response = await getAllProducts(); // Assuming this function can fetch a single product by ID
    console.log("getProductByIdAction response", response);

    if (response?.status === "error") {
      return toast.error(response.message || "Something went wrong!");
    }

    // If the response is successful, dispatch the setProduct action with the product data
    dispatch(setProduct(response.payload));

    return response;
  } catch (error) {
    console.error("getProductByIdAction error", error);
    toast.error("Something went wrong!");
  }
};
