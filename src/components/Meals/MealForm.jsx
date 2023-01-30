import React, { useRef, useState } from "react";

import Button from "../UI/Button";

import classes from "./MealForm.module.scss";

const MealForm = ({ handleAddToCart }) => {
  const [isCorrectValue, setIsCorrectValue] = useState(true);

  const inputRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    const inputValue = inputRef.current.value;
    const inputValueNumber = +inputRef.current.value;

    if (
      inputValueNumber < 0 ||
      inputValueNumber > 5 ||
      inputValue.trim().length === 0
    ) {
      setIsCorrectValue(false);
      return;
    }
    setIsCorrectValue(true);
    inputRef.current.value = "";
    handleAddToCart(inputValueNumber);
  };

  return (
    <form onSubmit={handleSubmit} className={classes["meal-form"]}>
      <input
        ref={inputRef}
        type="number"
        className={`${classes["meal-form__input"]}`}
      />
      {!isCorrectValue && <small>Please enter a number between 1-5</small>}
      <Button small submit text="add to cart" />
    </form>
  );
};

export default MealForm;
