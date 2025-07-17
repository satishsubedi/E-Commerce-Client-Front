import { v4 as uuidv4 } from "uuid";
import {
  getCartFromLocalStorage,
  saveCartToLocalStorage,
} from "../../utils/cartLocalStorage";
import { setCarts } from "./cartSlice";

//Add item to cart
export const addItemToCart =
  (product, selectedColor, selectedSize, quantity) => (dispatch, getState) => {
    // console.log("Redux state:", getState());
    // Get current cart from Redux
    const reduxCartItems = getState().cartInfo.cartItems;

    const cartPayload = {
      _id: uuidv4(),
      product_id: product._id,
      product_title: product.title,
      color: selectedColor,
      size: selectedSize,
      discountPrice: product.discountPrice,
      price: product.price,
      quantity: quantity,
      thumbnail: product.thumbnail,
      mainCategory: product.mainCategory,
    };

    // Check if item exists, update or add
    let updatedCartItems;
    const existingItemIndex = reduxCartItems.findIndex(
      (item) =>
        item.product_id === cartPayload.product_id &&
        item.color === cartPayload.color &&
        item.size === cartPayload.size
    );
    if (existingItemIndex !== -1) {
      updatedCartItems = reduxCartItems.map((item, index) =>
        index === existingItemIndex
          ? { ...item, quantity: item.quantity + cartPayload.quantity }
          : item
      );
      //   console.log("🛒 Cart updated (existing item):", updatedCartItems);
    } else {
      updatedCartItems = [...reduxCartItems, cartPayload];
      //   console.log("🛒 Cart updated (new item):", updatedCartItems);
    }

    dispatch(setCarts(updatedCartItems));
    saveCartToLocalStorage(updatedCartItems);
  };

// delete a cart product
export const deleteCartItem = (itemId) => (dispatch) => {
  const existingCartItems = getCartFromLocalStorage();
  const updatedCartItems = existingCartItems.filter(
    (item) => item._id !== itemId
  );
  dispatch(setCarts(updatedCartItems));
  saveCartToLocalStorage(updatedCartItems);
};

//update a quantity in cart
export const updateCartItemQuantity = (itemId, quantity) => (dispatch) => {
  const existingCartItems = getCartFromLocalStorage();
  const updatedCartItems = existingCartItems.map((item) =>
    item._id === itemId ? { ...item, quantity } : item
  );
  dispatch(setCarts(updatedCartItems));
  saveCartToLocalStorage(updatedCartItems);
};

// Load cart from localStorage
export const fetchCartFromStorage = () => (dispatch) => {
  const cartItems = getCartFromLocalStorage();
  dispatch(setCarts(cartItems));
};
