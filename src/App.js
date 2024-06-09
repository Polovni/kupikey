import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/common/Header';
import Home from './pages/Home';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import GameDetail from './pages/GameDetail';
import Cart from './pages/Cart';
import Payment from './pages/Payment';
import Profile from './pages/Profile';

const App = () => {
    return (
        <Router>
            <div>
                <Header />
                <Routes>
                    <Route path="/" exact component={Home} />
                    <Route path="/login" component={Login} />
                    <Route path="/signup" component={SignUp} />
                    <Route path="/game/:id" component={GameDetail} />
                    <Route path="/cart" component={Cart} />
                    <Route path="/payment" component={Payment} />
                    <Route path="/profile" component={Profile} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
