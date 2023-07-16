"use client";
import { configureStore } from "@reduxjs/toolkit";
import { defaultSlice } from "./defaultSlice";
import { dataSlice } from "./dataSlice";

export const store = configureStore({
  reducer: {
    default: defaultSlice.reducer,
    data: dataSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
