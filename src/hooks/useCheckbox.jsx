import { useState } from "react";

const useCheckbox = (initialValues) => {
  const [values, setValues] = useState(initialValues);
  const handleChange = (e) => {
    setValues({
      ...values,
      [e.target.status]: e.target.status,
    });
  };
  const reset = () => {
    setValues(initialValues);
  };
  return [values, handleChange, reset];
};

export default useCheckbox;
