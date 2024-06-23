import User from "../models/user.model.js"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import multer from 'multer'

// Storage
const Storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'imageUploads')
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname)
    }
})

export const upload = multer({ storage: Storage })

// C
export const createUser = async (req, res, next) => {
    try {
        const USER = await User.create(req.body)
        const userToken = jwt.sign({
            userId: USER._id, username: USER.username
        }, process.env.SECRET_KEY)
        console.log(userToken);
        res.cookie('userToken', userToken)
        res.status(200).json({ msg: 'success!', user: USER })
    }
    catch (err) {
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

export const getUserByUsername = async (req, res, next) => {
    const { username } = req.params
    try {
        const FOUNDUSER = await User.findOne(username);
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
        const updateData = { ...req.body }
        delete updateData._id

        const UPDATED_USER = await User.findByIdAndUpdate(req.params.id, updateData, options);
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

// Logout
export const logout = async (req, res, next) => {
    res.clearCookie('userToken')
    return res.status(200).json({ message: 'Successfully Logged Out!' })
}

export const login = async (req, res, next) => {
    const {username, password} = req.body
    try {
        const possibleUser = await User.findOne({ username: username });

        if (!possibleUser) {
            return res.status(404).json({ msg: 'User not found' });
        }

        const isCorrectPassword = await bcrypt.compare(password, possibleUser.password);
        if (!isCorrectPassword) {
            return res.status(404).json({ msg: 'Invalid credentials' });
        }

        const userToken = jwt.sign(
            {
                userId: possibleUser._id,
                username: possibleUser.username
            },
            process.env.SECRET_KEY
        );

        res.cookie('userToken', userToken);
        return res.status(200).json(possibleUser);
    } catch (error) {
        return res.status(500).json({ msg: 'Server error' });
    }
}

export const getUserInfoFromToken = () => {
    const token = Cookies.get('userToken');
    if(!token) {
        return null;
    }

    try {
        const userData = jwt.decode(token);
        return userData
    } catch (error) {
        console.log('Invalid token', error)
        return null;
    }
}