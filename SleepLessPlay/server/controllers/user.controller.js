import User from "../models/user.model.js"
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

// C
export const createUser = async (req, res, next) => {
    try {
        const USER = await User.create(req.body)
        res.status(200).json({ msg: 'success!', user: USER })
    }
    catch (err) {
        console.log(err)
        res.status(400).json(err)
        next(err)
    }
}
// Register User
export const register = async (req, res, next) => {
    User.create(req.body)
        .then(user => {
            const userToken = jwt.sign({
                id: user._id
            }, process.env.SECRET_KEY);

            res
                .cookie('usertoken', userToken, secret, {
                    httpOnly: true
                })
                .json({ msg: 'success!', user: user })
        })
        .catch(err => res.json(err));
}
export const login = async (req, res, next) => {
    const user = await User.findOne({ email: req.body.email });

    if (user === null) {
        return res.Status(400);
    }

    const correctPassword = await bcrypt.compare(req.body.password, user.password);

    if (!correctPassword) {
        return res.Status(400);
    }

    const userToken = jwt.sign({
        id: user._id
    }, process.env.SECRET_KEY);

    res
        .cookie('usertoken', userToken, secret, {
            httpOnly: true
        })
        .json({ msg: 'success!' })
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