import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchGameById } from '../services/gameService';
import './GameDetails.css';

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
        <div className="game-detail-container">
            <div className="game-header">
                <h2>{game.name}</h2>
                <img src={game.image_url} alt={`${game.name} cover`} />
                <div className="game-price-discount">
                    <div className="price">${game.price}</div>
                    <div className="discount">{game.discount * 100}% off</div>
                </div>
            </div>
            <div className="game-info">    
                <p><br></br><br></br><span>Platform:</span> {game.platform}</p>
                <p><span>Game Edition:</span> {game.game_edition}</p>
                <p><span>Description:</span> {game.description}</p>
                <p><span>Developer:</span> {game.developer}</p>
                <p><span>Publisher:</span> {game.publisher}</p>
                <p><span>Release Date:</span> {game.release_date}</p>
                <p><span>Genre:</span> {game.genre}</p>
                <p><span>Reviews:</span> {game.reviews}</p>
            </div>
        </div>
    );
};

export default GameDetail;