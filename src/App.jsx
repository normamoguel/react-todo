

import { Fragment, useEffect } from 'react'
import { useState } from 'react'
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

 function removeTodo(id){
  const newTodoList = todoList.filter(item => item.id !== id); 
  setTodoList(newTodoList); 
}

  return (
    <Fragment>
      <h1>Todo List</h1>
      <AddTodoForm onAddTodo={addTodo}/>
      <TodoList todoList={todoList}  onRemoveTodo={removeTodo}/>
    </Fragment>
  )
}

export default App
