import { getOrderApi, sendReceiptEmail } from "./orderApi";
import {
  setOrders,
  setOrderLoading,
  setOrderError,
  setEmailLoading,
  setEmailSuccess,
  setEmailError,
} from "./orderSlice";

//This action for get order history
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

//THis action is for sending the email
export const sendReceiptEmailAction = (orderId) => async (dispatch) => {
  try {
    dispatch(setEmailLoading(true));
    const response = await sendReceiptEmail(orderId);

    if (response?.success) {
      dispatch(setEmailSuccess(response.message));
    } else {
      dispatch(setEmailError(response.message));
    }
  } catch (error) {
    dispatch(setEmailError(error.message));
  } finally {
    dispatch(setEmailLoading(false));
  }
};
