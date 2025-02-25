import TodoListItem from "./TodoListItem";
import PropTypes from 'prop-types';



function TodoList({todoList,onRemoveTodo,updateCompleted}){ 
  return(
    <>
      <tbody >
      { 
        todoList.map(todo => {
          return ( 
            <tr  key={todo.id} 
              onClick={(event)=> {updateCompleted(event,todo)}} 
              className={todo.status==="yes"?"completed":""}
              >
              <TodoListItem 
                  key={todo.id} 
                  todo={todo}  
                  onRemoveTodo={onRemoveTodo}
                  
                />
            </tr>
          );                   
        })
      }
      </tbody>
    </> 
  );
}
TodoList.propTypes={
  todoList: PropTypes.array.isRequired,
  onRemoveTodo: PropTypes.func.isRequired,
  updateCompleted: PropTypes.func.isRequired
}

export default TodoList;