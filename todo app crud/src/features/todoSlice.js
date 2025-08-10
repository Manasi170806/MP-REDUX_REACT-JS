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




// import { createSlice } from '@reduxjs/toolkit';

// const initialState = {
//   list: [],
// };

// const todoSlice = createSlice({
//   name: 'todos',
//   initialState,
//   reducers: {
//     addTodo: (state, action) => {
//       state.list.push({ id: Date.now(), text: action.payload });
//     },
//     removeTodo: (state, action) => {
//       const index = state.list.findIndex(todo => todo.id === action.payload);
//       if (index !== -1) {
//         state.list.splice(index, 1); // Remove using splice
//       }
//     },
//     updateTodo: (state, action) => {
//       const { id, newText } = action.payload;
//       const todo = state.list.find(todo => todo.id === id);
//       if (todo) {
//         todo.text = newText;
//       }
//     },
//   },
// });

// export const { addTodo, removeTodo, updateTodo } = todoSlice.actions;
// export default todoSlice.reducer;


import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
  todos: []
};

export const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    addTodo: (state, action) => {
      state.todos.push({
        id: nanoid(),
        text: action.payload,
        completed: false
      });
    },
    deleteTodo: (state, action) => {
      state.todos = state.todos.filter(todo => todo.id !== action.payload);
    },
    updateTodo: (state, action) => {
      const { id, newText } = action.payload;
      const todo = state.todos.find(todo => todo.id === id);
      if (todo) {
        todo.text = newText;
      }
    },
    toggleComplete: (state, action) => {
      const todo = state.todos.find(todo => todo.id === action.payload);
      if (todo) {
        todo.completed = !todo.completed;
      }
    }
  }
});

export const { addTodo, deleteTodo, updateTodo, toggleComplete } = todoSlice.actions;
export default todoSlice.reducer;
