import { useState } from "react";

const useForm = () => {
  const [state, setState] = useState({});

  const handleChangeForInputs = (e) => {
    //   e.persist()
    // console.log(`${([e.target.name], e.target.value)}`);
    setState((state) => ({ ...state, [e.target.name]: e.target.value }));
  };

  const clear = () => {
    setState(" ");
  };

  return [state, handleChangeForInputs, clear];
};

export default useForm;
