import Lounge from "../models/longe.model.js";
import jwt from 'jsonwebtoken'

// C
export const createLounge = async (req, res, next) => {
    try {
        const token = req.cookies.userToken;
        if(!token) {
            return res.status(401).json({ msg: 'No token found. Authorization DENIED!' })
        }

        const decoded = jwt.verify(token, process.env.SECRET_KEY)
        const userId = decoded.userId;

        const loungeData = {
            ...req.body,
            owner: userId
        }

        const LOUNGE = await Lounge.create(loungeData)
        res.status(200).json({ msg: 'Lounge created successfully', lounge: LOUNGE })
    } 
    catch(err) {
        console.log(err)
        res.status(400).json(err)
        next(err)
    }
}

export const getAllLounges = async (req, res, next) => {
    try{
        const allLounges = await Lounge.find();
        res.status(200).json(allLounges)
    }
    catch (err) {
        console.log(err);
        res.status(400).json(err);
        next(err)
    }
}