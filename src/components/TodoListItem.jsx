import { FaRegTrashCan } from "react-icons/fa6";
import PropTypes from 'prop-types';


function TodoListItem({todo,onRemoveTodo})
{ 
  
  return (
    
     <>
       <td >{todo.Title} </td>
       <td> {todo.createdTime}</td>
       <td> <button type="button" onClick={()=> onRemoveTodo(todo.id)} > <FaRegTrashCan /> </button></td>
     </>

  );

}
TodoListItem.propTypes={
  todo: PropTypes.object.isRequired,
  onRemoveTodo: PropTypes.func.isRequired
}
export default TodoListItem;