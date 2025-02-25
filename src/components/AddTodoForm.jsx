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
                        "Title": `${todoTitle}`,
                        "status":'no'
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
          return data;
        
        } catch (error){
            console.log(error.message);
            return null;
        }
         
      };
    

    function handleTitleChange(event){
        let newTodoTitle= event.target.value;
        setTodoTitle(newTodoTitle);
    }
    
    const handleAddTodo= async (event)=>{
        event.preventDefault();
        let result= await fetchPostData();
        if (result===null) return;
        let item=result.records[0];
        setTodoTitle("");
        onAddTodo({id:item.id,Title:item.fields.Title,createdTime:item.createdTime});
      
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