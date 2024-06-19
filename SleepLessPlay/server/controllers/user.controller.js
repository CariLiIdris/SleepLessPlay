import User from "../models/user.model.js"

// C
export const createUser = async( req, res, next ) => {
    try {
        const USER = await User.create( req.body )
        res.status(200).json(USER)
    }
    catch(err) {
        console.log(err)
        res.status(400).json(err)
        next(err)
    }
}

// R
export const getAllUsers = async (req, res, next) => {
    try {
        const allUsers = await User.find();
        res.status(200).json(allUsers);
    }
    catch (err) {
        console.log(err);
        res.status(400).json(err);
        next(err)
    }
}

export const getUserByID = async (req, res, next) => {
    const { id } = req.params
    try {
        const FOUNDUSER = await User.findById(id);
        res.status(200).json(FOUNDUSER);
    }
    catch (err) {
        console.log(err);
        res.status(400).json(err)
        next(err)
    }
}

// U
export const updateUserByID = async (req, res, next) => {
    const options = {
        new: true,
        runValidators: true,
    };
    try {
        const UPDATED_USER = await User.findByIdAndUpdate(req.params.id, req.body, options);
        res.status(200).json(UPDATED_USER);
    }
    catch (err) {
        console.log(err);
        res.status(400).json(err);
        next(err)
    }
}

// D
export const deleteUserByID = async (req, res, next) => {
    const { id } = req.params
    try {
        const DELETED_USER = await User.findByIdAndDelete(id);
        res.status(200).json(DELETED_USER);
    }
    catch (err) {
        console.log(err);
        res.status(400).json(err);
        next(err)
    }
}