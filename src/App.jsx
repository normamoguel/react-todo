import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'


var todoList= [{id:1,title:"Complete assignment 1"},{id:2,title:"Complete assignment 2"},{id:3,title:"Complete assignment 3"}];

function App() {

  return (
    <div>
      <h1>To-do List</h1>
      <ul>
          {
            todoList.map(item=>{
              return <li id={item.id} >{item.title}</li>
            })
          }
      </ul>
    </div>
  )
}

export default App
