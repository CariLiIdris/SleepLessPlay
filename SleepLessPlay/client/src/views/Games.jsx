/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';
import { getAllGames } from '../services/game.services';
import { Link } from 'react-router-dom';

export const Games = () => {
  const [games, setGames] = useState([]);

  useEffect(() => {
    getAllGames()
      .then(res => setGames(res))
      .catch(err => console.log(err));
  }, []);

  return (
    <div className="gamesContainer">
      <h1>Games</h1>
      <div className="gameList">
        {games.map(game => (
          <div key={game._id} className="gameItem">
            <h2>{game.name}</h2>
            <p>{game.description}</p>
            <iframe
              src={game.url}
              width="100%"
              height="700px"
              title={game.name}
              style={{ border: 'none' }}
            ></iframe>
          </div>
        ))}
      </div>
    </div>
  );
};