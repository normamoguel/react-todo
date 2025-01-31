import style from './TodoListItem.module.css';
import { FaRegTrashCan } from "react-icons/fa6";
import { FaRegCheckCircle } from "react-icons/fa";


function TodoListItem(props)
{ 
  const{todo,onRemoveTodo}=props;
  return (
    <li className={style.ListItem} ><FaRegCheckCircle />{todo.title}
    <button type="button" onClick={()=> onRemoveTodo(todo.id)} > <FaRegTrashCan /> </button>
    </li>
  );

}
export default TodoListItem;