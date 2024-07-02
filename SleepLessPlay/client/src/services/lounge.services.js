/* eslint-disable no-useless-catch */
import axios from 'axios'

// axios base url instance
const LOUNGE_INSTANCE = axios.create({
    baseURL: "http://localhost:8002/lounges",
    withCredentials: true
})

// C
export const createLounge = async loungeData => {
    try {
        const res = await LOUNGE_INSTANCE.post('/lounges', loungeData, { withCredentials: true })
        console.log(res.data)
        return res.data
    }
    catch (err) { throw err }
}
// R
export const getLoungeByID = async id => {
    try {
        const res = await LOUNGE_INSTANCE.get(`/lounges/${id}`)
        return res.data
    }
    catch (err) { throw err }
}
export const getLoungeByName = async name => {
    try {
        const res = await LOUNGE_INSTANCE.get(`/lounges/${name}`)
        return res.data
    }
    catch (err) { throw err }
}

// export const getLoungeByAdmin = async (userId) => {
//     try {
//         const res = await LOUNGE_INSTANCE.get(`/lounges/${userId}`)
//         return res.data
//     }
//     catch (err) { throw err }
// }

export const getLoungeByMember = async userId => {
    try {
        const res = await LOUNGE_INSTANCE.get(`/lounges/${userId}`)
        return res.data
    }
    catch (err) { throw err }
}

export const getAllLounges = async () => {
    try {
        const res = await LOUNGE_INSTANCE.get('/lounges')
        return res.data
    }
    catch (err) { throw err }
}

export const searchLounges = async (query = '') => {
    try {
        const res = await LOUNGE_INSTANCE.get('/lounges', {
            params: { q: query }
        })
        return res.data;
    }
    catch (err) { throw err }
}
// U
export const updateLoungeByID = async loungeData => {
    try {
        const res = await LOUNGE_INSTANCE.put(`/lounge/${loungeData._id}/update`, loungeData)
        // console.log('services``````Update', res)
        return res.data
    }
    catch (err) { throw err }
}
// D
export const deleteLoungeByID = async id => {
    try {
        const res = await LOUNGE_INSTANCE.delete(`/lounge/${id}/delete`)
        return res.data
    }
    catch (err) { throw err }
}

// Join lounge
export const joinLounge = async loungeId => {
    try {
        const res = await LOUNGE_INSTANCE.post(`/lounge/join/${loungeId}`)
        return res.data
    }
    catch (err) { throw err }
}