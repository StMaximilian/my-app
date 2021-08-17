import React, { useEffect } from "react";
import TodoList from "../ToDo/TodoList";
import Context from "../context";
import Loader from "../Loader";
import AddTodo from "../ToDo/AddTodo";

function SignIn() {
    const [todos, setTodos] = React.useState([]);
    const [load, setLoad] = React.useState(true);
  
    useEffect(() => {
      fetch("https://jsonplaceholder.typicode.com/todos?_limit=5")
        .then((response) => response.json())
        .then((todos) => setTodos(todos),setLoad(false))
    }, []);
  
    function toggleTodo(id) {
      setTodos(
        todos.map((todo) => {
          if (todo.id === id) {
            todo.completed = !todo.completed;
          }
          return todo;
        })
      );
    }
  
    function removeTodo(id) {
      setTodos(todos.filter((todo) => todo.id !== id));
    }
  
    function addTodo(title) {
      setTodos(
        todos.concat([
          {
            title,
            id: Date.now(),
            completed: false,
          },
        ])
      );
    }
  
    return (
      <Context.Provider value={{ removeTodo }}>
        <div>
            <AddTodo onCreate={addTodo} />
          {load && <Loader />}
          {todos.length ? (
            <TodoList todos={todos} onTog={toggleTodo} />
          ) : load ? null : (
            <p>No tasks!</p>
          )}
        </div>
      </Context.Provider>
    );
}

export default SignIn;
