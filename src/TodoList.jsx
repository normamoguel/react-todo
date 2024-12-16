import TodoListItem from "./TodoListItem";


function TodoList(props)
{ 
  const {todoList, onRemoveTodo}=props;
  return(
    <ul>
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