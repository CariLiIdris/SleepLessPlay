import Lounge from "../models/lounge.model.js";
import jwt from 'jsonwebtoken'

// C
export const createLounge = async (req, res) => {
    try {
        const token = req.cookies.userToken;
        if (!token) {
            return res.status(401).json({ errormsg: 'No token found. Authorization DENIED!' })
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
    catch (err) {
        console.log(err)
        res.status(400).json(err)
    }
}

// R
export const getAllLounges = async (req, res, next) => {
    try {
        const allLounges = await Lounge.find();
        res.status(200).json(allLounges)
    }
    catch (err) {
        console.log(err);
        res.status(400).json(err);
        next(err)
    }
}

export const getLoungeByID = async (req, res, next) => {
    const { id } = req.params
    try {
        const FOUNDLOUNGE = await Lounge.findById(id);
        console.log("Found Lounge: ", FOUNDLOUNGE, "Received Id: ", id)
        res.status(200).json(FOUNDLOUNGE);
    }
    catch (err) {
        console.log(err)
        res.status(400).json(err)
        next(err)
    }
}

export const getLoungeByName = async (req, res, next) => {
    const { name } = req.params
    try {
        const FOUNDLOUNGE = await Lounge.findOne(name);
        res.status(200).json(FOUNDLOUNGE);
    }
    catch (err) {
        console.log(err);
        res.status(400).json(err)
        next(err)
    }
}

export const getLoungeByAdmin = async (req, res, next) => {
    const { userId } = req.params;
    try {
        const lounges = await Lounge.find({
            $or: [
                { owner: userId },
                { coOwner: userId },
                { admins: userId }
            ]
        });
        res.status(200).json(lounges);
    } catch (err) {
        console.log(err);
        res.status(400).json(err);
        next(err);
    }
}

export const getLoungeByMember = async (req, res, next) => {
    const { userId } = req.params;
    try {
        console.log('Received userId:', userId);
        const lounges = await Lounge.find({
            $or: [
                { owner: userId },
                { coOwner: userId },
                { members: userId }
            ]
        });

        console.log('Found Lounges:', lounges);
        res.status(200).json(lounges);
    } catch (err) {
        console.log("Error retrieving lounges:", err);  // Debugging statement
        res.status(400).json({ message: "Error retrieving lounges", error: err });
        next(err);
    }
}

// U
export const updateLoungeByID = async (req, res, next) => {
    const options = {
        new: true,
        runValidators: true,
    };
    try {
        const updateData = { ...req.body }
        delete updateData._id

        const UPDATED_LOUNGE = await Lounge.findByIdAndUpdate(req.params.id, updateData, options);
        res.status(200).json(UPDATED_LOUNGE);
    }
    catch (err) {
        console.log(err);
        res.status(400).json(err);
        next(err)
    }
}

// D
export const deleteLoungeByID = async (req, res, next) => {
    const { id } = req.params;
    try {
        const DELETED_LOUNGE = await Lounge.findByIdAndDelete(id);
        res.status(200).json(DELETED_LOUNGE);
    }
    catch (err) {
        console.log(err);
        res.status(400).json(err);
        next(err)
    }
}

export const joinLounge = async (req, res, next) => {
    const { loungeId } = req.params;
    const token = req.cookies.userToken;
    if (!token) {
        return res.status(401).json({ errormsg: "No token found. Authorization DENIED!" })
    }
    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        const userId = decoded.userId;

        const lounge = await Lounge.findById(loungeId);
        if (!lounge) {
            return res.status(404).json({ errormsg: "Lounge not found!" })
        }
        if (lounge.members.includes(userId)) {
            return res.status(400).json({ errormsg: "You're already a member!" })
        }

        lounge.members.push(userId);
        await lounge.save();

        res.status(200).json({ msg: 'Successfully joined the lounge', lounge })
    }
    catch (err) {
        console.log(err);
        res.status(500).json(err);
        next(err)
    }
}