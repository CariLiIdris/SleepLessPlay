/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';
import { getAllGames } from '../services/game.services';
import { Link } from 'react-router-dom';

export const Games = () => {
  const [games, setGames] = useState([]);

  // Get all games
  useEffect(() => {
    getAllGames()
      .then(res => setGames(res))
      .catch(err => console.log(err));
  }, []);

  return (
    <div className="gamesContainer">
      {/* Return link */}
      <Link to={'/dashboard'} className="backLink">Home</Link>
      <div className="gameList">
        {/* Games link */}
        {games.map(game => (
          <div key={game._id} className="gameItem">
            <h2>{game.name}</h2>
            <p>{game.description}</p>
            <img src={game.iconUrl} alt="Game Icon" className="gameIcon" />
            <Link to={`/play/game/${game._id}`} className="playLink">PLAY</Link>
          </div>
        ))}
      </div>
    </div>
  )
}