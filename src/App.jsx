import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import TodoList from './TodoList'
import AddTodoForm from './AddTodoForm'




function App() {
  const [newTodo,setNewtodo]=useState("");
  return (
    <div>
      <h1>To-do List</h1>
      <AddTodoForm onAddTodo={setNewtodo}/>
      <p>{newTodo}</p>
      <TodoList/>
      
    </div>
  )
}

export default App
