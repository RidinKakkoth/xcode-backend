import express from 'express';
import { createPost, getAllPosts, getUserPosts,deletePost, updatePost } from '../controllers/postController.js';
import authenticate from '../middlewares/auth.js';
import upload from '../middlewares/upload.js'; 

const router = express.Router();

router.get('/', getAllPosts); 
router.get('/userPosts',authenticate, getUserPosts); 
router.post('/add', authenticate, upload.single('image'), createPost); 
router.delete('/delete/:id',authenticate, deletePost); 
router.put('/update/:id',authenticate,upload.single('image'), updatePost); 

export default router;
