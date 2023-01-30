import React from "react";

import Button from "../UI/Button";
import Wrapper from "../UI/Wrapper";

import classes from "./Home.module.scss";

import { FaAngleDoubleDown } from "react-icons/fa";
const Home = () => {
  return (
    <section className={classes.home}>
      <Wrapper>
        <div className={classes["home__banner"]}>
          <h1 className={classes["home__heading"]}>food order app</h1>
          <p className={classes["home__subtitle"]}>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit.
            Necessitatibus, eaque.
          </p>
          <a href="#meals">
            <Button shadow text="produkty" />
          </a>
        </div>
        <a href="#meals" className={classes["home__arrow-btn"]}>
          <FaAngleDoubleDown />
        </a>
      </Wrapper>
    </section>
  );
};

export default Home;
