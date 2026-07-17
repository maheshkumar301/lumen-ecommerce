import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('lumen_cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem('lumen_cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product, quantity = 1, color) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id && item.color === color);
      if (existing) {
        return prev.map(item => 
          item.id === product.id && item.color === color 
            ? { ...item, quantity: item.quantity + quantity } 
            : item
        );
      }
      return [...prev, { ...product, quantity, color }];
    });
  };

  const removeFromCart = (productId, color) => {
    setCart(prev => prev.filter(item => !(item.id === productId && item.color === color)));
  };

  const updateQuantity = (productId, color, newQuantity) => {
    if (newQuantity < 1) return;
    setCart(prev => prev.map(item => 
      item.id === productId && item.color === color 
        ? { ...item, quantity: newQuantity } 
        : item
    ));
  };

  const clearCart = () => setCart([]);

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart, totalItems, totalPrice }}>
      {children}
    </CartContext.Provider>
  );
};
