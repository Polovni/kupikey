import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/common/Header';
import Home from './pages/Home';
import Auth from './pages/Auth';
import GameDetail from './pages/GameDetail';
import Cart from './pages/Cart';
import Payment from './pages/Payment';
import Profile from './pages/Profile';
import ProtectedRoute from './components/ProtectedRoute';
import { CartProvider } from './context/CartContext';

const App = () => {
    const [searchQuery, setSearchQuery] = useState('');

    return (
        <CartProvider>
            <Router>
                <div>
                    <Header searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
                    <Routes>
                        <Route path="/" element={<Home searchQuery={searchQuery} />} />
                        <Route path="/login" element={<Auth />} />
                        <Route path="/signup" element={<Auth />} />
                        <Route path="/game/:id" element={<GameDetail />} />
                        <Route path="/cart" element={<Cart />} />
                        <Route path="/payment" element={<ProtectedRoute><Payment /></ProtectedRoute>} />
                        <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
                    </Routes>
                </div>
            </Router>
        </CartProvider>
    );
};

export default App;
