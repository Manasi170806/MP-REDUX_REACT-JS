import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { 
  collection, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc, 
  onSnapshot,
  query,
  orderBy,
  where
} from 'firebase/firestore';
import { db } from '../Firebase/Firebase';

// Fetch all users except current user
export const fetchUsers = createAsyncThunk(
  'chat/fetchUsers',
  async (currentUserId, { rejectWithValue }) => {
    try {
      const usersQuery = query(
        collection(db, 'users'),
        where('uid', '!=', currentUserId)
      );
      
      return new Promise((resolve) => {
        const unsubscribe = onSnapshot(usersQuery, (snapshot) => {
          const users = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          }));
          console.log('Fetched users:', users);
          resolve(users);
        }, (error) => {
          console.error('Error fetching users:', error);
          rejectWithValue(error.message);
        });
      });
    } catch (error) {
      console.error('Error in fetchUsers:', error);
      return rejectWithValue(error.message);
    }
  }
);

// Fetch messages between current user and selected user
export const fetchMessages = createAsyncThunk(
  'chat/fetchMessages',
  async ({ currentUserId, selectedUserId }, { rejectWithValue }) => {
    try {
      const messagesQuery = query(
        collection(db, 'messages'),
        where('participants', 'array-contains', currentUserId),
        orderBy('timestamp', 'asc')
      );

      return new Promise((resolve) => {
        const unsubscribe = onSnapshot(messagesQuery, (snapshot) => {
          const messages = snapshot.docs
            .map(doc => ({
              id: doc.id,
              ...doc.data()
            }))
            .filter(msg => 
              msg.participants.includes(selectedUserId)
            );
          resolve(messages);
        });
      });
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Send a new message
export const sendMessage = createAsyncThunk(
  'chat/sendMessage',
  async ({ text, senderId, receiverId }, { rejectWithValue }) => {
    try {
      const messageData = {
        text,
        senderId,
        receiverId,
        participants: [senderId, receiverId],
        timestamp: new Date()
      };
      
      const docRef = await addDoc(collection(db, 'messages'), messageData);
      return { id: docRef.id, ...messageData };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Update an existing message
export const updateMessage = createAsyncThunk(
  'chat/updateMessage',
  async ({ messageId, newText }, { rejectWithValue }) => {
    try {
      await updateDoc(doc(db, 'messages', messageId), {
        text: newText,
        edited: true
      });
      return { messageId, newText };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Delete a message
export const deleteMessage = createAsyncThunk(
  'chat/deleteMessage',
  async (messageId, { rejectWithValue }) => {
    try {
      await deleteDoc(doc(db, 'messages', messageId));
      return messageId;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Chat slice
const chatSlice = createSlice({
  name: 'chat',
  initialState: {
    users: [],
    messages: [],
    selectedUser: null,
    loading: false,
    error: null
  },
  reducers: {
    selectUser: (state, action) => {
      state.selectedUser = action.payload;
    },
    clearSelectedUser: (state) => {
      state.selectedUser = null;
    },
    clearMessages: (state) => {
      state.messages = [];
    },
    clearError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.users = action.payload;
      })
      .addCase(fetchMessages.fulfilled, (state, action) => {
        state.messages = action.payload;
      })
      .addCase(sendMessage.fulfilled, (state, action) => {
        state.messages.push(action.payload);
      })
      .addCase(updateMessage.fulfilled, (state, action) => {
        const { messageId, newText } = action.payload;
        const message = state.messages.find(msg => msg.id === messageId);
        if (message) {
          message.text = newText;
          message.edited = true;
        }
      })
      .addCase(deleteMessage.fulfilled, (state, action) => {
        state.messages = state.messages.filter(msg => msg.id !== action.payload);
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(fetchMessages.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(sendMessage.rejected, (state, action) => {
        state.error = action.payload;
      });
  }
});

export const { selectUser, clearSelectedUser, clearMessages, clearError } = chatSlice.actions;
export default chatSlice.reducer;