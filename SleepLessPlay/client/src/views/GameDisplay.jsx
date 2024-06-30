/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';
import { getGameByID } from '../services/game.services';
import { Link, useParams } from 'react-router-dom';

export const GameDisplay = () => {
  const [game, setGame] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    getGameByID(id)
      .then(res => setGame(res))
      .catch(err => console.log(err));
  }, [id]);

  return (
    <div className="gameContainer">
      <Link to={'/games'} className="backLink">Return</Link>
      <div className="game">
        <h2>{game.name}</h2>
        <p>{game.description}</p>
        <iframe
          src={game.url}
          width="100%"
          height="700px"
          title={game.name}
          className="gameIframe"
        ></iframe>
      </div>
    </div>
  )
}