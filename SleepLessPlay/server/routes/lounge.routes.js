import { Router } from "express";
import {
    createLounge,
    getAllLounges,
    getLoungeByID,
    updateLoungeByID,
    deleteLoungeByID,
    getLoungeByMember,
    joinLounge
} from '../controllers/lounge.controller.js'
import { authenticate } from '../config/jwt.config.js'

const loungeRouter = Router()

loungeRouter.route('/lounges')
    .get(getAllLounges)
    .post(authenticate, createLounge)
loungeRouter.route('/lounges/:id')
    .get(getLoungeByID)
loungeRouter.route('/lounges/:userId')
    .get(getLoungeByMember)
loungeRouter.route('/lounge/:id/delete')
    .delete(authenticate, deleteLoungeByID)
loungeRouter.route('/lounge/:id/update')
    .put(updateLoungeByID)
loungeRouter.route('/lounge/join/:loungeId')
    .post(authenticate, joinLounge)
export default loungeRouter