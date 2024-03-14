import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slice/userSlice"; // Import default export

export const store = configureStore({
  reducer: {
    user: userReducer, // Use default export
  },
});
