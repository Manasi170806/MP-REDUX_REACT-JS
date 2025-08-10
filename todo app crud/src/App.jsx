
// import './App.css'
// import Input from './Components/Input'
// function App() {


//   return (

//     <div style={{ padding: "30px" }}>
//       <Input />
//     </div>

//   )
// }

// export default App




// import './App.css'

// import React from 'react';
// import { Provider } from 'react-redux';
// import { store } from './store/store';
// import TodoForm from './Components/TodoForm';
// import TodoList from './Components/Input';

// const App = () => {
//   return (
//     <Provider store={store}>
//       <div>
//         <h1>Todo App with Redux Toolkit</h1>
//         <TodoForm/>
//         <TodoList />
//       </div>
//     </Provider>
//   );
// };

// export default App;


import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addTodo, deleteTodo, updateTodo, toggleComplete } from "./features/todoSlice";

function App() {
  const [task, setTask] = useState("");
  const [editId, setEditId] = useState(null);

  const todos = useSelector(state => state.todos.todos);
  const dispatch = useDispatch();

  const handleAddOrUpdate = () => {
    if (task.trim()) {
      if (editId) {
        // Update Mode
        dispatch(updateTodo({ id: editId, newText: task }));
        setEditId(null);
      } else {
        // Add Mode
        dispatch(addTodo(task));
      }
      setTask("");
    }
  };

  const handleEdit = (id, text) => {
    setTask(text);
    setEditId(id);
  };

  return (
    <div style={{ width: "400px", margin: "50px auto", fontFamily: "sans-serif" }}>
      <h2>Redux Toolkit ToDo App</h2>
      <input
        type="text"
        placeholder="Enter task..."
        value={task}
        onChange={(e) => setTask(e.target.value)}
      />
      <button onClick={handleAddOrUpdate}>
        {editId ? "Update" : "Add"}
      </button>

      <ul>
        {todos.map((todo) => (
          <li key={todo.id} style={{ margin: "10px 0" }}>
            <span
              style={{
                textDecoration: todo.completed ? "line-through" : "none",
                cursor: "pointer"
              }}
              onClick={() => dispatch(toggleComplete(todo.id))}
            >
              {todo.text}
            </span>
            <button onClick={() => handleEdit(todo.id, todo.text)}>Edit</button>
            <button onClick={() => dispatch(deleteTodo(todo.id))}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
