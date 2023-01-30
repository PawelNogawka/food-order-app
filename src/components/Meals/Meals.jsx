import React, { useEffect, useState } from "react";

import Wrapper from "../../components/UI/Wrapper";
import Meal from "./Meal";
import Loader from "../UI/Loader";
import Error from "../UI/Error";

import classes from "./Meals.module.scss";

import { TailSpin } from "react-loader-spinner";

const Meals = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState();
  const [meals, setMeals] = useState([]);

  useEffect(() => {
    const getMeals = async () => {
      const response = await fetch(
        "https://food-d3dee-default-rtdb.europe-west1.firebasedatabase.app/meals.json"
      );

      if (!response.ok) {
        throw new Error("something went wrong");
      }
      const meals = await response.json();

      const mealsArray = [];

      for (const key in meals) {
        mealsArray.push({
          id: key,
          name: meals[key].name,
          price: meals[key].price,
          desc: meals[key].description,
          rating: meals[key].rating,
          image: meals[key].image,
        });
      }

      setMeals(mealsArray);
      setIsLoading(false);
    };

    getMeals().catch((error) => {
      setIsLoading(false);
      setError(error.message);
    });
  }, []);

  if (isLoading) {
    return (
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
    );
  }

  if (error) {
    return (
      <Error>
        <p>{error}</p>
      </Error>
    );
  }

  return (
    <section id="meals" className={classes.meals}>
      <Wrapper>
        <h2 className={classes["meals__heading"]}>
          Choose the right food for you
        </h2>
        <div className={classes["meals__container"]}>
          {meals.map((meal) => (
            <Meal
              key={meal.id}
              id={meal.id}
              desc={meal.desc}
              name={meal.name}
              price={meal.price}
              rating={meal.rating}
              image={meal.image}
            />
          ))}
        </div>
      </Wrapper>
    </section>
  );
};

export default Meals;
