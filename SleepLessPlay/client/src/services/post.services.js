/* eslint-disable no-useless-catch */
import axios from "axios";

const POST_INSTANCE = axios.create({
  baseURL: "http://localhost:8002/posts",
  withCredentials: true
})

// C
export const createPost = async postData => {
  try {
    const res = await POST_INSTANCE.post('/posts', postData, { withCredentials: true })
    console.log(res.data)
    return res.data
  }
  catch (err) { throw err }
}
// R
export const getAllPostsByLounge = async id => {
  try {
    const res = await POST_INSTANCE.get(`/posts/lounge/${id}`)
    return res.data
  }
  catch (err) { throw err }
}
export const getPostByID = async id => {
  try {
    const res = await POST_INSTANCE.get(`/posts/${id}`)
    return res.data
  }
  catch (err) { throw err }
}
// U
export const updatePostByID = async (id, postData) => {
  try {
    const res = await POST_INSTANCE.put(`/posts/${id}/update`, postData)
    return res.data
  }
  catch (err) { throw err }
}
// D
export const deletePostByID = async id => {
  try {
    const res = await POST_INSTANCE.delete(`/posts/${id}/delete`)
    return res.data
  }
  catch (err) { throw err }
}