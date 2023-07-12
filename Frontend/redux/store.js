import { configureStore } from "@reduxjs/toolkit";
import { defaultSlice } from "./defaultSlice";

export const store = configureStore({
  reducer: {
    defaultSlice: defaultSlice.reducer,
  },
});
