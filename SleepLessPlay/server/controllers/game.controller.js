import Game from "../models/game.model.js";
import jwt from 'jsonwebtoken'

// C
export const createGame = async (req, res) => {
  try {
    const token = req.cookies.userToken;
    if (!token) {
      return res.status(401).json({ errormsg: 'No token found. Authorization DENIED!' })
    }

    const decoded = jwt.verify(token, process.env.SECRET_KEY)
    const userId = decoded.userId;

    const gameData = {
      ...req.body,
      dev: userId
    }
    console.log(req.body)

    const GAME = await Game.create(gameData);
    res.status(200).json({ msg: 'Game created successfully', game: GAME });
  }
  catch (err) {
    console.log(err)
    res.status(400).json(err)
  }
}

// R
export const getAllGames = async (req, res, next) => {
  try {
    const allGames = await Game.find();
    res.status(200).json(allGames);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
    next(err)
  }
}

export const getGameByID = async (req, res, next) => {
  const { id } = req.params
  try {
    const GAME = await Game.findById(id);
    res.status(200).json(GAME);
  }
  catch (err) {
    console.log(err);
    res.status(400).json(err);
    next(err)
  }
}

// U
export const updateGameByID = async (req, res, next) => {
  const options = {
    new: true,
    runValidators: true,
  };
  try {
    const updateData = { ...req.body }
    delete updateData._id

    const UPDATED_GAME = await Game.findByIdAndUpdate(req.params.id, updateData, options);
    res.status(200).json(UPDATED_GAME);
  }
  catch (err) {
    console.log(err);
    res.status(400).json(err);
    next(err)
  }
}

// D
export const deleteGameByID = async (req, res, next) => {
  try {
    const { id } = req.params;
    const DELETED_GAME = await Game.findByIdAndDelete(id);
    res.status(200).json(DELETED_GAME);
  }
  catch (err) {
    console.log(err);
    res.status(400).json(err);
    next(err)
  }
};