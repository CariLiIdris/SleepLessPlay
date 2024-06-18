import { Router } from "express";
import {
    createUser,
    getAllUsers,
    getUserByID,
    updateUserByID,
    deleteUserByID
} from "../controllers/user.controller.js"

const router = Router()

router.route('/users')
    .post( createUser )
    .get( getAllUsers )
router.route('/users/:id')
    .get( getUserByID )
    .put( updateUserByID )
    .delete( deleteUserByID )

export default router