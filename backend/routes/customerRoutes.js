import express from 'express';
import { registerCustomer, loginCustomer } from '../controllers/customerController.js';
import customerAuth from '../middleware/customerAuth.js';

const router = express.Router();

// Registration
router.post('/customer/register', registerCustomer);

// Login
router.post('/customer/login', loginCustomer);

// Example protected route: get my profile
router.get('/customer/profile', customerAuth, async (req, res) => {
  try {
    const customerId = req.customer.id;
    res.json({ message: "Customer authenticated", customerId });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

export default router;
