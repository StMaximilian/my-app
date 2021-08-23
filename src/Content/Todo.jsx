import { observer } from "mobx-react-lite";
import ToDo from "../Store/ToDo";
import "../index.css";

const Todo = observer(() => {
  return (
    <div>
      {ToDo.todos.map((t) => (
        <div>
          Tasks left: {t.unfinishedTodoCount}
          <ul>
            <li>
              <span>
                <input
                  className="itemsinput"
                  type="checkbox"
                  checked={t.completed}
                  onChange={() => ToDo.completeTodo(t.id)}
                />
                <strong>{t.id + "."}</strong>
                &nbsp;
                {t.title + "  " + t.daten}
                &nbsp;
              </span>
              <button onClick={() => ToDo.removeTodo(t.id)}>&times;</button>
            </li>
          </ul>      
        </div>
      ))}
    </div>
  );
});

export default Todo;

{
  /* /* {ToDo.todos.map((t) => (
          <li>
            <span>
              <input
                className="itemsinput"
                type="checkbox"
                checked={t.completed}
                onChange={() => ToDo.completeTodo(t.id)}
              />
              <strong>{t.id + "."}</strong>
              &nbsp;
              {t.title}
              &nbsp;
              {t.date}
              &nbsp;
            </span>
            <button onClick={() => ToDo.removeTodo(t.id)}>&times;</button>
          </li>)}         */
}
