import { Router } from "express";
import {
  createPost,
  deletePostByID,
  getAllPostsByLounge,
  getPostByID,
  updatePostByID
} from '../controllers/post.controller.js'
import { authenticate } from "../config/jwt.config.js";

const postRouter = Router()

postRouter.route('/posts')
  .post(authenticate, createPost)
postRouter.route('/posts/lounge/:loungeId')
  .get(getAllPostsByLounge)
postRouter.route('/posts/:id')
  .get(authenticate, getPostByID)
postRouter.route('/posts/:id/update')
  .put(authenticate, updatePostByID)
postRouter.route('/posts/:id/delete')
  .delete(authenticate, deletePostByID)

export default postRouter