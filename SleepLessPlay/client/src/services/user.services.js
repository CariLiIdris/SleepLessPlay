import axios from 'axios'

const USER_INSTANCE = axios.create({
    baseURL: "http://localhost:8002/users"
})

export const createUser = async userData => {
    try {
        const res = await USER_INSTANCE.post('/users', userData, { withCredentials: true }) //userData is the body of our res
        console.log(res.data)
        return res.data
    }
    catch (err) { throw err }
}

export const login = async activeUserData => {
    try {
        const res = await USER_INSTANCE.post('/users/login', activeUserData, { withCredentials: true })
        console.log(res.data)
        return res.data
    }
    catch (err) { throw err }
}
export const logout = async () => {
    try {
        const res = await USER_INSTANCE.post('/users/logout', {}, { withCredentials: true })
        console.log(res.data)
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