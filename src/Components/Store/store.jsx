import { configureStore } from "@reduxjs/toolkit";
import { movieReducer } from "../../Components//Store/Reducer/movieSlice";
import { peopleReducer } from "./Reducer/peopleSlice";
import { tvReducer } from "../../Components//Store/Reducer/tvSlice";
export const store = configureStore({
  reducer: {
    movie: movieReducer,
    tv: tvReducer,
    people: peopleReducer,
  },
});
