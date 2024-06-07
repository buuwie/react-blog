import express from "express";
import { verifyToken } from "../utils/verifyUser.js";
import { create, getPosts, deletepost, updatepost, getRandomPosts, getRandomPostsByCategory } from "../controllers/post.controller.js";

const router = express.Router();

router.post('/create', verifyToken, create);
router.get('/getposts', getPosts);
router.get('/getrandompostsbycategory', getRandomPostsByCategory)
router.get('/getrandomposts', getRandomPosts)
router.delete('/deletepost/:postId/:userId', verifyToken, deletepost)
router.put('/updatepost/:postId/:userId', verifyToken, updatepost)

export default router;