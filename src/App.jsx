import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'


var todoList= [{id:1,title:"Complete assignment1"},{id:2,title:"Complete assignment2"},{id:3,title:"Complete assignment3"}];

function App() {

  return (
    <>
      <h1>Todo List</h1>
      <ul>
          {
            todoList.map(item=>{
              return <li id={item.id} >{item.title}</li>
            })
          }
      </ul>
    </>
  )
}

export default App
