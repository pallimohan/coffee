import express from 'express';
import {
  getAllOrders,
  updateOrderStatus,
  deleteOrder,
  getCustomerOrders,
  placeOrder,
  confirmPayment
} from '../controllers/orderController.js';
import auth from '../middleware/auth.js';
import customerAuth from '../middleware/customerAuth.js';

const router = express.Router();

// Admin routes
router.get('/orders', auth, getAllOrders);
router.patch('/orders/:id', auth, updateOrderStatus); // ✅ PATCH used here
router.delete('/orders/:id', auth, deleteOrder);

// Customer routes
router.get('/myorders', customerAuth, getCustomerOrders);
router.post('/orders', customerAuth, placeOrder);
router.post('/orders/confirm', customerAuth, confirmPayment);

export default router;
