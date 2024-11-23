import { useState } from 'react'


function AddTodoForm (props)
{   const [todoTitle,setTodoTitle]=useState("");
    const {onAddTodo}=props;

    function handleTitleChange(event){
        let newTodoTitle= event.target.value;
        setTodoTitle(newTodoTitle);
    }
    function handleAddTodo(event){
        event.preventDefault();
        onAddTodo({title:todoTitle, id:Date.now()});
        setTodoTitle("");
   }
   return(
    
    <form onSubmit={handleAddTodo} >
        <label htmlFor="title" >Title</label>
        <input 
            name="title" id="title" 
            placeholder="Enter todo title"
            value={todoTitle} 
            onChange={handleTitleChange} ></input>
        <button type="submit" > Add </button>
    </form>

    );
}
export default AddTodoForm;