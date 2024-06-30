import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchGames } from '../services/gameService';
import './Home.css';

const Home = ({ searchQuery }) => {
    const [games, setGames] = useState([]);
    const [filteredGames, setFilteredGames] = useState([]);

    useEffect(() => {
        const getGames = async () => {
            try {
                const gamesData = await fetchGames();
                setGames(gamesData);
                setFilteredGames(gamesData); // Initially, display all games
            } catch (error) {
                console.error('Error fetching games:', error);
            }
        };

        getGames();
    }, []);

    useEffect(() => {
        if (searchQuery) {
            setFilteredGames(games.filter(game =>
                game.name && game.name.toLowerCase().includes(searchQuery.toLowerCase())
            ));
        } else {
            setFilteredGames(games); // Reset to all games if search query is empty
        }
    }, [searchQuery, games]);

    const featuredGames = filteredGames.slice(0, 6); // First 6 games
    const platformGames = {
        PC: filteredGames.filter(game => game.platform === 'PC').slice(0, 6),
        PlayStation: filteredGames.filter(game => game.platform === 'PlayStation').slice(0, 6),
        Xbox: filteredGames.filter(game => game.platform === 'Xbox').slice(0, 6),
        Switch: filteredGames.filter(game => game.platform === 'Nintendo Switch').slice(0, 6)
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
                            <h3>{game.name}</h3>
                            <p>{game.platform}</p>
                            <p>${calculateDiscountedPrice(game.price, game.discount)}</p>
                        </Link>
                    </div>
                ))}
            </div>
            {Object.entries(platformGames).map(([platform, games]) => (
                <div key={platform}>
                    <h2>{platform}</h2>
                    <div className="game-list">
                        {games.map(game => (
                            <div key={game.id} className="game-item">
                                <Link to={`/game/${game.id}`}>
                                    <img src={game.image_url} alt={`${game.name} cover`} />
                                    <h3>{game.name}</h3>
                                    <p>{game.platform}</p>
                                    <p>${calculateDiscountedPrice(game.price, game.discount)}</p>
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
