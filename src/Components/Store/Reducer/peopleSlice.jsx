import { createSlice } from "@reduxjs/toolkit";

// Initial state define kiya
const initialState = {
  info: null,
};

// People slice create kiya
export const peopleSlice = createSlice({
  name: "people",
  initialState,
  reducers: {
    // Person ka data load karne ke liye
    loadperson: (state, action) => {
      state.info = action.payload;
    },
    // Person ka data remove karne ke liye
    removeperson: (state, action) => {
      state.info = null;
    },
  },
});

// Actions ko export kiya
export const { loadperson, removeperson } = peopleSlice.actions;

// Reducer ko export kiya
export const peopleReducer = peopleSlice.reducer;
