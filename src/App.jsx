

import { useState  } from 'react'
import { useEffect } from 'react'
import './App.css'
import TodoList from './TodoList'
import AddTodoForm from './AddTodoForm'



function useSemiPersintentState () {
  const [todoList,setTodoList]=useState( 
    JSON.parse(localStorage.getItem('savedTodoList') ) || []  
  );
  
  useEffect (()=> {
     localStorage.setItem('savedTodoList',JSON.stringify(todoList));
  }, [todoList]);
  return ( [todoList,setTodoList])
}

function App() {
 const [todoList,setTodoList]=useSemiPersintentState();
 
 function addTodo (newTodo){
   setTodoList([...todoList,newTodo]);
 }
  return (
    <div>
      <h1>Todo List</h1>
      <AddTodoForm onAddTodo={addTodo}/>
      <TodoList todoList={todoList}/>
  
    </div>
  )
}

export default App
