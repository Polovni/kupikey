import React, { createContext, useState } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);
    const [purchases, setPurchases] = useState([]);

    const addToCart = (game) => {
        setCart(prevCart => [...prevCart, game]);
    };

    const removeFromCart = (gameId) => {
        setCart(prevCart => prevCart.filter(game => game.id !== gameId));
    };

    const clearCart = () => {
        setCart([]);
    };

    const generateActivationCode = () => {
        return Math.random().toString(36).substring(2, 15).toUpperCase();
    };

    const finalizePurchase = () => {
        const purchasedGames = cart.map(game => ({
            ...game,
            activationCode: generateActivationCode(),
        }));
        
        setPurchases([...purchases, ...purchasedGames]);
        clearCart(); // Clear cart after purchase
    };

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, purchases, finalizePurchase }}>
            {children}
        </CartContext.Provider>
    );
};
