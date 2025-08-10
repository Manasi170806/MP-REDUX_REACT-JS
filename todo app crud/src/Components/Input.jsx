import { useState } from 'react';
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