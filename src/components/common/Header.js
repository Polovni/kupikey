import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faUser } from '@fortawesome/free-solid-svg-icons';
import logo from '../../assets/images/Image 3.png';
import './Header.css';

const Header = () => {
    const scrollToSection = (id) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <nav className="header">
            <div className="header-left">
                <Link to="/" className="header-logo-link">
                    <div className="header-logo">
                        <img src={logo} alt="site logo" />
                    </div>
                    <span className="header-title">Kupi Key</span>
                </Link>
            </div>
            <ul className="navbar-links">
                <li><Link to="/" onClick={(e) => { e.preventDefault(); scrollToSection('pc'); }}>PC</Link></li>
                <li><Link to="/" onClick={(e) => { e.preventDefault(); scrollToSection('playstation'); }}>PLAYSTATION</Link></li>
                <li><Link to="/" onClick={(e) => { e.preventDefault(); scrollToSection('xbox'); }}>XBOX</Link></li>
                <li><Link to="/" onClick={(e) => { e.preventDefault(); scrollToSection('nintendo'); }}>NINTENDO</Link></li>
            </ul>
            <div className="header-right">
                <input type="text" placeholder="Search..." className="search-bar" />
                <Link to="/cart" className="icon-link">
                    <FontAwesomeIcon icon={faShoppingCart} className="icon" />
                </Link>
                <Link to="/login" className="icon-link">
                    <FontAwesomeIcon icon={faUser} className="icon" />
                </Link>
            </div>
        </nav>
    );
};

export default Header;
