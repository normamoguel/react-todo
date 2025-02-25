import TodoList from './TodoList'
import AddTodoForm from './AddTodoForm'
import { useEffect } from 'react'
import { useState } from 'react'
import { GoChecklist } from "react-icons/go";
import PropTypes from 'prop-types';

function TodoContainer({tableName}){   
    const ASC='▲'; 
    const DESC='▼';
    const TABLE_BASE_ID = import.meta.env.VITE_AIRTABLE_BASE_ID;
    const TABLE_NAME = import.meta.env.VITE_TABLE_NAME;
    const TOKEN = import.meta.env.VITE_AIRTABLE_API_TOKEN;
    
    const [todoList,setTodoList]=useState([]);
    const [isLoading,setIsloading]=useState(true);
    const [sortConfig, setSortConfig]=useState({field:'',direction:'asc'});
    const [currentDate, setCurrentDate] = useState(new Date());

    useEffect (()=> {
      fetchData();        
    }, [tableName]);
    
    useEffect(()=> {
      if (!isLoading) {
        localStorage.setItem('savedTodoList',JSON.stringify(todoList));
      }
    }, [todoList,isLoading]);
    
    const updateCompleted = async(event,todo) =>{
      const status=todo.status==="yes"?"no":"yes";
      const id= todo.id;
      const completedAt= todo.status==="yes"?null:currentDate.toLocaleDateString();
     //console.log (completedAt);
      let newTodoRecord={
        "records":[
            {   
              "id":id,
                "fields":{
                    "status": status,
                    "completedAt": completedAt
                }
            }
        ]
    }
    
    const options= {
       method:"PATCH",
       headers: { 
        "Content-Type": "application/json",
        "Authorization": `Bearer ${TOKEN}`},
       body: JSON.stringify(newTodoRecord)
         
    };
    
    const url = `https://api.airtable.com/v0/${TABLE_BASE_ID}/${TABLE_NAME}`;
    
    try {
      const response = await fetch(url, options); 
     
      if (!response.ok) {
        const message = `Error has ocurred: ${response.status}`;
        throw new Error(message);
      }
      
    setTodoList((prevItems) =>
        prevItems.map((item) =>
          item.id === id ? { ...item, status: status, completedAt: completedAt } : item
        )
      );
    
      const target=event.target;
      
      if (target.nodeName==="TD"){
        target.parentElement.classList.toggle("completed");
      }      
      else  if (target.nodeName==="TR"){
        target.classList.toggle("completed");
      } 
    } catch (error){
        console.log(error.message);
        return null;
    }
  }

  const fetchData = async()=> {
    setIsloading (true);
    const options= {
      method:"GET",
      headers: { 
        "Content-Type": "application/json",
        "Authorization": `Bearer ${TOKEN}`
      },         
    };
    
    const url = `https://api.airtable.com/v0/${TABLE_BASE_ID}/${tableName}?view=Grid%20view&sort[0][field]=Title&sort[0][direction]=asc`;
      
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
              createdTime: todo.createdTime,
              status:todo.fields.status,
              completedAt: todo.fields.completedAt
              
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
    const url = `https://api.airtable.com/v0/${TABLE_BASE_ID}/${tableName}/${id}`;
    const options= {
      method:"DELETE",
      headers: { 
       "Content-Type": "application/json",
       "Authorization": `Bearer ${TOKEN}`
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

  return(
    <>
      <div className="card">
        <h1 className="card-title"><GoChecklist />Todo List</h1>
        <AddTodoForm onAddTodo={addTodo}/>
        {
          isLoading?(<p>Loading...</p>): 
            <table className="table">
              <thead >
                <tr>
                  <th onClick={() =>{ 
                          handleSort('Title')
                      }}>
                    <a className="title-th" title='Click on title to sort'>Title</a> {getCurrentDirection('Title')==='asc'?ASC:DESC} </th>
                  <th onClick={() => handleSort('createdTime')}>
                    <a className="title-th" title='Click on createdTime to sort'>Created Time </a>{getCurrentDirection('createdTime')==='asc'?ASC:DESC}
                  </th>
                  <th>Completed At</th>
                  <th>Remove</th>
                </tr>
              </thead>         
                <TodoList  
                  todoList={todoList}  
                  onRemoveTodo={removeTodo} 
                  updateCompleted ={updateCompleted}
                />
              </table>
          }
      </div>
                                   
    </>
  );
}
    TodoContainer.propTypes={
      tableName: PropTypes.string.isRequired
    }
    
    export default TodoContainer;