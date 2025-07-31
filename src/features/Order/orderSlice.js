import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  orders: null,
  loading: false,
  error: null,
};
const orderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
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
  },
});

export const { setOrders, setOrderLoading, setOrderError, resetOrders } =
  orderSlice.actions;
export default orderSlice.reducer;
