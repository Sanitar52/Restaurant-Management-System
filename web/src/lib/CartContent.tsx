import React, { createContext, useContext, useState } from 'react';

// Create a context with an initial value (an empty array for the cart)
const CartContext = createContext({ cart: [], addToCart: (item: any) => {} });

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addToCart = (item) => {
    // Add the item to the cart
    setCart([...cart, item]);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
