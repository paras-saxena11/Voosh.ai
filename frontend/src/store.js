import { configureStore } from "@reduxjs/toolkit";
import { userSlice } from "./slices/userSlice";
import authSlice from "./slices/authSlice";

const store = configureStore({
  reducer: {
    auth: authSlice,
    [userSlice.reducerPath]: userSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(userSlice.middleware),
  devTools: true,
});

export default store;
