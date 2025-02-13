import TodoListItem from "./TodoListItem";
import PropTypes from 'prop-types';



function TodoList({todoList,onRemoveTodo})
{  
    return(

    <>
    
    <tbody >
          { 
              todoList.map(todo => {
              return ( <tr  key={todo.id} >
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
  onRemoveTodo: PropTypes.func.isRequired
}

export default TodoList;