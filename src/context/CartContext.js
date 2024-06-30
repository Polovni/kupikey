import React, { createContext, useState } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);
    const [notification, setNotification] = useState('');

    const addToCart = (game) => {
        const isGameInCart = cart.some(cartItem => cartItem.id === game.id);

        if (isGameInCart) {
            setNotification('Game is already in the cart');
            setTimeout(() => setNotification(''), 2000);
        } else {
            setCart(prevCart => [...prevCart, game]);
            setNotification('Game added to cart');
            setTimeout(() => setNotification(''), 2000);
        }
    };

    const removeFromCart = (gameId) => {
        setCart(prevCart => prevCart.filter(game => game.id !== gameId));
    };

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, notification }}>
            {children}
        </CartContext.Provider>
    );
};
