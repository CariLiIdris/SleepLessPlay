import Post from "../models/post.model.js";
import Lounge from "../models/lounge.model.js";
import jwt from 'jsonwebtoken'

// C
export const createPost = async (req, res) => {
  try {
    const token = req.cookies.userToken;
    if (!token) {
      return res.status(401).json({ errormsg: 'No token found. Authorization DENIED!' })
    }

    const decoded = jwt.verify(token, process.env.SECRET_KEY)
    const userId = decoded.userId;

    const postData = {
      ...req.body,
      author: userId
    }

    const POST = await Post.create(postData)
    res.status(200).json({ msg: 'Post created successfully', post: POST })
  }
  catch (err) {
    console.log(err)
    res.status(400).json(err)
  }
}

// R
export const getAllPostsByLounge = async (req, res, next) => {
  const { loungeId } = req.params;

  try {
    const getAllPosts = await Post.find({ lounge: loungeId }).populate('author', 'username');
    res.status(200).json(getAllPosts)
  }
  catch (err) {
    console.log(err)
    res.status(400).json(err);
    next(err)
  }
}

export const getPostByID = async (req, res, next) => {
  const { id } = req.params
  try {
    const FOUNDPOST = await Post.findById(id);
    console.log("Found Post: ", FOUNDPOST, "Received Id: ", id)
    res.status(200).json(FOUNDPOST)
  }
  catch (err) {
    console.log(err)
    res.status(400).json(err)
    next(err)
  }
}

// U
export const updatePostByID = async (req, res, next) => {
  const options = {
    new: true,
    runValidators: true,
  };
  try {
    const updateData = { ...req.body }
    delete updateData._id

    const UPDATED_POST = await Post.findByIdAndUpdate(req.params.id, updateData, options);
    res.status(200).json(UPDATED_POST);
  }
  catch (err) {
    console.log(err);
    res.status(400).json(err);
    next(err)
  }
}

// D
export const deletePostByID = async (req, res, next) => {
  const { id } = req.params
  try {
    const DELETE_POST = await Post.findByIdAndDelete(id)
    res.status(200).json({ msg: 'Post deleted successfully', DELETE_POST });
  }
  catch (err) {
    console.log(err)
    res.status(400).json(err);
    next(err)
  }
}