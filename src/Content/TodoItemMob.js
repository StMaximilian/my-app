import { observer } from "mobx-react-lite";
import { FaEdit, FaTrash } from "react-icons/fa";
import ToDo from "../Store/ToDo";

export default observer(function TodoItem(props) {
  return (
    <div key={props.todo.id}>
      <span className="">
        <input
          key={props.todo.id}
          type="checkbox"
          checked={props.todo.completed}
          onChange={() => ToDo.completeTodo(props.todo.id)}
        />
        <strong>{props.index + 1 + "."}</strong>
        &nbsp;
        {props.todo.title}
        &nbsp;
        <button
          type="button"
          className="edit-btn"
          onClick={() => ToDo.editMode(props.todo.id)}
        >
          <FaEdit />
        </button>
        <button
          type="button"
          className="delete-btn"
          onClick={() => ToDo.removeTodo(props.todo.id)}
        >
          <FaTrash />
        </button>
      </span>
    </div>
  );
});
