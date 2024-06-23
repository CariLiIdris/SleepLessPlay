import { Router } from "express";
import {
    createLounge,
} from '../controllers/lounge.controller.js'
import { authenticate } from '../config/jwt.config.js'

const loungeRouter = Router()

loungeRouter.route('/lounges')
    .get( )
    .post( authenticate, createLounge )

loungeRouter.route('/lounges/:id')


export default loungeRouter