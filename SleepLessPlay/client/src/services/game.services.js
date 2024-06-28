/* eslint-disable no-useless-catch */
import axios from 'axios';

const GAME_INSTANCE = axios.create({
  baseURL: 'http://localhost:8002/games',
  withCredentials: true
})

// C
export const createGame = async (gameData) => {
  try {
    const res = await GAME_INSTANCE.post('/games', gameData, { withCredentials: true });
    console.log(res.data)
    return res.data
  }
  catch (err) { throw err }
}

// R
export const getAllGames = async () => {
  try {
    const res = await GAME_INSTANCE.get('/games');
    return res.data
  }
  catch (err) { throw err }
}

export const getGameByID = async gameId => {
  try {
    const res = await GAME_INSTANCE.get(`/games/${gameId}`);
    return res.data;
  }
  catch (err) { throw err }
}

// U
export const updateGameByID = async (id, gameData) => {
  try {
    const res = await GAME_INSTANCE.put(`/games/${id}`, gameData);
    return res.data;
  }
  catch (err) { throw err }
}

// Delete a game by ID
export const deleteGameByID = async (id) => {
  try {
    const res = await GAME_INSTANCE.delete(`/games/${id}`);
    return res.data;
  } catch (err) {
    throw err;
  }
};