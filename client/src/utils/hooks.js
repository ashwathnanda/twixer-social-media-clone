import { useState } from "react";

export const useForm = (callback, initiateState = {}) => {
  const [values, setValues] = useState(initiateState);
  const onChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    callback();
  };

  return {
    onChange,
    onSubmit,
    values,
  };
};
