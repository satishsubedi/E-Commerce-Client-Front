import { createSlice } from "@reduxjs/toolkit";

//initial state for the product slice
const initialState = {
  products: [],
  product: {},
  wishlist: [],
  cart: [],
  FilterProduct: [],
};
//create a slice for product-related state management

const productSlice = createSlice({
  name: "product",
  initialState,

  //state update reducers functions
  reducers: {
    setProducts: (state, action) => {
      state.products = action.payload;
    },
    setProduct: (state, action) => {
      state.product = action.payload;
    },
    setWishlist: (state, action) => {
      state.wishlist = action.payload;
    },
    setCart: (state, action) => {
      state.cart = action.payload;
    },
    setFilteredProduct: (state, { payload }) => {
      state.FilterProduct = payload;
    },
  },
});
//export the reducer and actions from the slice
const { reducer: productReducer, actions } = productSlice;

//destructure actions for easy access
export const { setProducts, setProduct, setFilteredProduct } = actions;
export default productReducer;
