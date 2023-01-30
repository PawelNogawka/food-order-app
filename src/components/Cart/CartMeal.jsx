import React from "react";

import classes from "./CartMeal.module.scss";

import { VscAdd } from "react-icons/vsc";
import { FiMinus } from "react-icons/fi";

const MealItem = ({ name, amount, handleAddMealToCart, handleRemoveMealFromCart}) => {
  return (
    <li className={classes.meal}>
      <span className={classes["meal__name"]}>{name}</span>
      <span className={classes["meal__amount"]}>x {amount}</span>
      <div className={classes["meal__btns"]}>
        <button onClick={handleRemoveMealFromCart} className={classes["meal__btn"]}>
          <FiMinus />
        </button>
        <button onClick={handleAddMealToCart} className={classes["meal__btn"]}>
          <VscAdd />
        </button>
      </div>
    </li>
  );
};

export default MealItem;
