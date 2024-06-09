import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchGames } from '../services/gameService';

const Home = () => {
    const [games, setGames] = useState([]);

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

    return (
        <div>
            <h2>All Games</h2>
                <div className="game-list">
                    {games.map(game => (
                        <div key={game.id} className="game-item">
                            <Link to={`/game/${game.id}`}>
                                <img src={game.image_url} alt={`${game.name} cover`} />
                                <h3>{game.name}</h3>
                                <p>{game.platform}</p>
                                <p>${game.price}</p>
                            </Link>
                        </div>
                    ))}
                </div>
        </div>
    );
};

export default Home;
