// import { createSlice } from "@reduxjs/toolkit";


// const initialState = []
// const todoSlice = createSlice({
//     name: "Todos",
//     initialState,
//     reducers: {
//         Addtodo: (state, action) => {
//             state.push({ text: action.payload, completed: false })
//         },
//         Removetodo: (state, action) => {
//             const index = state.findIndex((todo) => todo.id === action.payload);
//             if (index !== -1) {
//                 state.splice(index, 1);
//             }
//         },
//     },
// });

// export default todoSlice.reducer
// export const { Addtodo, Removetodo } = todoSlice.actions;




import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  list: [],
};

const todoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    addTodo: (state, action) => {
      state.list.push({ id: Date.now(), text: action.payload });
    },
    removeTodo: (state, action) => {
      const index = state.list.findIndex(todo => todo.id === action.payload);
      if (index !== -1) {
        state.list.splice(index, 1); // Remove using splice
      }
    },
    updateTodo: (state, action) => {
      const { id, newText } = action.payload;
      const todo = state.list.find(todo => todo.id === id);
      if (todo) {
        todo.text = newText;
      }
    },
  },
});

export const { addTodo, removeTodo, updateTodo } = todoSlice.actions;
export default todoSlice.reducer;