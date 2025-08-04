import {
  getUser,
  getWishlistProductsApi,
  logoutUser,
  toggleWishlistApi,
} from "./userApi";
import { toast } from "react-toastify";
import {
  getWishlistDetails,
  setUser,
  setWishlist,
  toggleWishlist,
} from "./userSlice";
import { useSelector } from "react-redux";

//Redux Thunk
// GET USER ACTION
export const getUserAction = () => async (dispatch) => {
  const response = await getUser();

  if (response?.status == "error") {
    return toast.error(response.message || "Something went wrong!");
  }
  // If the response is successful, dispatch the setUser action with the user data
  console.log("User payload from API:", response.payload);
  dispatch(setUser(response.payload));

  return response;
};

//UPDATE USER

// LOGOUT USER
export const logoutUserAction = (email) => async (dispatch) => {
  try {
    // call api to delete session and update user's refesh token
    const response = await logoutUser(email);
    console.log("logout response", response);

    if (response?.status === "success") {
      // remove tokens from storage
      sessionStorage.removeItem("accessJWT");
      localStorage.removeItem("refreshJWT");

      // clear state
      dispatch(setUser({}));
      toast.success(response.message);
      return response;
    }
    toast.error(response.message);
    return response;
  } catch (error) {
    toast.error(error.message || "Logout failed");
    throw error;
  }
};

export const toggleWishlistAction = (productId) => async (dispatch) => {
  try {
    const { status, payload, message } = await toggleWishlistApi(productId);

    console.log(status, payload, message);
    if (status === "success") {
      const wishlist = Array.isArray(payload) ? payload : [];
      dispatch(setWishlist(wishlist));
      toast.success("Wishlist updated");
    }
  } catch (error) {
    toast.error("Failed to update wishlist");
    console.log(error);
  }
};

export const fetchWishlistAction = () => async (dispatch) => {
  try {
    const response = await getWishlistProductsApi();
    const status = response.status;
    const payload = response.payload;

    if (status === "success") {
      dispatch(getWishlistDetails(payload));
    }
  } catch (error) {
    console.log("Error fetching wishlist:", error);
    toast.error("Failed to fetch wishlist");
  }
};
