import { Router } from "express";
import {
    createUser,
    getAllUsers,
    getUserByID,
    updateUserByID,
    deleteUserByID,
    logout,
    login,
    upload
} from "../controllers/user.controller.js"
import { authenticate } from '../config/jwt.config.js'

const router = Router()

router.route('/users')
    .post(createUser)
    .get(authenticate, getAllUsers)

router.route('/users/:id')
    .get(getUserByID)

router.route('/user/:id/delete')
    .delete(deleteUserByID)

router.route('/user/:id/update')
    .put(upload.single('userIcon'), updateUserByID)

router.route('/users/logout')
    .post(logout)

router.route('/users/login')
    .post(login)

export default router