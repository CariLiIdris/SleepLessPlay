import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getGameByID, createGame, updateGameByID } from '../services/game.services';

export const GameForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [gameData, setGameData] = useState({
    name: '',
    url: '',
    description: '',
    iconUrl: ''
  });

  const [gameErr, setGameErr] = useState({});
  const [formErrors, setFormErrors] = useState({
    name: 'A game needs a name',
    url: 'Please provide a URL for your game',
    description: 'Please give your game a description!'
  });

  useEffect(() => {
    if (id) {
      getGameByID(id)
        .then(res => {
          setGameData(res)
          setFormErrors({
            name: '',
            url: '',
            description: ''
          })
        })
        .catch(err => console.log(err));
    }
  }, [id]);

  const updateGameData = e => {
    const { className, value } = e.target;
    let errormsg = '';
    setGameData(prev => ({
      ...prev,
      [className]: value
    }
    ))

    if (className === 'name') {
      if (value.length === 0) {
        errormsg = 'A game name is required!';
      } else if (value.length < 3) {
        errormsg = 'Game name must be 3 or more characters!';
      } else if (value.length > 255) {
        errormsg = 'Game name must not exceed 255 characters!';
      }
      setFormErrors(prev => ({ ...prev, name: errormsg }));
    }
    if (className === 'url') {
      if (value.length === 0) {
        errormsg = 'A game URL is required!';
      }
      setFormErrors(prev => ({ ...prev, url: errormsg }));
    }
    if (className === 'description') {
      if (value.length === 0) {
        errormsg = 'A game description is required!';
      } else if (value.length < 1) {
        errormsg = 'Game description must be 1 or more characters!';
      }
      setFormErrors(prev => ({ ...prev, description: errormsg }));
    }
  };

  const validateForm = () => {
    return Object.values(formErrors).every(value => value === '');
  };

  const submitHandler = e => {
    e.preventDefault();

    if (id) {
      updateGameByID(id, gameData)
        .then(() => {
          navigate('/games');
        })
        .catch(error => setGameErr(error.response.data));
    } else {
      createGame(gameData)
        .then(() => {
          navigate('/games');
        })
        .catch(error => setGameErr(error.response.data));
    }
  }

  return (
    <div className="gameFormContainer">
      <form onSubmit={submitHandler} className="gameForm">
        <label>
          Game Title:
          <input
            type="text"
            className="name"
            value={gameData.name}
            onChange={updateGameData}
          />
        </label>
        <p className="error">{gameErr?.validationErrors?.name}</p>
        <p className="error">{formErrors?.name}</p>

        <label>
          Game URL:
          <input
            type="text"
            className="url"
            value={gameData.url}
            onChange={updateGameData}
          />
        </label>
        <p className="error">{gameErr?.validationErrors?.url}</p>
        <p className="error">{formErrors?.url}</p>

        <label>
          Icon URL:
          <input
            type="text"
            className="iconUrl"
            value={gameData.iconUrl}
            onChange={updateGameData}
          />
        </label>
        <p className="error">{gameErr?.validationErrors?.iconUrl}</p>
        <p className="error">{formErrors?.iconUrl}</p>

        <label>
          Game Description:
          <textarea
            rows="8"
            cols="50"
            className="description"
            value={gameData.description}
            onChange={updateGameData}
          ></textarea>
        </label>
        <p className="error">{gameErr?.validationErrors?.description}</p>
        <p className="error">{formErrors?.description}</p>

        <button
          type="submit"
          className="submitBttn"
          disabled={!validateForm()}
        >
          {id ? 'Update Game' : 'Create Game'}
        </button>
        <Link to="/games" className="cancelLink">Cancel</Link>
      </form>
    </div>
  );
};