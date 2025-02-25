import { FaRegTrashCan } from "react-icons/fa6";
import { VscPassFilled, VscPass } from "react-icons/vsc";
import PropTypes from 'prop-types';


function TodoListItem({todo,onRemoveTodo})
{ 
  let dateCompleted= todo.completedAt;
  
  if (typeof(dateCompleted)!="undefined" && dateCompleted!=null){
    dateCompleted=new Date(dateCompleted);
    dateCompleted=dateCompleted.toLocaleDateString("en-US");
  } else { 
    dateCompleted="";
  }
    return (
    
     <>
       <td><span>{todo?.status==="no"?<VscPass />:<VscPassFilled />} </span>{todo.Title} </td>
       <td> {todo.createdTime}</td>
       <td> {dateCompleted}</td>
       <td> <button type="button" 
              onClick={(event)=>{ 
                event.stopPropagation();
                onRemoveTodo(todo.id)
              }} > <FaRegTrashCan /> </button></td>
     </>

  );

}
TodoListItem.propTypes={
  todo: PropTypes.object.isRequired,
  onRemoveTodo: PropTypes.func.isRequired,
  
}
export default TodoListItem;