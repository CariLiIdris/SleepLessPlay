import axios from 'axios';
import User from "../models/user.model.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import multer from 'multer';
import path from 'path'

// // Storage
// const Storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, 'uploads/');
//     },
//     filename: (req, file, cb) => {
//         cb(null, Date.now() + path.extname(file.originalname));
//         console.log(file)
//     }
// });

// export const upload = multer({ storage: Storage });

// C
export const createUser = async (req, res) => {
    try {
        const USER = await User.create(req.body);

        const userToken = jwt.sign({
            userId: USER._id,
            username: USER.username
        }, process.env.SECRET_KEY);

        res.cookie('userToken', userToken);
        res.status(200).json({ msg: 'success!', user: USER });

        try {
            const r = await axios.post(
                'https://api.chatengine.io/users/',
                {
                    username: USER.username,
                    secret: USER._id,
                    email: USER.email,
                    first_name: USER.fName,
                    last_name: USER.lName
                },
                {
                    headers: {
                        "private-key": "b0631ade-f5b6-4fd6-836c-6d805767b978"
                    }
                }
            );
            console.log('ChatEngine user created:', r.data);
        } catch (e) {
            console.error('ChatEngine error:', e.response?.data);
            // MAYBE handle creation error (e.g., logging, notification)
        }
    } catch (err) {
        console.error(err);
        res.status(400).json(err);
    }
};

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

export const searchUsers = async (req, res, next) => {
    try {
        const { q } = req.query;
        // Case-insensitive search
        const searchQuery = q ? { username: new RegExp(q, 'i') } : {}
        const allUsers = await User.find(searchQuery);
        res.status(200).json(allUsers);
    } catch (err) {
        console.log(err)
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
    const { username } = req.params;
    try {
        const FOUNDUSER = await User.findOne({ username: username })
        // console.log(FOUNDUSER, "FOUND USER", 'USERNAME: ', username)
        if (!FOUNDUSER) {
            return res.status(404).json({ message: 'User not found' })
        }
        res.status(200).json(FOUNDUSER);
    }
    catch (err) {
        console.log(err)
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
        const updateData = { ...req.body };

        delete updateData._id;

        const UPDATED_USER = await User.findByIdAndUpdate(req.params.id, updateData, options);
        res.status(200).json(UPDATED_USER);
    } catch (err) {
        console.log(err);
        res.status(400).json(err);
        next(err);
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

// Login
export const login = async (req, res, next) => {
    const { username, password } = req.body
    try {
        const possibleUser = await User.findOne({ username: username });

        if (!possibleUser) {
            return res.status(404).json({ errormsg: 'User not found' });
        }

        const isCorrectPassword = await bcrypt.compare(password, possibleUser.password);
        if (!isCorrectPassword) {
            return res.status(404).json({ errormsg: 'Invalid credentials' });
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
        return res.status(500).json({ errormsg: 'Server error' });
    }
}

// Get user info from the userToken saved in 
export const getUserInfoFromToken = () => {
    const token = Cookies.get('userToken');
    if (!token) {
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

export const addFriend = async (req, res, next) => {
    const { friendId } = req.body;
    const { id } = req.params;

    try {
        const user = await User.findById(id);
        const friend = await User.findById(friendId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (!friend) {
            return res.status(404).json({ message: 'Friend not found' });
        }

        if (!user.friends.includes(friendId)) {
            user.friends.push(friendId);
        }

        if (!friend.friends.includes(id)) {
            friend.friends.push(id);
        }

        await user.save({ validateBeforeSave: false });
        await friend.save({ validateBeforeSave: false });

        res.status(200).json({ message: 'Friend added successfully' });
    } catch (err) {
        console.log(err);
        res.status(400).json(err);
        next(err);
    }
}