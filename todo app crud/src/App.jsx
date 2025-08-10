import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addTodo, deleteTodo, updateTodo, toggleComplete } from "./features/todoSlice";
import "./App.css"; 

function App() {
  const [task, setTask] = useState("");
  const [editId, setEditId] = useState(null);

  const todos = useSelector(state => state.todos.todos);
  const dispatch = useDispatch();

  const handleAddOrUpdate = () => {
    if (task.trim()) {
      if (editId) {
        dispatch(updateTodo({ id: editId, newText: task }));
        setEditId(null);
      } else {
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
    <div className="app-container">
      <h2 className="app-title">📋 Redux Toolkit ToDo App</h2>
      <div className="input-section">
        <input
          type="text"
          placeholder="Enter task..."
          value={task}
          onChange={(e) => setTask(e.target.value)}
          className="task-input"
        />
        <button onClick={handleAddOrUpdate} className="add-btn">
          {editId ? "Update" : "Add"}
        </button>
      </div>

      <ul className="task-list">
        {todos.map((todo) => (
          <li key={todo.id} className="task-item">
            <span
              className={`task-text ${todo.completed ? "completed" : ""}`}
              onClick={() => dispatch(toggleComplete(todo.id))}
            >
              {todo.text}
            </span>
            <div className="btn-group">
              <button className="edit-btn" onClick={() => handleEdit(todo.id, todo.text)}>✏</button>
              <button className="delete-btn" onClick={() => dispatch(deleteTodo(todo.id))}>🗑</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
