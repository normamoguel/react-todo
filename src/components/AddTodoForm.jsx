import { useState } from 'react'
import InputWithLabel from './InputWithLabel';
import style from './AddTodoForm.module.css';
import PropTypes from 'prop-types';


function AddTodoForm ({onAddTodo})
{   const [todoTitle,setTodoTitle]=useState("");
    const [isLoading,setIsloading]=useState(true);
    

    const fetchPostData = async()=> {
        let newTodoRecord={
            "records":[
                {
                    "fields":{
                        "Title": `${todoTitle}`
                    }
                }
            ]

        }
        const options= {
           method:"POST",
           headers: { 
            "Content-Type": "application/json",
            "Authorization": `Bearer ${import.meta.env.VITE_AIRTABLE_API_TOKEN}`},
           body: JSON.stringify(newTodoRecord)
             
        };
        
        const url = `https://api.airtable.com/v0/${import.meta.env.VITE_AIRTABLE_BASE_ID}/${import.meta.env.VITE_TABLE_NAME}`;
        try {
          const response = await fetch(url, options); 
          
          if (!response.ok) {
            const message = `Error has ocurred: ${response.status}`;
            throw new Error(message);
          }
          const data = await response.json();
          
        
        } catch (error){
            console.log(error.message);
        }
          finally {
            setIsloading(false); 
         }
      
      };
    

    function handleTitleChange(event){
        let newTodoTitle= event.target.value;
        setTodoTitle(newTodoTitle);
    }
    function handleAddTodo(event){
        event.preventDefault();
        fetchPostData();
        onAddTodo({title:todoTitle, id:Date.now()});
        setTodoTitle("");
   }
   return(
    
    <form onSubmit={handleAddTodo} >
     <div className={style.AddTodoForm}>
        <InputWithLabel 
            todoTitle={todoTitle}  
            handleTitleChange={handleTitleChange}>
            <label htmlFor="title" className={style.TitleForm}>Title</label> 
        </InputWithLabel >
        
        <button  className={style.BtnInputForm} type="submit" > Add </button>
      </div>
    </form>

    );
}

AddTodoForm.propTypes={
  onAddTodo: PropTypes.func.isRequired
}


export default AddTodoForm;