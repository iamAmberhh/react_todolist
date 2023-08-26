import React from 'react'
import ReactDOM from 'react-dom/client'
// import Menu from './App.jsx'
// import Login from './Login'
// import SignUp from './SignUp'
import TodoList from './LodoList'
import './index.css'
// import './style/login.scss'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <TodoList />
  </React.StrictMode>,
)
