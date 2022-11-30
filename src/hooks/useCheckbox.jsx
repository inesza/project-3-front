import { useState } from "react";

const useCheckbox = (initialValues) => {
  const [values, setValues] = useState(initialValues);
  const handleChange = (e) => {
    console.log(e.target.name);
    // if (e.target.value.checked) {
    setValues({
      ...values,
      [e.target.name]: e.target.checked,
    });
    // }
  };
  const reset = () => {
    setValues(initialValues);
  };
  return [values, handleChange, reset];
};

export default useCheckbox;
