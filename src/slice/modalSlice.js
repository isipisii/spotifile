import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isRecoModalOpen: false,
  isInfoModalOpen: false,
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openRecoModal: (state) => {
      state.isRecoModalOpen = true;
    },
    closeRecoModal: (state) => {
      state.isRecoModalOpen = false;
    },
    openInfoModal: (state) => {
      state.isInfoModalOpen = true;
    },
    closeInfoModal: (state) => {
      state.isInfoModalOpen = false;
    },
  },
});

export const {openInfoModal, closeInfoModal, openRecoModal, closeRecoModal} = modalSlice.actions
export const modalReducers = modalSlice.reducer;
