import { Router } from 'express';
import {
  createGame,
  getAllGames,
  getGameByID,
  updateGameByID,
  deleteGameByID,
} from '../controllers/game.controller.js';

const gameRouter = Router()

gameRouter.route('/games')
  .post(createGame)
  .get(getAllGames)

gameRouter.route('/games/:id')
  .get(getGameByID)

gameRouter.route('/games/:id/update')
  .put(updateGameByID)

gameRouter.route('/games/:id/delete')
  .delete(deleteGameByID)

export default gameRouter