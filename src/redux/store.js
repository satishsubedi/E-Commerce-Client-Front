import { configureStore, combineReducers } from "@reduxjs/toolkit";
import userReducer from "./user/userSlice";
import productReducer from "./product/productSlice";

const rootReducer = combineReducers({
  user: userReducer,
  productInfo: productReducer,
});

const store = configureStore({
  reducer: rootReducer,
});
export default store;
