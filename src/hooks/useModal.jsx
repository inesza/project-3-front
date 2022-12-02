import { useState } from "react";

const useModal = () => {
  const [isShowing, setIsShowing] = useState(false);

  const toggleModal = () => {
    console.log(isShowing);
    setIsShowing(!isShowing);
  };

  return {
    isShowing,
    toggleModal,
  };
};

export default useModal;
