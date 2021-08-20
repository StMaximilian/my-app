import React, { useEffect, useState } from "react";
import TodoList from "../ToDo/TodoList";
import Context from "../context";
import Loader from "../Loader";
import AddTodo from "../ToDo/AddTodo";

function SignIn() {
  const [todos, setTodos] = useState([]);
  const [load, setLoad] = useState(false);
  //
  useEffect(async () => {
    try {
      setLoad(true);
      await new Promise((res) => setTimeout(res, 2500));
      setTodos(
        JSON.parse(localStorage.getItem("notes")).filter(
          (v) => v.userid === parseInt(localStorage.getItem("usid"))
        )
      );
    } catch (error) {
      console.log(error);
    } finally {
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

  function addTodo(title, id) {
    setTodos(
      todos.concat([
        {
          id,
          userid: parseInt(localStorage.getItem("usid")),
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
