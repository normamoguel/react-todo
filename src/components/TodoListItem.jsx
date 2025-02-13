import style from './TodoListItem.module.css';
import { FaRegTrashCan } from "react-icons/fa6";
import { FaRegCheckCircle } from "react-icons/fa";
import PropTypes from 'prop-types';


function TodoListItem({todo,onRemoveTodo})
{ 
  
  return (
    <li className={style.ListItem} ><FaRegCheckCircle />{todo.title}
    <button type="button" onClick={()=> onRemoveTodo(todo.id)} > <FaRegTrashCan /> </button>
    </li>
  );

}
TodoListItem.propTypes={
  todo: PropTypes.object.isRequired,
  onRemoveTodo: PropTypes.func.isRequired
}
export default TodoListItem;