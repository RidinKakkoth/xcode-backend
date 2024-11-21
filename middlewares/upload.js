import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import { v2 as cloudinary } from 'cloudinary';

// Set up Cloudinary storage configuration
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'posts', // Cloudinary folder where images will be stored
    allowed_formats: ['jpg', 'jpeg', 'png', 'gif'], // Supported image formats
  },
});

// Create multer instance to handle image uploads
const upload = multer({ storage: storage });

export default upload;
