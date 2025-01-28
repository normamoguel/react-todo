import TodoListItem from "./TodoListItem";
import style from './TodoList.module.css';

function TodoList(props)
{  
    const {todoList, onRemoveTodo}=props;
  
    return(
    <ul className={style.ListStyle}>
          { 
              todoList.map(todo => {
              return (   <TodoListItem 
                           key={todo.id} 
                           todo={todo}  
                           onRemoveTodo={onRemoveTodo}
                          />
                      );                   
              
            })
          }
      </ul>
  );
}

export default TodoList;