import { Router } from "express";
import {
    createUser,
    getAllUsers,
    getUserByID,
    updateUserByID,
    deleteUserByID,
    logout,
    login,
    getUserByUsername,
    addFriend,
    // upload
} from "../controllers/user.controller.js"
import { authenticate } from '../config/jwt.config.js'

const router = Router()

router.route('/users')
    .post(createUser)
    .get(authenticate, getAllUsers)

router.route('/users/:id')
    .get(getUserByID)

router.route('/users/username/:username')
    .get(getUserByUsername)

router.route('/user/:id/delete')
    .delete(deleteUserByID)

router.route('/user/:id/update')
    .put(updateUserByID)

router.route('/users/logout')
    .post(logout)

router.route('/users/login')
    .post(login)

router.route('/users/:id/addFriend')
    .put(authenticate, addFriend);

export default router