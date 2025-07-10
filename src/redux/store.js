import { configureStore, combineReducers } from "@reduxjs/toolkit";
import userReducer from "../features/user/userSlice";
import productReducer from "../features/product/productSlice";
import categoiresReducer from "../features/categories/categoriesSlice";

const rootReducer = combineReducers({
  user: userReducer,
  productInfo: productReducer,
  categoriesInfo: categoiresReducer,
});

const store = configureStore({
  reducer: rootReducer,
});
export default store;
