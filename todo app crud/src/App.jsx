
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




import './App.css'

import React from 'react';
import { Provider } from 'react-redux';
import { store } from './store/store';
import TodoForm from './Components/TodoForm';
import TodoList from './Components/Input';

const App = () => {
  return (
    <Provider store={store}>
      <div>
        <h1>Todo App with Redux Toolkit</h1>
        <TodoForm/>
        <TodoList />
      </div>
    </Provider>
  );
};

export default App;