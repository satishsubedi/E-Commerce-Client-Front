import { getAllFilterProductApi, getAllProductApi } from "./productApi";
import { setFilteredProduct, setProducts } from "./productSlice";

export const fetchProductAction = () => async (dispatch) => {
  const productInfo = await getAllProductApi();
  const { payload, status } = productInfo;
  status === "success" && dispatch(setProducts(payload));
};
export const fetchFilterProductAction = (query) => async (dispatch) => {
  const productInfo = await getAllFilterProductApi(query);

  const { payload, status } = productInfo;

  status === "success" && dispatch(setFilteredProduct(payload));
};
