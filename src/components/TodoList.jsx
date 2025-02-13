import TodoListItem from "./TodoListItem";
import style from './TodoList.module.css';
import PropTypes from 'prop-types';

function TodoList({todoList,onRemoveTodo})
{  
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
TodoList.propTypes={
  todoList: PropTypes.array.isRequired,
  onRemoveTodo: PropTypes.func.isRequired
}

export default TodoList;