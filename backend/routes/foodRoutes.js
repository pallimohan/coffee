import express from 'express';
import { addFood, getAllFood, getMenuItems, deleteFood } from '../controllers/foodController.js';
import auth from '../middleware/auth.js';
import multer from 'multer';

const router = express.Router();

// Multer config (files will be uploaded to Cloudinary, so no need for diskStorage)
const upload = multer({ dest: 'temp/' });

// Admin routes
router.post('/food', auth, upload.single('image'), addFood);
router.get('/food', auth, getAllFood);
router.delete('/food/:id', auth, deleteFood);

// Customer route
router.get('/menu', getMenuItems);

export default router;
