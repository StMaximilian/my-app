import { useState } from "react";
import ToDo from "../Store/ToDo";
import { observer } from "mobx-react-lite";

function useInputValue(defaultValue = "todo") {
  const [value, setValue] = useState(defaultValue);
  return {
    bind: {
      value,
      onChange: (event) => setValue(event.target.value),
    },
    clear: () => setValue(""),
    value: () => value,
  };
}

export default observer(function AddTodo() {
  const input = useInputValue("");
  const submitHandler = (event) => {
    event.preventDefault();
    if (input.value().trim()) {
      if (ToDo.isEdit) {
        ToDo.editTodo(input.value().trim());
      } else {
        const newItem = {
          id: Date.now(),
          // userid: parseInt(localStorage.getItem("usid")),
          userid: ToDo.userid,
          title: input.value().trim(),
          completed: false,
        };
        ToDo.createTodo(newItem);
      }
      input.clear();
    }
    ToDo.isEdit = false;
  };
  return (
    <form style={{ marginBottom: "1rem" }} onSubmit={submitHandler}>
      <input {...input.bind} />
      <button type="submit">
        {ToDo.isEdit ? "Отредактировать" : "Добавить"}
      </button>
    </form>
  );
});
