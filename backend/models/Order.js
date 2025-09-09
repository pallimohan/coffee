import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Customer',
    required: true
  },
  userName: {
    type: String,
    required: true
  },
  userAddress: {
    addressLine: { type: String },
    city: { type: String },
    state: { type: String },
    country: { type: String },
    postalCode: { type: String },
    fullAddress: { type: String } // complete address string
  },
  items: [
    {
      foodId: { type: mongoose.Schema.Types.ObjectId, ref: 'Food' },
      name: { type: String, required: true },
      price: { type: Number, required: true },
      quantity: { type: Number, required: true }
    }
  ],
  totalCost: {
    type: Number,
    required: true
  },
  paymentMode: {
    type: String,
    enum: ['cash', 'card', 'upi'],
    required: true
  },
  transactionId: { // for online payments
    type: String,
    default: null
  },
  status: {
    type: String,
    enum: ['pending', 'payment_pending', 'order placed', 'on delivery', 'delivered', 'confirmed'],
    default: 'pending'
  }
}, { timestamps: true });

const Order = mongoose.model('Order', orderSchema);

export default Order;
