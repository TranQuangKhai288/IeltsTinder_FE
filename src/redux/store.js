import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slice/userSlice"; // Import default export
import messageReducer from "./slice/messageSlice";

export const store = configureStore({
  reducer: {
    user: userReducer, // Use default export
    messages: messageReducer,
  },
});
