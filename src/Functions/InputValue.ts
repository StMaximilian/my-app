import { useState } from "react";
import { TInputValues } from "../Types";

const useInputValue = (defaultValue: string = "todo"): TInputValues => {
    const [value, setValue] = useState<string>(defaultValue);
    return {
      bind: {
        value,
        onChange: (event: React.ChangeEvent<HTMLInputElement>) =>
          setValue(event.target.value),
      },
      clear: () => setValue(""),
      value: () => value,
    };
  };
  
  export default useInputValue;