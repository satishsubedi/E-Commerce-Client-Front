import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: [],
};

const cartSlice = createSlice({
  name: "cartInfo",
  initialState,

  reducers: {
    setCarts: (state, action) => {
      state.cartItems = action.payload;
    },

    removeCartItem: (state, action) => {
      state.cartItems = state.cartItems.filter(
        (item) => item._id !== action.payload
      );
    },
    updateCartItemQuantity: (state, action) => {
      const { itemId, quantity } = action.payload;
      state.cartItems = state.cartItems.map((item) =>
        item._id === itemId ? { ...item, quantity } : item
      );
    },
  },
});

export const { reducer: cartReducer, actions } = cartSlice;
export const { setCarts, addCartItem, removeCartItem, updateCartItemQuantity } =
  actions;

export default cartReducer;
