function TodoListItem(props)
{ 
  const{todo,onRemoveTodo}=props;
  return (
    <li >{todo.title}
    <button type="button" onClick={()=> onRemoveTodo(todo.id)} > Remove </button>
    </li>
  );

}
export default TodoListItem;