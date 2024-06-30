import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/common/Header';
import Home from './pages/Home';
import Auth from './pages/Auth'; // Ensure this is correctly imported
import GameDetail from './pages/GameDetail';
import Cart from './pages/Cart';
import Payment from './pages/Payment';
import Profile from './pages/Profile'; // Ensure this is correctly imported
import ProtectedRoute from './components/ProtectedRoute'; // Ensure this is correctly imported
import { CartProvider } from './context/CartContext';

const App = () => {
    return (
        <CartProvider>
            <Router>
                <div>
                    <Header />
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/login" element={<Auth />} />
                        <Route path="/signup" element={<Auth />} />
                        <Route path="/game/:id" element={<GameDetail />} />
                        <Route path="/cart" element={<ProtectedRoute><Cart /></ProtectedRoute>} />
                        <Route path="/payment" element={<ProtectedRoute><Payment /></ProtectedRoute>} />
                        <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
                    </Routes>
                </div>
            </Router>
        </CartProvider>
    );
};

export default App;
