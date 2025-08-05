import { getOrderApi } from "./orderApi";
import { setOrders, setOrderLoading, setOrderError } from "./orderSlice";

export const getOrderAction = () => async (dispatch) => {
  try {
    dispatch(setOrderLoading(true));
    const response = await getOrderApi();
    if (response?.success) {
      dispatch(setOrders(response.orders));
    } else {
      dispatch(setOrderError(response.message));
    }
  } catch (error) {
    dispatch(setOrderError(error.message));
  } finally {
    dispatch(setOrderLoading(false));
  }
};
