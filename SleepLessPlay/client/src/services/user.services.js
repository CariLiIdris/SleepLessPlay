import axios from 'axios';

const USER_INSTANCE = axios.create({
    baseURL: "http://localhost:8002/users"
})

export const createUser = async userData => {
    try {
        const res = await USER_INSTANCE.post('/users', userData) //userData is the body of our res
        return res.data
    }
    catch (err) { throw err }
}

export const getUserByID = async id => {
    try {
        const res = await USER_INSTANCE.get(`/users/${id}`)
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

export const deleteUserByID = async id => {
    try {
        const res = await USER_INSTANCE.delete(`/users/${id}`)
        return res.data
    }
    catch (err) { throw err }
}

export const updateUserByID = async userData => {
    try {
        const res = await USER_INSTANCE.put(`/users/${userData._id}`, userData)
        return res.data
    }
    catch (err) { throw err }
}