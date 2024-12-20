import mongoose from 'mongoose';

const postSchema = new mongoose.Schema(
  {

    caption: { type: String, required: true },
    description: { type: String, required: true },
    
    image: { type: String },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, 
  },
  { timestamps: true }
);

const Post = mongoose.model('Post', postSchema);

export default Post;
