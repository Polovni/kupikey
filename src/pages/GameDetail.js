import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchGameById } from '../services/gameService';

const GameDetail = () => {
    const { id } = useParams(); // Get the game ID from URL parameters
    const [game, setGame] = useState(null);

    useEffect(() => {
        const getGame = async () => {
            try {
                const gameData = await fetchGameById(id);
                setGame(gameData);
            } catch (error) {
                console.error('Error fetching game:', error);
            }
        };

        getGame();
    }, [id]);

    if (!game) return <div>Loading...</div>;

    return (
        <div>
            <h2>{game.name}</h2>
            <img src={game.image_url} alt={`${game.name} cover`} />
            <p>Platform: {game.platform}</p>
            <p>Game Edition: {game.game_edition}</p>
            <p>Price: ${game.price}</p>
            <p>Discount: {game.discount * 100}%</p>
            <p>Description: {game.description}</p>
            <p>Developer: {game.developer}</p>
            <p>Publisher: {game.publisher}</p>
            <p>Release Date: {game.release_date}</p>
            <p>Genre: {game.genre}</p>
            <p>Reviews: {game.reviews}</p>
        </div>
    );
};

export default GameDetail;
