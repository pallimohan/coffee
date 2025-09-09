import mongoose from 'mongoose';

const foodSchema = new mongoose.Schema({
  category: { type: String, required: true },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, default: 0 },
  ingredients: { type: [String], required: true },
  speciality: { type: String },
  description: { type: String },
  image: { type: String }
}, {
  timestamps: true
});

const Food = mongoose.model('Food', foodSchema);

export default Food;
