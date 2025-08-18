import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  orders: null,
  loading: false,
  error: null,
  emailLoading: false,
  emailSuccess: null,
  emailError: null,
};
const orderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    //This is for order history
    setOrders: (state, action) => {
      state.orders = action.payload;
    },
    setOrderLoading: (state, action) => {
      state.loading = action.payload;
    },
    setOrderError: (state, action) => {
      state.error = action.payload;
    },
    resetOrders: (state) => {
      state.orders = null;
      state.loading = false;
      state.error = null;
    },
    setEmailLoading: (state, action) => {
      state.emailLoading = action.payload;
    },
    //Tis for sending email
    setEmailSuccess: (state, action) => {
      state.emailSuccess = action.payload;
      state.emailError = null;
    },
    setEmailError: (state, action) => {
      state.emailError = action.payload;
      state.emailSuccess = null;
    },
    resetEmailStatus: (state) => {
      state.emailLoading = false;
      state.emailSuccess = null;
      state.emailError = null;
    },
  },
});

export const {
  setOrders,
  setOrderLoading,
  setOrderError,
  resetOrders,
  setEmailLoading,
  setEmailSuccess,
  setEmailError,
  resetEmailStatus,
} = orderSlice.actions;
export default orderSlice.reducer;
