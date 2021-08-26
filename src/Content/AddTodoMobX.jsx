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

export default observer(function AddTodo({ onCreate }) {
  const input = useInputValue("");
  function submitHandler(event) {
    event.preventDefault();
    if (input.value().trim()) {
      onCreate(input.value());
      input.clear();
    }
    ToDo.isEdit=false
  }
  return (
    <form style={{ marginBottom: "1rem" }} onSubmit={submitHandler}>
      <input {...input.bind} />
      <button type="submit">{ToDo.isEdit ? "edit" : "Submit!"}</button>
    </form>
  );
})

