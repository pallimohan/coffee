import express from 'express';
import { addFood, getAllFood, getMenuItems, deleteFood } from '../controllers/foodController.js';
import auth from '../middleware/auth.js';
import multer from 'multer';
import path from 'path';

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
});

const upload = multer({ storage });

// Admin routes (auth required)
router.post('/food', auth, upload.single('image'), addFood);
router.get('/food', auth, getAllFood);
router.delete('/food/:id', auth, deleteFood);

// Customer route (no auth)
router.get('/menu', getMenuItems);

export default router;
