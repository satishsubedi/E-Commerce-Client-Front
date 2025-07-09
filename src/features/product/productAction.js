import { getAllFilterProductApi, getAllProductApi } from "./productApi";
import { setFilteredProduct, setProducts } from "./productSlice";

export const fetchProductAction = () => async (disptach) => {
  const productInfo = await getAllProductApi();
  const { payload, status } = productInfo;
  status === "success" && disptach(setProducts(payload));
};
export const fetchFilterProductBAction = (query) => async (disptach) => {
  const productInfo = await getAllFilterProductApi(query);

  const { payload, status } = productInfo;

  status === "success" && disptach(setFilteredProduct(payload));
};
