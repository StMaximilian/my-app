import { observer } from "mobx-react-lite";
import ToDo from "../Store/ToDo";
import "../index.css";
import { FaEdit, FaTrash } from "react-icons/fa";

const Todo = observer(() => {
  return (
    <div>
      <form className="grocery-form" onSubmit={ToDo.AddEditTodo}>
        <h3>Todo List</h3>
        <div className="form-control">
          <input
            type="text"
            placeholder="Вставьте заметку"
            value={ToDo.inname}
            onChange={(e) => (ToDo.inname = e.target.value)}
          />
          <button type="submit" className="submit-btn">
            {ToDo.isEdit ? "Изменить" : "Внести"}
          </button>
        </div>
      </form>
      <ul>
        {ToDo.todos.map((todo, index) => (
          // <TodoItem key={todo.id}></TodoItem>
          <div key={todo.id}>
            <span className="">
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => ToDo.completeTodo(todo.id)}
              />
              <strong>{index + 1 + "."}</strong>
              &nbsp;
              {todo.title}
              &nbsp;
              <button
                type="button"
                className="edit-btn"
                onClick={() => ToDo.editTodo(todo.id)}
              >
                <FaEdit />
              </button>
              <button
                type="button"
                className="delete-btn"
                onClick={() => ToDo.removeTodo(todo.id)}
              >
                <FaTrash />
              </button>
            </span>
          </div>
        ))}
      </ul>
    </div>
  );
});

export default Todo;

function TodoItem(todo) {
  return (
    <div>
      <span className="">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => ToDo.completeTodo(todo.id)}
        />
        {/* <strong>{index + 1 + "."}</strong> */}
        &nbsp;
        {todo.title}
        &nbsp;
        <button
          type="button"
          className="edit-btn"
          onClick={() => ToDo.editTodo(todo.id)}
        >
          <FaEdit />
        </button>
        <button
          type="button"
          className="delete-btn"
          onClick={() => ToDo.removeTodo(todo.id)}
        >
          <FaTrash />
        </button>
      </span>
    </div>
  );
}
