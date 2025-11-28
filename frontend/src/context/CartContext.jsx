import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within CartProvider');
    }
    return context;
};

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);
    const [isCartOpen, setIsCartOpen] = useState(false);

    // Calculate total items in cart
    const getTotalItems = () => {
        return cartItems.reduce((total, item) => total + item.quantity, 0);
    };

    // Calculate total price
    const getTotalPrice = () => {
        return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
    };

    // Add item to cart
    const addToCart = (item) => {
        setCartItems(prevItems => {
            const existingItem = prevItems.find(cartItem => cartItem._id === item._id);

            if (existingItem) {
                // Item already in cart, increase quantity
                return prevItems.map(cartItem =>
                    cartItem._id === item._id
                        ? { ...cartItem, quantity: cartItem.quantity + 1 }
                        : cartItem
                );
            } else {
                // New item, add to cart
                return [...prevItems, { ...item, quantity: 1 }];
            }
        });
    };

    // Remove item from cart
    const removeFromCart = (itemId) => {
        setCartItems(prevItems => prevItems.filter(item => item._id !== itemId));
    };

    // Update item quantity
    const updateQuantity = (itemId, newQuantity) => {
        if (newQuantity <= 0) {
            removeFromCart(itemId);
            return;
        }

        setCartItems(prevItems =>
            prevItems.map(item =>
                item._id === itemId ? { ...item, quantity: newQuantity } : item
            )
        );
    };

    // Increase quantity
    const increaseQuantity = (itemId) => {
        setCartItems(prevItems =>
            prevItems.map(item =>
                item._id === itemId ? { ...item, quantity: item.quantity + 1 } : item
            )
        );
    };

    // Decrease quantity
    const decreaseQuantity = (itemId) => {
        setCartItems(prevItems =>
            prevItems.map(item => {
                if (item._id === itemId) {
                    if (item.quantity > 1) {
                        return { ...item, quantity: item.quantity - 1 };
                    } else {
                        return null; // Will be filtered out
                    }
                }
                return item;
            }).filter(item => item !== null)
        );
    };

    // Clear entire cart
    const clearCart = () => {
        setCartItems([]);
    };

    // Toggle cart visibility
    const toggleCart = () => {
        setIsCartOpen(!isCartOpen);
    };

    const value = {
        cartItems,
        isCartOpen,
        addToCart,
        removeFromCart,
        updateQuantity,
        increaseQuantity,
        decreaseQuantity,
        clearCart,
        toggleCart,
        setIsCartOpen,
        getTotalItems,
        getTotalPrice,
    };

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};