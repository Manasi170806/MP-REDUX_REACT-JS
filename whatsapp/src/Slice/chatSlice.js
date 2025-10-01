import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  chats: [],
  activeChat: null
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setChats: (state, action) => {
      state.chats = action.payload;
    },
    setActiveChat: (state, action) => {
      state.activeChat = action.payload;
    },
    addMessage: (state, action) => {
      const { chatId, message } = action.payload;
      const chat = state.chats.find(c => c.id === chatId);
      if (chat) {
        chat.messages.push(message);
      }
    }
  }
});

export const { setChats, setActiveChat, addMessage } = chatSlice.actions;
export default chatSlice.reducer;
