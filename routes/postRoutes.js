import express from 'express';
import { createPost, getAllPosts, getUserPosts,deletePost, updatePost } from '../controllers/postController.js';
import authenticate from '../middlewares/auth.js';
import upload from '../middlewares/upload.js'; // Import the multer upload middleware

const router = express.Router();

// Route for creating a new post, with image upload handled by multer
// router.post('/',  upload.single('image'), createPost); // 'image' is the field name in the form
router.get('/', getAllPosts); // Get all posts (public)
router.get('/userPosts',authenticate, getUserPosts); // Get all posts (public)
router.post('/add', authenticate, upload.single('image'), createPost); // 'image' is the field name in the form
router.delete('/delete/:id',authenticate, deletePost); // Get a post by ID (public)
router.put('/update/:id',authenticate,upload.single('image'), updatePost); // Get a post by ID (public)

export default router;
