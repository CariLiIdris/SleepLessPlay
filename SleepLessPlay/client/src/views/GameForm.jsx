import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getGameByID, createGame, updateGameByID } from '../services/game.services';

export const GameForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  // Game data
  const [gameData, setGameData] = useState({
    name: '',
    url: '',
    description: '',
    iconUrl: ''
  });

  // Front end errors
  const [gameErr, setGameErr] = useState({});
  // Back end errors
  const [formErrors, setFormErrors] = useState({
    name: 'A game needs a name',
    url: 'Please provide a URL for your game',
    description: 'Please give your game a description!'
  });

  // Get game by id
  useEffect(() => {
    if (id) {
      getGameByID(id)
        .then(res => {
          setGameData(res)
          // If data is found reset errors
          setFormErrors({
            name: '',
            url: '',
            description: ''
          })
        })
        .catch(err => console.log(err));
    }
  }, [id]);

  // Handle inputs and errors
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

  // Validate front end errors for submit
  const validateForm = () => {
    return Object.values(formErrors).every(value => value === '');
  };

  // Submit handler
  const submitHandler = e => {
    e.preventDefault();

    // If we are updating use update instead of create
    if (id) {
      updateGameByID(id, gameData)
        .then(() => {
          navigate('/games');
        })
        .catch(error => setGameErr(error.response.data.errors));
    }
    // Otherwise vise versa
    else {
      createGame(gameData)
        .then(() => {
          navigate('/games');
        })
        .catch(error => setGameErr(error.response.data.errors));
    }
  }

  return (
    <div className="gameFormContainer">
      {/* Form */}
      <form onSubmit={submitHandler} className="gameForm">
        {/* Name */}
        <label>
          Game Title:
          <input
            type="text"
            className="name"
            value={gameData.name}
            onChange={updateGameData}
          />
        </label>
        <p className="error">{gameErr.name?.message}</p>
        <p className="error">{formErrors?.name}</p>
        {/* Game Url */}
        <label>
          Game URL:
          <input
            type="text"
            className="url"
            value={gameData.url}
            onChange={updateGameData}
          />
        </label>
        <p className="error">{gameErr.url?.message}</p>
        <p className="error">{formErrors?.url}</p>
        {/* Game Icon */}
        <label>
          Icon URL:
          <input
            type="text"
            className="iconUrl"
            value={gameData.iconUrl}
            onChange={updateGameData}
          />
        </label>
        <p className="error">{gameErr.iconUrl?.message}</p>
        <p className="error">{formErrors?.iconUrl}</p>
        {/* Game description */}
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
        <p className="error">{gameErr.description?.message}</p>
        <p className="error">{formErrors?.description}</p>

        {/* Submit button */}
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