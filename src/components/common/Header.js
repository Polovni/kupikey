import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faUser, faBars, faSearch } from '@fortawesome/free-solid-svg-icons';
import logo from '../../assets/images/Image 3.png';
import './Header.css';
import { CartContext } from '../../context/CartContext';

const Header = ({ searchQuery, setSearchQuery }) => {
    const { cart } = useContext(CartContext);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const toggleSearch = () => {
        setIsSearchOpen(!isSearchOpen);
    };

    const scrollToSection = (id) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <>
            <nav className="header">
                <div className="header-left">
                    <button className="menu-button" onClick={toggleMenu}>
                        <FontAwesomeIcon icon={faBars} />
                    </button>
                    <Link to="/" className="header-logo-link">
                        <div className="header-logo">
                            <img src={logo} alt="site logo" />
                        </div>
                        <span className="header-title">Kupi Key</span>
                    </Link>
                </div>
                <ul className={`navbar-links ${isMenuOpen ? 'open' : ''}`}>
                    <li><Link to="/" onClick={(e) => { e.preventDefault(); scrollToSection('pc-section'); }}>PC</Link></li>
                    <li><Link to="/" onClick={(e) => { e.preventDefault(); scrollToSection('playstation-section'); }}>PLAYSTATION</Link></li>
                    <li><Link to="/" onClick={(e) => { e.preventDefault(); scrollToSection('xbox-section'); }}>XBOX</Link></li>
                    <li><Link to="/" onClick={(e) => { e.preventDefault(); scrollToSection('nintendo-section'); }}>NINTENDO</Link></li>
                    <li className="profile-link-mobile"><Link to="/profile">PROFILE</Link></li> {/* Profile link for mobile view */}
                </ul>
                <div className="header-right">
                    <button className="search-button" onClick={toggleSearch}>
                        <FontAwesomeIcon icon={faSearch} />
                    </button>
                    <Link to="/cart" className="icon-link">
                        <FontAwesomeIcon icon={faShoppingCart} className="icon" />
                        {cart.length > 0 && <span className="cart-count">{cart.length}</span>}
                    </Link>
                    <Link to="/profile" className="icon-link profile-icon">
                        <FontAwesomeIcon icon={faUser} className="icon" />
                    </Link>
                </div>
                {isMenuOpen && <div className="overlay" onClick={toggleMenu}></div>}
            </nav>
            <div className={`search-bar-container ${isSearchOpen ? 'active' : ''}`}>
                <input
                    type="text"
                    placeholder="Search..."
                    className="search-bar"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>
        </>
    );
};

export default Header;
