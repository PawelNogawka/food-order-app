import React, { useContext } from "react";

import MealForm from "./MealForm";
import classes from "./Meal.module.scss";

import CartContext from "../../store/cart-context";

import { AiFillStar } from "react-icons/ai";
import { AiOutlineStar } from "react-icons/ai";

const Meal = ({ rating, name, desc, price, id, image }) => {
  const cartCtx = useContext(CartContext);

  const ratingStars = [];

  for (let i = 0; i < 5; i++) {
    if (i < rating) {
      ratingStars.push("fill");
    } else {
      ratingStars.push("outline");
    }
  }

  const handleAddToCart = (amount) => {
    cartCtx.addItem({
      id: id,
      name: name,
      desc: desc,
      price: price,
      amount: amount,
    });
  };

  return (
    <div className={classes.meal}>
      <img src={image} alt={name} />
      <h3 className={classes["meal__name"]}>{name}</h3>
      <div className={classes["meal__rating"]}>
        {ratingStars.map((star) =>
          star === "fill" ? <AiFillStar /> : <AiOutlineStar />
        )}
      </div>
      <p className={classes["meal__desc"]}>{desc}</p>
      <div className={classes["meal__row"]}>
        <MealForm handleAddToCart={handleAddToCart} />
      </div>
    </div>
  );
};

export default Meal;
