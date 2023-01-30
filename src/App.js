import React, { useState } from "react";

import Home from "./components/Layout/Home";
import Header from "./components/Layout/Header";
import Meals from "./components/Meals/Meals";
import Cart from "./components/Cart/Cart";
import Footer from "./components/Layout/Footer";

import CartProvider from "./store/CartProvider";

import "./App.scss";

function App() {
  const [isCartVisible, setIsCartVisible] = useState(false);

  const handleHideCart = () => {
    setIsCartVisible(false);
  };

  const handleShowCart = () => {
    setIsCartVisible(true);
  };

  return (
    <CartProvider>
      {isCartVisible && <Cart handleHideCart={handleHideCart} />}
      <Header handleShowCart={handleShowCart} />
      <Home />
      <main>
        <Meals />
      </main>
      <Footer />
    </CartProvider>
  );
}

export default App;
