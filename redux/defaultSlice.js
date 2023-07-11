import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  openCreateModal: false,
};

export const defaultSlice = createSlice({
  name: "default",
  initialState,
  reducers: {
    setOpenCreateModal: (state, action) => {
      state.openCreateModal = action.payload;
    },
  },
});

export const { setOpenCreateModal } = defaultSlice.actions;
