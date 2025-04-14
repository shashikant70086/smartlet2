import React, { createContext, useState, useContext } from 'react';

// Create context
export const CartContext = createContext();

// Create custom hook for accessing cart context
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

// Create provider component
export const CartProvider = ({ children }) => {
  const [items, setItems] = useState([]);
  
  // Add item to cart
  const addItem = (product, quantity = 1) => {
    setItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id);
      
      if (existingItem) {
        // Update quantity if item already exists
        return prevItems.map(item => 
          item.id === product.id 
            ? { ...item, quantity: item.quantity + quantity } 
            : item
        );
      } else {
        // Add new item
        return [...prevItems, { ...product, quantity }];
      }
    });
  };
  
  // Remove item from cart
  const removeItem = (productId) => {
    setItems(prevItems => prevItems.filter(item => item.id !== productId));
  };
  
  // Update item quantity
  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeItem(productId);
      return;
    }
    
    setItems(prevItems => 
      prevItems.map(item => 
        item.id === productId ? { ...item, quantity } : item
      )
    );
  };
  
  // Clear cart
  const clearCart = () => {
    setItems([]);
  };
  
  // Calculate total items in cart
  const itemCount = items.reduce((count, item) => count + item.quantity, 0);
  
  // Calculate subtotal
  const subtotal = items.reduce(
    (total, item) => total + item.price * item.quantity, 
    0
  );
  
  return (
    <CartContext.Provider value={{
      items,
      itemCount,
      subtotal,
      addItem,
      removeItem,
      updateQuantity,
      clearCart
    }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;