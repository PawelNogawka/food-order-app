import React, { useState, useContext } from "react";

import Modal from "../UI/Modal";
import Button from "../UI/Button";
import MealItem from "./CartMeal";
import Order from "./Order";

import CartContext from "../../store/cart-context";

import classes from "./Cart.module.scss";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";



const Cart = ({ handleHideCart }) => {
  const cartCtx = useContext(CartContext);
  const [isOrdering, setIsOrdering] = useState(false);
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const handleAddMealToCart = (meal) => {
    cartCtx.addItem({
      ...meal,
      amount: 1,
    });
  };

  const handleRemoveMealFromCart = (id) => {
    cartCtx.removeItem(id);
  };

  const notify = () =>
    toast.success(" the order has been successfully placed!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });

  const handleOrderFormSubmit = async (userData) => {
    setIsLoading(true);
    try {
      const response = await fetch(
        "https://food-d3dee-default-rtdb.europe-west1.firebasedatabase.app/orders.json",
        {
          method: "POST",
          body: JSON.stringify({
            user: userData,
            orderedItems: cartCtx.meals,
          }),
        }
      );

      if (response.ok) {
        notify();
        cartCtx.clearStore()
      } else {
        throw new Error("Something went wrong");
      }

      setIsLoading(false);
    } catch (error) {
      setError(error);
    }
  };

  const epmtyCartContent = (
    <>
      <p className={classes["cart__empty"]}> There is no products</p>
      <Button text="close" outlined onClick={handleHideCart} />
    </>
  );

  const cartContent = (
    <>
      
      <ul className={classes["cart__meals"]}>
        {cartCtx.meals.map((meal) => (
          <MealItem
            key={meal.id}
            name={meal.name}
            amount={meal.amount}
            handleAddMealToCart={handleAddMealToCart.bind(null, meal)}
            handleRemoveMealFromCart={handleRemoveMealFromCart.bind(
              null,
              meal.id
            )}
          />
        ))}
      </ul>
      <div className={classes["cart__row"]}>
        <div className={classes["cart__buttons"]}>
          {!isOrdering && (
            <>
              <Button text="close" outlined onClick={handleHideCart} />
              <Button text="order" onClick={() => setIsOrdering(true)} />
            </>
          )}
        </div>
        <p className={classes["cart__total-price"]}>${cartCtx.totalAmount}</p>
      </div>
      {isOrdering && (
        <>
          <Order
            handleHideCart={handleHideCart}
            onConfirm={handleOrderFormSubmit}
            error={error}
            isLoading={isLoading}
          />
        </>
      )}
    </>
  );

  return (
    <Modal handleHideCart={handleHideCart}>
      <ToastContainer />
      {cartCtx.meals.length === 0 ? epmtyCartContent : cartContent}
    </Modal>
  );
};

export default Cart;
