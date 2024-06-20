import { Router } from "express";
import {
    register,
    getAllUsers,
    getUserByID,
    updateUserByID,
    deleteUserByID
} from "../controllers/user.controller.js"

const router = Router()

router.route('/users')
    .post( register )
    .get( getAllUsers )
router.route('/users/:id')
    .get( getUserByID )
    .put( updateUserByID )
    .delete( deleteUserByID )

export default router