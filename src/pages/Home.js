import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { fetchGames } from '../services/gameService';
import './Home.css';

const Home = ({ searchQuery }) => {
    const [games, setGames] = useState([]);
    const location = useLocation();

    useEffect(() => {
        const getGames = async () => {
            try {
                const gamesData = await fetchGames();
                setGames(gamesData);
            } catch (error) {
                console.error('Error fetching games:', error);
            }
        };

        getGames();
    }, []);

    // Handle scroll to section when navigating to the home page
    useEffect(() => {
        if (location.state && location.state.sectionId) {
            const sectionId = location.state.sectionId;

            // Delay scrolling to allow the DOM to fully render
            setTimeout(() => {
                const sectionElement = document.getElementById(sectionId);

                if (sectionElement) {
                    sectionElement.scrollIntoView({ behavior: 'smooth' });
                }
            }, 300); // Adjust the delay if necessary

            // Clear the state after scrolling
            window.history.replaceState({}, document.title);
        }
    }, [location.state]);

    const filteredGames = games.filter(game =>
        game.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const featuredGames = filteredGames.slice(0, 6); // First 6 games
    const platformGames = {
        PC: filteredGames.filter(game => game.platform === 'PC').slice(0, 6),
        PlayStation: filteredGames.filter(game => game.platform === 'PlayStation').slice(0, 6),
        Xbox: filteredGames.filter(game => game.platform === 'Xbox').slice(0, 6),
        Nintendo: filteredGames.filter(game => game.platform === 'Nintendo Switch').slice(0, 6)
    };

    const calculateDiscountedPrice = (price, discount) => {
        const discountedPrice = price * (1 - discount);
        return discountedPrice.toFixed(2); // Round to 2 decimal places
    };

    return (
        <div>
            <h2>Featured Games</h2>
            <div className="game-list">
                {featuredGames.map(game => (
                    <div key={game.id} className="game-item">
                        <Link to={`/game/${game.id}`}>
                            <img src={game.image_url} alt={`${game.name} cover`} />
                            <div>
                                <h3>{game.name}</h3>
                                <div className="price">${calculateDiscountedPrice(game.price, game.discount)}</div>
                            </div>
                        </Link>
                    </div>
                ))}
            </div>
            {Object.entries(platformGames).map(([platform, games]) => (
                <div key={platform} id={`${platform.toLowerCase()}-section`}>
                    <h2>{platform}</h2>
                    <div className="game-list">
                        {games.map(game => (
                            <div key={game.id} className="game-item">
                                <Link to={`/game/${game.id}`}>
                                    <img src={game.image_url} alt={`${game.name} cover`} />
                                    <div>
                                        <h3>{game.name}</h3>
                                        <div className="price">${calculateDiscountedPrice(game.price, game.discount)}</div>
                                    </div>
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Home;
