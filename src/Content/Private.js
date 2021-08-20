import React, { useEffect } from "react";
import TodoList from "../ToDo/TodoList";
import Context from "../context";
import Loader from "../Loader";
import AddTodo from "../ToDo/AddTodo";

function SignIn(uid) {
  const [todos, setTodos] = React.useState([]);
  const [load, setLoad] = React.useState(true);

  useEffect(() => {
    try {
      setTodos(
        JSON.parse(localStorage.getItem("notes")).filter((v) => v.userid === 1)
      );
      setLoad(false);
    } catch (error) {
      console.log(error);
      setLoad(false);
    }
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
    let temparr = JSON.parse(localStorage.getItem("notes")).filter(
      (v) => v.id !== id
    );
    setTodos(temparr);
    localStorage.setItem("notes", JSON.stringify(temparr));
  }

  function addTodo(title, id, userid) {
    setTodos(
      todos.concat([
        {
          id,
          userid,
          title,
          date: Date.now(),
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
