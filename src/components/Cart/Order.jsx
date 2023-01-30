import React, { useState, useRef } from "react";

import Button from "../UI/Button";
import Error from "../UI/Error";
import Loader from "../UI/Loader";

import classes from "./Order.module.scss";

import { TailSpin } from "react-loader-spinner";

const isEmpty = (value) => value === "";
const isNotFiveCharacters = (value) => value.length !== 5;

const Order = ({ handleHideCart, onConfirm, error, isLoading }) => {
  const [formInputsValidity, setFormInputsValidity] = useState({
    name: true,
    street: true,
    city: true,
    postalCode: true,
  });

  const nameInputRef = useRef();
  const cityInputRef = useRef();
  const streetInputRef = useRef();
  const postalInputRef = useRef();

  const handleFormSubmit = (e) => {
    e.preventDefault();

    const name = nameInputRef.current.value;
    const city = cityInputRef.current.value;
    const street = streetInputRef.current.value;
    const postalCode = postalInputRef.current.value;

    const enteredNameIsValid = isEmpty(name);
    const enteredCityIsValid = isEmpty(city);
    const enteredStreetIsValid = isEmpty(street);
    const enteredPostalCodeIsValid = isNotFiveCharacters(postalCode);

    setFormInputsValidity({
      name: !enteredNameIsValid,
      street: !enteredStreetIsValid,
      city: !enteredCityIsValid,
      postalCode: !enteredPostalCodeIsValid,
    });

    const ValidityForm =
      !enteredCityIsValid &&
      !enteredCityIsValid &&
      !enteredStreetIsValid &&
      !enteredPostalCodeIsValid;

    if (!ValidityForm) return;

    onConfirm({
      name,
      city,
      street,
      postalCode,
    });
  };

  if(isLoading){
    return(
      <Loader>
      <TailSpin
        height="80"
        width="80"
        color="#FA5D43"
        ariaLabel="tail-spin-loading"
        radius="1"
        visible={true}
      />
    </Loader>
    )
  }


  if(isLoading){
    return(
      <Error>
        <p>Something went wrog</p>
        <Button text="close" outlined onClick={handleHideCart} />
      </Error>
    )
  }

  
  

  return (
    <div className={classes.order}>
      <form className={classes["order__form"]} onSubmit={handleFormSubmit}>
        <div className={classes["order__input-box"]}>
          <label className={classes["order__label"]} htmlFor="name">
            Your name:
          </label>
          <input
            ref={nameInputRef}
            className={classes["order__input"]}
            type="text"
            id="name"
          />
          {!formInputsValidity.name && (
            <p className={classes["order__error"]}>Enter a valid name</p>
          )}
        </div>
        <div className={classes["order__input-box"]}>
          <label className={classes["order__label"]} htmlFor="city">
            City:
          </label>
          <input
            ref={cityInputRef}
            className={classes["order__input"]}
            type="text"
            id="city"
          />
          {!formInputsValidity.city && (
            <p className={classes["order__error"]}>Enter a valid city name</p>
          )}
        </div>
        <div className={classes["order__input-box"]}>
          <label className={classes["order__label"]} htmlFor="street">
            Street:
          </label>
          <input
            ref={streetInputRef}
            className={classes["order__input"]}
            type="text"
            id="street"
          />
          {!formInputsValidity.street && (
            <p className={classes["order__error"]}>Enter a valid street name</p>
          )}
        </div>
        <div className={classes["order__input-box"]}>
          <label className={classes["order__label"]} htmlFor="code">
            Postac code:
          </label>
          <input
            ref={postalInputRef}
            className={classes["order__input"]}
            type="text"
            id="code"
          />
          {!formInputsValidity.postalCode && (
            <p className={classes["order__error"]}>
              Enter a postal code (5 characters)
            </p>
          )}
        </div>
        <div className={classes["order__order-buttons"]}>
          <Button text="close" outlined onClick={handleHideCart} />
          <Button text="buy" submit />
        </div>
      </form>
    </div>
  );
};

export default Order;
