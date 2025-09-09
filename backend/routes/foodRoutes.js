import express from 'express';
import { addFood, getAllFood, getMenuItems, deleteFood } from '../controllers/foodController.js';
import auth from '../middleware/auth.js';
import upload from '../middleware/upload.js'; // multer config

const router = express.Router();

// Admin routes (auth required)
router.post('/food', auth, upload.single('image'), addFood);
router.get('/food', auth, getAllFood);
router.delete('/food/:id', auth, deleteFood);

// Customer route (no auth)
router.get('/menu', getMenuItems);

export default router;
