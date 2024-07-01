import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import './Payment.css';

const Checkout = () => {
    const { cart, clearCart } = useContext(CartContext);
    const [isFormValid, setIsFormValid] = useState(false);
    const [billingInfo, setBillingInfo] = useState({
        name: '',
        address: '',
        city: '',
        state: '',
        zip: '',
        country: '',
    });
    const [creditCardInfo, setCreditCardInfo] = useState({
        cardNumber: '',
        expiry: '',
        cvv: '',
    });
    const [showNotification, setShowNotification] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const isBillingInfoComplete = Object.values(billingInfo).every(field => field !== '');
        const isCreditCardInfoComplete = Object.values(creditCardInfo).every(field => field !== '');
        setIsFormValid(isBillingInfoComplete && isCreditCardInfoComplete);
    }, [billingInfo, creditCardInfo]);

    const handleBillingInfoChange = (e) => {
        const { name, value } = e.target;
        setBillingInfo({ ...billingInfo, [name]: value });
    };

    const handleCreditCardInfoChange = (e) => {
        const { name, value } = e.target;
        setCreditCardInfo({ ...creditCardInfo, [name]: value });
    };

    const calculateTotal = () => {
        return cart.reduce((total, game) => total + game.price * (1 - game.discount), 0).toFixed(2);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setShowNotification(true);
        setTimeout(() => {
            clearCart();
            setShowNotification(false);
            navigate('/');
        }, 3000); // 3 seconds
    };

    return (
        <div className="checkout-container">
            <div className="checkout-form">
                <h2>Checkout</h2>
                <div className="billing-info">
                    <h3>Billing Information</h3>
                    <form>
                        <div>
                            <label>Name:</label>
                            <input type="text" name="name" value={billingInfo.name} onChange={handleBillingInfoChange} required />
                        </div>
                        <div>
                            <label>Address:</label>
                            <input type="text" name="address" value={billingInfo.address} onChange={handleBillingInfoChange} required />
                        </div>
                        <div>
                            <label>City:</label>
                            <input type="text" name="city" value={billingInfo.city} onChange={handleBillingInfoChange} required />
                        </div>
                        <div>
                            <label>State:</label>
                            <input type="text" name="state" value={billingInfo.state} onChange={handleBillingInfoChange} required />
                        </div>
                        <div>
                            <label>Zip Code:</label>
                            <input type="text" name="zip" value={billingInfo.zip} onChange={handleBillingInfoChange} required />
                        </div>
                        <div>
                            <label>Country:</label>
                            <input type="text" name="country" value={billingInfo.country} onChange={handleBillingInfoChange} required />
                        </div>
                    </form>
                </div>
                <div className="credit-card-info">
                    <h3>Credit Card Information</h3>
                    <form>
                        <div>
                            <label>Card Number:</label>
                            <input type="text" name="cardNumber" value={creditCardInfo.cardNumber} onChange={handleCreditCardInfoChange} required />
                        </div>
                        <div>
                            <label>Expiration Date:</label>
                            <input type="text" name="expiry" value={creditCardInfo.expiry} onChange={handleCreditCardInfoChange} placeholder="MM/YY" required />
                        </div>
                        <div>
                            <label>CVV:</label>
                            <input type="text" name="cvv" value={creditCardInfo.cvv} onChange={handleCreditCardInfoChange} required />
                        </div>
                    </form>
                </div>
            </div>
            <div className="summary">
                <h3>Summary</h3>
                <ul>
                    {cart.map((game, index) => (
                        <li key={index}>
                            {game.name} - ${(game.price * (1 - game.discount)).toFixed(2)}
                        </li>
                    ))}
                </ul>
                <p>Total: ${calculateTotal()}</p>
                <button 
                    type="submit" 
                    className={`submit-button ${!isFormValid ? 'disabled' : ''}`} 
                    disabled={!isFormValid}
                    onClick={handleSubmit}
                >
                    Place Order
                </button>
            </div>
            {showNotification && (
                <div className="notification-overlay">
                    <div className="notification">
                        <p>Your digital products will be sent to your email address.</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Checkout;
