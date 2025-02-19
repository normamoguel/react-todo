
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Fragment, useEffect } from 'react'
import { useState } from 'react'
import { useNavigate } from "react-router-dom";
import './App.css'

import TodoList from './components/TodoList'
import AddTodoForm from './components/AddTodoForm'
import { GoChecklist } from "react-icons/go";
import About from './components/About';
import Home from './components/Home';
import { BiHome } from 'react-icons/bi';
import NavBar from './components/NavBar';



function App() {
  const ASC='▲'; 
  const DESC='▼';
  const [todoList,setTodoList]=useState([]);
  const [isLoading,setIsloading]=useState(true);
  const [sortConfig, setSortConfig]=useState({field:'',direction:'asc'});
  
  useEffect (()=> {
    fetchData();
   
  }, []);
  
  
  useEffect(()=> {
    if (!isLoading) {
     localStorage.setItem('savedTodoList',JSON.stringify(todoList));
    }
  }, [todoList,isLoading]);
  

  const fetchData = async()=> {
    setIsloading (true);
    const options= {
       method:"GET",
       headers: { 
        "Content-Type": "application/json",
        "Authorization": `Bearer ${import.meta.env.VITE_AIRTABLE_API_TOKEN}`
      },
         
    };
    const url = `https://api.airtable.com/v0/${import.meta.env.VITE_AIRTABLE_BASE_ID
    }/${import.meta.env.VITE_TABLE_NAME}?view=Grid%20view&sort[0][field]=Title&sort[0][direction]=asc`;
    
    try {
      const response = await fetch(url, options); 
      
      if (!response.ok) {
        const message = `Error has ocurred: ${response.status}`;
        throw new Error(message);
      }
      const data = await response.json();
      //console.log(data);
      const todos = data.records
         .map((todo) => ({
            id: todo.id,
            Title: todo.fields.Title,
            createdTime: todo.createdTime
         }))
         
       //console.log(todos);
       setTodoList (todos);
       setIsloading (false);

    } catch (error){
        console.log(error.message);
    }
      finally {
        setIsloading(false); 
    }
  
  };
  
  const sortOrder = () => {
    
   if (sortConfig.direction==="asc"){
      todoList.sort((a,b) => {
        if (a[sortConfig.field] < b[sortConfig.field]) return -1;
        if (a[sortConfig.field] === b[sortConfig.field]) return 0;
        return 1;
      });
    }
     else if( sortConfig.direction==="desc"){
      todoList.sort((a,b) => {
        if (a[sortConfig.field] < b[sortConfig.field]) return 1;
        if (a[sortConfig.field] === b[sortConfig.field]) return 0;
        return -1;
      });
     }

    setTodoList([...todoList]);
  }

  useEffect(()=> {
    sortOrder();
  },[sortConfig])
 
 function addTodo (newTodo){

   setTodoList([...todoList,newTodo]);
   fetchData();

 }

 const removeTodo = async (id)=> {
  const url = `https://api.airtable.com/v0/${import.meta.env.VITE_AIRTABLE_BASE_ID}/${import.meta.env.VITE_TABLE_NAME}/${id}`;
  const options= {
    method:"DELETE",
    headers: { 
     "Content-Type": "application/json",
     "Authorization": `Bearer ${import.meta.env.VITE_AIRTABLE_API_TOKEN}`
   },
  };
  const result= await fetch (url,options);
  if (result.ok){
    const newTodoList = todoList.filter(item => item.id !== id); 
    setTodoList(newTodoList); 
  }
}

const handleSort = (column) => {
  let direction= "asc";
  if (sortConfig.field===column && sortConfig.direction==="asc"){
    direction="desc";
  }
  setSortConfig({field:column,direction})  
};

const getCurrentDirection= (column)=> {
  if (sortConfig.field===column){
    return sortConfig.direction;
  }
  return "asc";
}

  return (
    <Fragment>
      <BrowserRouter>
      <NavBar/>
        <Routes>
          <Route path="/TodoContainer" 
                 element={ 
                        <>
                         <div className="card">
                            <h1 className="card-title"><GoChecklist />Todo List</h1>
                            <AddTodoForm onAddTodo={addTodo}/>
                            {isLoading?(<p>Loading...</p>): <table className="table">
                                                          <thead >
                                                                 <tr>
                                                                 <th onClick={() =>{ 
                                                                          handleSort('Title')
                                                                     }}>
                                                                   Title {getCurrentDirection('Title')==='asc'?ASC:DESC} </th>
                                                                 <th onClick={() => handleSort('createdTime')}>
                                                                     Created Time {getCurrentDirection('createdTime')==='asc'?ASC:DESC}
                                                                 </th>
                                                                   <th>Remove</th>
                                                                 </tr>
                                                               </thead>
                                                          
                                                              
                                                                  <TodoList  todoList={todoList}  onRemoveTodo={removeTodo} />
                                                            </table>}
                          </div>
                         
                        </>
                  }
          />
          <Route path="/About" element={<About />} />
          <Route path="/Home"  element={<Home />}  />
          <Route path="/"  element={<Home />}  />
        </Routes>
      </BrowserRouter>
      
    </Fragment>
  )
}

export default App
