// lib/multer.js
import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import cloudinary from './cloudinary';

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'kumbangsari',
    allowed_formats: ['jpg', 'png', 'jpeg']
  },
});

const upload = multer({ storage: storage });

export default upload;
