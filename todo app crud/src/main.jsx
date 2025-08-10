// import { createRoot } from 'react-dom/client'
// import { Provider } from "react-redux"
// import store from './Store/store.js'
// import App from './App.jsx'

// createRoot(document.getElementById('root')).render(
//   <Provider store={store}>
//     <App />
//   </Provider>
// )



// import { createRoot } from 'react-dom/client'

// import App from './App.jsx'


// createRoot(document.getElementById('root')).render(
// <App/>
// )


import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Provider } from "react-redux";
import { store } from "./store/store";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
