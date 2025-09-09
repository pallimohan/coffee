import express from 'express';
import { addEmployee, deleteEmployee, getAllEmployees, loginEmployee } from '../controllers/employeeController.js';
import auth from '../middleware/auth.js';

const router = express.Router();

// Public route
router.post('/login', loginEmployee);
router.post('/employees', auth, addEmployee);
router.get('/employees', auth, getAllEmployees);
router.delete('/employees/:id', auth, deleteEmployee);

export default router;
