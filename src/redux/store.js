import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./user/userSlice";
import productReducer from "./product/productSlice";

const store = configureStore({
  reducer: {
    // Add your reducers here
    user: userReducer,
    product: productReducer,
  },
});
export default store;
