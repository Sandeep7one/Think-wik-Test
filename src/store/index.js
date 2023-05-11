import { configureStore } from "@reduxjs/toolkit";
import addListSlice from "./addList-Slice";

const store = configureStore({
  reducer: {
    create: addListSlice
  },
});

export default store;
