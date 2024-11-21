import mongoose from 'mongoose';

const postSchema = new mongoose.Schema(
  {

    caption: { type: String, required: true },
    description: { type: String, required: true },
    
    image: { type: String }, // URL of the image
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to the User who created the post
  },
  { timestamps: true }
);

const Post = mongoose.model('Post', postSchema);

export default Post;
