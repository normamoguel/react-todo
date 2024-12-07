import TodoListItem from "./TodoListItem";

//const todoList= [{id:1,title:"Complete assignment 1"},{id:2,title:"Complete assignment 2"},{id:3,title:"Complete assignment 3"}];

function TodoList(props)
{ 
  const {todoList}=props;
  return(
    <ul>
          { 
              todoList.map(todo => {
              return (   <TodoListItem key={todo.id} todo={todo} />);
              
            })
          }
      </ul>
  );
}

export default TodoList;