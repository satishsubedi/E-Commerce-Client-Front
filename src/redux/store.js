import { configureStore, combineReducers } from "@reduxjs/toolkit";
import userReducer from "../features/user/userSlice";
import productReducer from "../features/product/productSlice";
import categoiresReducer from "../features/categories/categoriesSlice";
import filtersReducer from "../features/filters/filterSlice";
import { cartReducer } from "../features/cart/cartSlice";
import ordersReducer from "../features/Order/orderSlice";

const rootReducer = combineReducers({
  user: userReducer,
  productInfo: productReducer,
  categoriesInfo: categoiresReducer,
  cartInfo: cartReducer,
  filterInfo: filtersReducer,
  orders: ordersReducer,
});

const store = configureStore({
  reducer: rootReducer,
});
export default store;
