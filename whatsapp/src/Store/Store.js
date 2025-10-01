import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../Slice/UserSlice";
import chatReducer from "../Slice/chatSlice";

export const store = configureStore({
  reducer: {
    users: userReducer,
    chats: chatReducer
  },
});