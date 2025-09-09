import Food from '../models/Food.js';
import cloudinary from '../cloudinaryConfig.js';
import fs from 'fs';

// Admin: Add food
export const addFood = async (req, res) => {
  try {
    const { category, name, price, quantity, ingredients, speciality, description } = req.body;

    let imageUrl = '';
    if (req.file) {
      const result = await cloudinary.v2.uploader.upload(req.file.path, { folder: 'coffee-images' });
      imageUrl = result.secure_url;
      fs.unlinkSync(req.file.path); // remove temp file
    }

    const food = new Food({
      category,
      name,
      price,
      quantity,
      ingredients: JSON.parse(ingredients),
      speciality,
      description,
      image: imageUrl
    });

    await food.save();
    res.status(201).json({ message: 'Food item added', food });
  } catch (error) {
    console.error("Error adding food:", error);
    res.status(500).json({ message: 'Server error', error });
  }
};

// Admin: Get all food
export const getAllFood = async (req, res) => {
  try {
    const foods = await Food.find();
    res.json(foods);
  } catch (error) {
    console.error("Error fetching foods:", error);
    res.status(500).json({ message: 'Server error', error });
  }
};

// Customer: Get menu items
export const getMenuItems = async (req, res) => {
  try {
    const foods = await Food.find();
    res.json(foods);
  } catch (error) {
    console.error("Error fetching menu for customer:", error);
    res.status(500).json({ message: 'Server error', error });
  }
};

// Admin: Delete food
export const deleteFood = async (req, res) => {
  try {
    const food = await Food.findByIdAndDelete(req.params.id);
    if (!food) return res.status(404).json({ message: 'Food not found' });
    res.json({ message: 'Food deleted successfully' });
  } catch (error) {
    console.error("Error deleting food:", error);
    res.status(500).json({ message: 'Server error', error });
  }
};
