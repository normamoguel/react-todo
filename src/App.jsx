

import { Fragment, useEffect } from 'react'
import { useState } from 'react'
import './App.css'
import TodoList from './TodoList'
import AddTodoForm from './AddTodoForm'

//function useSemiPersintentState () {
//  return ( [todoList,setTodoList])
//}

function App() {
  const [todoList,setTodoList]=useState([]);
  const [isLoading,setIsloading]=useState(true);

  useEffect (()=> {
        new Promise((resolve, reject) => {
          setTimeout(() => {
            resolve ({  data:{  todoList:JSON.parse(localStorage.getItem('savedTodoList') ) || []    }});
           }, 2000); 
          }
      )
      .then((result)=>{
        setTodoList (result.data.todoList);
        setIsloading (false);
      });
    
  }, []);

  useEffect(()=> {
    if (!isLoading) {
     localStorage.setItem('savedTodoList',JSON.stringify(todoList));
    }
  }, [todoList,isLoading]);




 //const [todoList,setTodoList]=useSemiPersintentState();
 
 
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
      {isLoading?(<p>Loading...</p>): <TodoList todoList={todoList}  onRemoveTodo={removeTodo}/>}
      
    </Fragment>
  )
}

export default App
