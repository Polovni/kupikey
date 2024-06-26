import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaTrashCan } from 'react-icons/fa6';
import { CartContext } from '../context/CartContext';
import './Cart.css';

const Cart = () => {
    const { cart, removeFromCart } = useContext(CartContext);
    const navigate = useNavigate();

    const handleCheckout = () => {
        navigate('/payment');
    };

    const calculateTotal = () => {
        return cart.reduce((total, game) => total + game.price * (1 - game.discount), 0).toFixed(2);
    };

    const calculateOriginalTotal = () => {
        return cart.reduce((total, game) => total + game.price, 0).toFixed(2);
    };

    const calculateTotalDiscount = () => {
        return cart.reduce((total, game) => total + game.price * game.discount, 0).toFixed(2);
    };

    return (
        <div className="cart-container">
            <div className="cart">
                <h2>Cart</h2>
                <div className="cart-list">
                    {cart.map((game, index) => (
                        <div key={index} className="cart-item">
                            <img src={game.image_url} alt={`${game.name} cover`} className="cart-item-image" />
                            <div className="cart-item-details">
                                <h3>{game.name}</h3>
                                <p>{game.platform}</p>
                                <p>{game.price}€</p>
                            </div>
                            <button onClick={() => removeFromCart(game.id)} className="remove-from-cart-button">
                                <FaTrashCan />
                            </button>
                        </div>
                    ))}
                </div>
            </div>
            <div className="summary">
                <h2>Summary</h2>
                <p>Official price: {calculateOriginalTotal()}€</p>
                <p>Discount: {calculateTotalDiscount()}€</p>
                <p>Subtotal: {calculateTotal()}€</p>
                <button 
                    onClick={handleCheckout} 
                    className="checkout-button" 
                    disabled={cart.length === 0}
                >
                    Go to payment
                </button>
                <p>
                    <Link to="/" className="continue-shopping">Continue shopping</Link>
                </p>
            </div>
        </div>
    );
};

export default Cart;
