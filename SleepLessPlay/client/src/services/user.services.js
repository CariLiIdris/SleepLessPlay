/* eslint-disable no-useless-catch */
import axios from 'axios'

const USER_INSTANCE = axios.create({
    baseURL: "http://localhost:8002/users",
    withCredentials: true
})

// C
export const createUser = async userData => {
    try {
        const res = await USER_INSTANCE.post('/users', userData, { withCredentials: true }) //userData is the body of our res
        console.log(res.data)
        return res.data
    }
    catch (err) { throw err }
}

// Login
export const login = async activeUserData => {
    try {
        const res = await USER_INSTANCE.post('/users/login', activeUserData, { withCredentials: true })
        // console.log(res.data)
        return res.data
    }
    catch (err) { throw err }
}

// Logout
export const logout = async () => {
    try {
        const res = await USER_INSTANCE.post('/users/logout', {}, { withCredentials: true })
        console.log(res.data)
        return res.data
    }
    catch (err) { throw err }
}

// R
export const getUserByID = async id => {
    try {
        const res = await USER_INSTANCE.get(`/users/${id}`)
        return res.data
    }
    catch (err) { throw err }
}

export const getUserByUsername = async username => {
    try {
        const res = await USER_INSTANCE.get(`/users/username/${username}`)
        return res.data
    }
    catch (err) { throw err }
}

export const getAllUsers = async () => {
    try {
        const res = await USER_INSTANCE.get('/users')
        return res.data
    }
    catch (err) { throw err }
}

export const searchUsers = async (query = '') => {
    try {
        const res = await USER_INSTANCE.get('/users', {
            params: { q: query }
        });
        return res.data
    }
    catch (err) { throw err }
}

// U
export const updateUserByID = async userData => {
    try {
        const res = await USER_INSTANCE.put(`/user/${userData._id}/update`, userData)
        // console.log( 'services``````Update' , res)
        return res.data
    }
    catch (err) { throw err }
}

// D
export const deleteUserByID = async id => {
    try {
        const res = await USER_INSTANCE.delete(`/user/${id}/delete`)
        return res.data
    }
    catch (err) { throw err }
}

// Add Friend
export const addFriend = async (userId, friendId) => {
    try {
        const res = await USER_INSTANCE.put(`/users/${userId}/addFriend`, { friendId });
        return res.data;
    } catch (err) {
        throw err;
    }
}