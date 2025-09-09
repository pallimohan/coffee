import multer from 'multer';

// Temporary storage; multer saves files before uploading to Cloudinary
const upload = multer({ dest: 'temp/' });

export default upload;
