import React, { useContext, useEffect, useState } from "react";

import CartContext from "../../store/cart-context";

import classes from "./HeaderCartButton.module.scss";

import { HiShoppingBag } from "react-icons/hi";

const HeaderCartButton = ({ handleShowCart }) => {
  const [isButtonHighlighted, setIsButtonHighlighted] = useState(false);
  const cartCtx = useContext(CartContext);

  const MealsInCart = cartCtx.meals.reduce((curNumber, item) => {
    return curNumber + item.amount;
  }, 0);

  useEffect(() => {
    setIsButtonHighlighted(true);
    const timer = setTimeout(() => {
      setIsButtonHighlighted(false);
    }, 300);

    return () => {
      clearTimeout(timer);
    };
  }, [cartCtx]);

  const buttonClasses = `${classes["header-cart-btn"]}  ${
    isButtonHighlighted && classes["header-cart-btn__bump"]
  }`;

  return (
    <button onClick={handleShowCart} className={buttonClasses}>
      <HiShoppingBag />
      <span className={classes["header-cart-btn__amount"]}>{MealsInCart}</span>
    </button>
  );
};

export default HeaderCartButton;
