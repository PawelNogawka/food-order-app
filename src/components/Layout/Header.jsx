import React, { useRef, useEffect } from "react";

import Wrapper from "../UI/Wrapper";
import HeaderCartButton from "./HeaderCartButton";

import classes from "./Header.module.scss";

const Header = ({ handleShowCart }) => {
  const logoRef = useRef();
  const headerRef = useRef();
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleScroll = () => {
    if (window.scrollY > 0) {
      logoRef.current.style.color = "#FA5D43";
      headerRef.current.style.boxShadow = "0px 10px 20px rgba(0, 0, 0, 0.15)";
      headerRef.current.style.backgroundColor = "white";
    } else {
      logoRef.current.style.color = "white";
      headerRef.current.style.boxShadow = "";
      headerRef.current.style.backgroundColor = "transparent";
    }
  };
  return (
    <header ref={headerRef} className={classes.header}>
      <Wrapper>
        <div className={classes["header__container"]}>
          <a ref={logoRef} className={classes["header__logo"]} href="/">
            food order
          </a>
          <HeaderCartButton handleShowCart={handleShowCart} />
        </div>
      </Wrapper>
    </header>
  );
};

export default Header;
