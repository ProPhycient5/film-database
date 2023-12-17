import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  url: {},
  genres: {},
  optedGenres: [],
};

export const homeSlice = createSlice({
  name: "home",
  initialState,
  reducers: {
    getApiConfiguration: (state, action) => {
      state.url = action.payload;
    },
    getGenres: (state, action) => {
      state.genres = action.payload;
    },
    getOptedGenres: (state, action) => {
      state.optedGenres = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { getApiConfiguration, getGenres, getOptedGenres } =
  homeSlice.actions;

export default homeSlice.reducer;
