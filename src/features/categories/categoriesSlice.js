import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  categories: [],
};

export const categoiresSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    setCategoires: (state, { payload }) => {
      state.categories = payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { reducer, actions } = categoiresSlice;
export const { setCategoires } = actions;

export default reducer;
