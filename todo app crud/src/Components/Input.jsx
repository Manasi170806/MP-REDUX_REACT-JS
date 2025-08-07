
// import { useState } from "react"
// import { useDispatch, useSelector } from "react-redux"
// import { Addtodo, Removetodo } from "../features/TodoSlice"

// const Input = () => {

//     const [TextInput, setTextInput] = useState("")
//     const disptach = useDispatch()
//     const Todos = useSelector(state => state.Todos)

//     function handleAddTodo() {
//         if (TextInput.trim()) {
//             disptach(Addtodo(TextInput));
//             setTextInput("");
//         }
//     }

//     function handleRemovetodo() {
//         disptach(Removetodo())
//     }

//     return (
//         <div className="container">
//             <h1>Todo App</h1>
//             <div className="input-container">
//                 <input type="text" value={TextInput} onChange={(e) => setTextInput(e.target.value)} placeholder="Add todo here..." />
//                 <button onClick={handleAddTodo}>Add</button>
//             </div>
//             <ul>
//                 {Todos.map((todo) => (
//                     <li key={todo.id}> {todo.text}
//                         <button onClick={() => handleRemovetodo(todo.id)} className="delete-btn">Delete </button>
//                         <button className="Edit-btn">Edit </button>
//                     </li>
//                 ))}
//             </ul>
//         </div>
//     )
// }

// export default Input


import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeTodo, updateTodo } from '../features/todoSlice';

const TodoList = () => {
  const todos = useSelector(state => state.todos.list);
  const dispatch = useDispatch();
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState('');

  const handleEdit = (id, text) => {
    setEditingId(id);
    setEditText(text);
  };

  const handleUpdate = (id) => {
    if (editText.trim()) {
      dispatch(updateTodo({ id, newText: editText }));
      setEditingId(null);
      setEditText('');
    }
  };

  return (
    <ul>
      {todos.map(todo => (
        <li key={todo.id}>
          {editingId === todo.id ? (
            <>
              <input
                value={editText}
                onChange={e => setEditText(e.target.value)}
              />
              <button onClick={() => handleUpdate(todo.id)}>Save</button>
              <button onClick={() => setEditingId(null)}>Cancel</button>
            </>
          ) : (
            <>
              <span>{todo.text}</span>
              <button onClick={() => dispatch(removeTodo(todo.id))}>Delete</button>
              <button onClick={() => handleEdit(todo.id, todo.text)}>Edit</button>
            </>
          )}
        </li>
      ))}
    </ul>
  );
};

export default TodoList;