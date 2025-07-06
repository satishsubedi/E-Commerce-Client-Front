import { configureStore, combineReducers } from "@reduxjs/toolkit";
import userReducer from "./user/userSlice";
import productReducer from "../features/product/productSlice.js";

const rootReducer = combineReducers({
  user: userReducer,
  productInfo: productReducer,
});

const store = configureStore({
  reducer: rootReducer,
});
export default store;
