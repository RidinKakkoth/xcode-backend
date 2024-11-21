import Post from '../models/postModel.js';
import User from '../models/userModel.js';

// Create a new post
export const createPost = async (req, res) => {
  const { caption,description } = req.body;


    const userId = req.userId; 

  const imageUrl = req.file?.path; 

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const newPost = new Post({
      caption,
      description,
      image: imageUrl, 
      user: userId, 
    });


    await newPost.save();

    res.status(201).json({success:true, message: 'Post created successfully', post: newPost });
  } catch (error) {
    res.status(500).json({ message: 'Error creating post', error });
  }
};

// Get all posts
export const getAllPosts = async (req, res) => {
  try {

    const posts = await Post.find().populate('user', 'name').sort({ updatedAt: -1 }).lean();  
    res.status(200).json({success:true,posts});
  } catch (error) {
    res.status(500).json({ message: 'Error fetching posts', error });
  }
};
// Get users profile posts
export const getUserPosts = async (req, res) => {
  try {
    const userId = req.userId;

    const posts = await Post.find({user:userId}).populate('user', 'name').sort({ updatedAt: -1 }).lean(); 

    
    res.status(200).json({success:true,posts});
  } catch (error) {
    res.status(500).json({ message: 'Error fetching posts', error });
  }
};



export const updatePost = async (req, res) => {
  const { caption, description, image } = req.body;

  try {

    const post = await Post.findById(req.params.id);
    
    const imageUrl = req.file?.path; 
    
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    if (post.user.toString() !== req.userId) {
      return res.status(403).json({ message: 'Unauthorized' });
    }


    post.caption = caption || post.caption;
    post.description = description || post.description;
    post.image = image || imageUrl;

    await post.save();

    res.status(200).json({success:true, message: 'Post updated successfully', post });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error updating post' });
  }
}


export const deletePost = async (req, res) => {
  try {
   
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