import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../Slice/authSlice'; // Adjust path if needed
import chatReducer from '../Slice/chatSlice'; // Adjust path if needed

export const store = configureStore({
  reducer: {
    auth: authReducer,
    chat: chatReducer,
  },
});