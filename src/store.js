import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { spotifyApi } from "./services/spotify"
import { authReducer } from "./slice/authSlice";
import { modalReducers } from "./slice/modalSlice";

export const store = configureStore({
  reducer: {
    [spotifyApi.reducerPath]: spotifyApi.reducer,
    auth: authReducer,
    modal: modalReducers
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(spotifyApi.middleware),
});

setupListeners(store.dispatch);
