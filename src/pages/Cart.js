import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import './Cart.css'; // Make sure to create this file for styling

const Cart = () => {
    const { cart, removeFromCart } = useContext(CartContext);

    return (
        <div>
            <h2>Your Cart</h2>
            <div className="cart-list">
                {cart.map((game, index) => (
                    <div key={index} className="cart-item">
                        <img src={game.image_url} alt={`${game.name} cover`} />
                        <div className="cart-item-details">
                            <h3>{game.name}</h3>
                            <p>{game.platform}</p>
                            <p>${game.price}</p>
                            <button onClick={() => removeFromCart(game.id)} className="remove-from-cart-button">Remove</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Cart;
