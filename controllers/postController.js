import Post from '../models/postModel.js';
import User from '../models/userModel.js';

// Create a new post
export const createPost = async (req, res) => {
  const { caption,description } = req.body;


    const userId = req.userId; // Assuming you have JWT token with user id


  // The image URL will be available in req.file after uploading
  const imageUrl = req.file?.path; // Cloudinary URL of the uploaded image

  try {
    // Check if user exists (optional, since you are using a valid JWT)
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Create a new post
    const newPost = new Post({
      caption,
      description,
      image: imageUrl, // Save Cloudinary URL of the image
      user: userId, // Associate the post with the user
    });

    // Save the post to the database
    await newPost.save();

    res.status(201).json({ message: 'Post created successfully', post: newPost });
  } catch (error) {
    res.status(500).json({ message: 'Error creating post', error });
  }
};

// Get all posts
export const getAllPosts = async (req, res) => {
  try {

    const posts = await Post.find().populate('user', 'name'); // Populate user details
    
    
    res.status(200).json({success:true,posts});
  } catch (error) {
    res.status(500).json({ message: 'Error fetching posts', error });
  }
};
// Get all posts
export const getUserPosts = async (req, res) => {
  try {
    const userId = req.userId;

    const posts = await Post.find({user:userId}).populate('user', 'name'); // Populate user details

    
    
    res.status(200).json({success:true,posts});
  } catch (error) {
    res.status(500).json({ message: 'Error fetching posts', error });
  }
};



export const updatePost = async (req, res) => {
  const { caption, description, image } = req.body;

  try {

    // Find the post by ID
    const post = await Post.findById(req.params.id);
    
    const imageUrl = req.file?.path; 
    
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    if (post.user.toString() !== req.userId) {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    // Update the post fields
    post.caption = caption || post.caption;
    post.description = description || post.description;
    post.image = image || imageUrl;

    // Save the updated post
    await post.save();

    res.status(200).json({success:true, message: 'Post updated successfully', post });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error updating post' });
  }
}


export const deletePost = async (req, res) => {
  try {
    // Find and delete the post by ID
    const post = await Post.findByIdAndDelete(req.params.id);
    
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    if (post.user.toString() !== req.userId) {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    res.status(200).json({success:true, message: 'Post deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error deleting post' });
  }
}