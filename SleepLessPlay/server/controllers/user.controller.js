import axios from 'axios';
import User from "../models/user.model.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import path from 'path'
import fs from 'fs'
import bucket from '../config/firebase.config.js';

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
    const { id } = req.params;
    let reqBody = { ...req.body };
    console.log(reqBody)

    try {
        if (req.avatar) {
            const file = req.file;
            const fileName = `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`;
            const blob = bucket.file(fileName);
            const blobStream = blob.createWriteStream({
                metadata: {
                    contentType: file.mimetype,
                },
            });

            blobStream.on("error", (err) => {
                next(err);
            });

            blobStream.on("finish", async () => {
                const publicUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;
                reqBody.avatar = publicUrl;

                const updateData = { ...reqBody };
                delete updateData._id;

                const UPDATED_USER = await User.findByIdAndUpdate(id, updateData, options);
                res.status(200).json(UPDATED_USER);
            });

            blobStream.end(file.buffer);
        } else {
            const updateData = { ...reqBody };
            delete updateData._id;

            const UPDATED_USER = await User.findByIdAndUpdate(id, updateData, options);
            res.status(200).json(UPDATED_USER);
        }
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