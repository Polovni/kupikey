import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/common/Header';
import Home from './pages/Home';
import Auth from './pages/Auth'; // Import the Auth component which contains both Login and SignUp
import GameDetail from './pages/GameDetail';
import Cart from './pages/Cart';
import Payment from './pages/Payment';
import Profile from './pages/Profile';
import ProtectedRoute from './components/ProtectedRoute';

const App = () => {
    return (
        <Router>
            <div>
                <Header />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path='/login' element={<Auth />} />
                    <Route path="/game/:id" element={<GameDetail />} /> {/* Make sure this route is defined */}
                </Routes>
            </div>
        </Router>
    );
};

export default App;
