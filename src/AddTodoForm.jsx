
function AddTodoForm (props)
{  
    function handleAddTodo(event){
        event.preventDefault();
        let todoTitle=event.target.title.value;
        console.log(todoTitle);
        props.onAddTodo(todoTitle);
        event.target.reset();
   }
   return(
    
    <form onSubmit={handleAddTodo} >
        <label htmlFor="todoTitle" >Title</label>
        <input name="title" id="title"></input>
        <button type="submit" > Add </button>
    </form>

    );
}
export default AddTodoForm;