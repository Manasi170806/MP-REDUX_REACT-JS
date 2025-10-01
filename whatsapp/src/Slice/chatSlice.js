import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { store } from '../Firebase/Firebase'
import { setDoc, collection, doc } from 'firebase/firestore'
// home
// users --> click --> chat page --> (current user --> click user)


//todo fetch messages
//todo send message
// collection -> document -> collection -> document
// chatroom - (all users chat) - collection
// generate unique doc id - email
// collection -> chat
// docs - messages

// home - users
// chatroom->emai-id
// chat ->

// change security rules in firebase - from Rules Section
// match /{document=**} {
//   allow read, write: if true;
// }

// aleena rais 

export const createChat = createAsyncThunk("chat/createChat", async () => {
    await setDoc(doc(store, "chatroom", "admin@gmail.com"), {
        sender: "admin@gmail.com"
    });
    return sender;
});

const sendMessage = createAsyncThunk("chat/sendMessage", async () => {

});


//todo edit message
//todo delete message


const initialState = {
    isLoding: true,
    error: null,
    chats: []
};

//todo chat slice
const chatSlice = createSlice({
    name: "chats",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(createChat.fulfilled, (state, action) => {
            console.log("chat created .... ", action.payload);
        })
    }
});
export default chatSlice.reducer;