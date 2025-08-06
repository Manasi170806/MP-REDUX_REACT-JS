
import './App.css'
import { useSelector } from 'react-redux'
import Input from './Components/Input.jsx'

function App() {
  const Todos = useSelector(state => state.Todos)

  return (

    <div style={{ padding: "30px" }}>
      <Input />

      {/* {Todos.map((todo) => (
          <li key={todo.id}> {todo.text}
          </li>
        ))} */}
    </div>

  )
}

export default App
