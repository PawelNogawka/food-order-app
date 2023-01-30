import React, { useReducer } from "react";

import CartContext from "./cart-context";

const cartReducer = (state, action) => {
  if (action.type === "ADD") {
    let updatedItems;

    const existingIndex = state.meals.findIndex(
      (meal) => meal.id === action.meal.id
    );

    const existingMeal = state.meals[existingIndex];

    if (existingMeal) {
      const updtatedItem = {
        ...existingMeal,
        amount: action.meal.amount + existingMeal.amount,
      };

      updatedItems = [...state.meals];

      updatedItems[existingIndex] = updtatedItem;
    } else {
      updatedItems = state.meals.concat(action.meal);
    }

    const updatedAmount =
      state.totalAmount + action.meal.price * action.meal.amount;

    return {
      meals: updatedItems,
      totalAmount: updatedAmount,
    };
  }
  if (action.type === "REMOVE") {
    const existingIndex = state.meals.findIndex(
      (meal) => meal.id === action.id
    );

    const existingMeal = state.meals[existingIndex];

    let updatedItems = [...state.meals];

    let updatedItem = {
      ...existingMeal,
      amount: existingMeal.amount - 1,
    };

    if (updatedItem.amount === 0) {
      updatedItems = state.meals.filter((meal) => meal.id !== action.id);
    } else {
      updatedItems[existingIndex] = updatedItem;
    }

    const updatedAmount = state.totalAmount - updatedItem.price;

    return {
      meals: updatedItems,
      totalAmount: updatedAmount,
    };
  }

  if(action.type === 'CLEAR'){
    return {
      meals: action.meals,
      totalAmount: action.totalAmount,
    };
  }
};

const CartProvider = ({ children }) => {
  const defaultState = {
    meals: [],
    totalAmount: 0,
  };

  const [cartState, dispatchCartAction] = useReducer(cartReducer, defaultState);

  const handleAddMealToCart = (meal) => {
    dispatchCartAction({ type: "ADD", meal: meal });
  };

  const handleRemoveMealFromCart = (id) => {
    dispatchCartAction({ type: "REMOVE", id: id });
  };

  const handleClearCart = () => {
    dispatchCartAction({ type: "CLEAR", meals: [], totalAmount: 0 });
  };

  const cartContext = {
    meals: cartState.meals,
    totalAmount: cartState.totalAmount,
    addItem: handleAddMealToCart,
    removeItem: handleRemoveMealFromCart,
    clearStore:handleClearCart,
  };

  return (
    <CartContext.Provider value={cartContext}>{children}</CartContext.Provider>
  );
};

export default CartProvider;
