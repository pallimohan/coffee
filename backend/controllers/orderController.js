import Order from '../models/Order.js';
import Customer from '../models/Customer.js';
import Razorpay from 'razorpay';
import crypto from 'crypto';
import dotenv from 'dotenv';
dotenv.config();

const razorpayInstance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET
});

// ----------------- Admin Controllers -----------------
export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 }).populate('user', 'fullName email');
    res.json(orders);
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ message: 'Server error', error });
  }
};

export const updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const order = await Order.findById(id);
    if (!order) return res.status(404).json({ message: 'Order not found' });

    order.status = status;
    await order.save();

    res.json({ message: 'Order status updated', order });
  } catch (error) {
    console.error("Error updating order:", error);
    res.status(500).json({ message: 'Server error', error });
  }
};

export const deleteOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await Order.findByIdAndDelete(id);
    if (!order) return res.status(404).json({ message: 'Order not found' });

    res.json({ message: 'Order deleted successfully' });
  } catch (error) {
    console.error("Error deleting order:", error);
    res.status(500).json({ message: 'Server error', error });
  }
};

// ----------------- Customer Controllers -----------------
export const getCustomerOrders = async (req, res) => {
  try {
    const customerId = req.user.id;
    const orders = await Order.find({ user: customerId }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    console.error("Error fetching customer orders:", error);
    res.status(500).json({ message: 'Server error', error });
  }
};

export const placeOrder = async (req, res) => {
  try {
    const customerId = req.user.id;
    const { items, totalCost, paymentMode, userAddress } = req.body;

    if (!items || items.length === 0) return res.status(400).json({ message: "Cart is empty" });
    if (!totalCost) return res.status(400).json({ message: "Total cost required" });
    if (!paymentMode) return res.status(400).json({ message: "Payment mode required" });

    const customer = await Customer.findById(customerId);
    if (!customer) return res.status(404).json({ message: "Customer not found" });

    if (paymentMode === 'cash') {
      const order = new Order({
        user: customerId,
        userName: customer.fullName,
        userAddress,
        items,
        totalCost,
        paymentMode,
        status: 'order placed'
      });
      await order.save();
      return res.status(201).json({ message: "Order placed successfully (COD)", order });
    }

    const amountInPaise = totalCost * 100;
    const options = {
      amount: amountInPaise,
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
      payment_capture: 1
    };

    const response = await razorpayInstance.orders.create(options);
    res.status(201).json({
      message: "Razorpay order created",
      orderId: response.id,
      amount: response.amount,
      currency: response.currency
    });

  } catch (error) {
    console.error("Error placing order:", error);
    res.status(500).json({ message: "Server error", error });
  }
};

export const confirmPayment = async (req, res) => {
  try {
    const customerId = req.user.id;
    const { razorpay_payment_id, razorpay_order_id, razorpay_signature, items, totalCost, paymentMode, userAddress } = req.body;

    const generated_signature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(razorpay_order_id + "|" + razorpay_payment_id)
      .digest('hex');

    if (generated_signature !== razorpay_signature) {
      return res.status(400).json({ message: "Payment verification failed" });
    }

    const customer = await Customer.findById(customerId);
    if (!customer) return res.status(404).json({ message: "Customer not found" });

    const order = new Order({
      user: customerId,
      userName: customer.fullName,
      userAddress,
      items,
      totalCost,
      paymentMode,
      transactionId: razorpay_payment_id,
      status: 'order placed'
    });

    await order.save();
    res.status(201).json({ message: "Order placed successfully", order });

  } catch (error) {
    console.error("Error confirming payment:", error);
    res.status(500).json({ message: "Server error", error });
  }
};
