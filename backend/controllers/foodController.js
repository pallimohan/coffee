// controllers/foodController.js
import Food from '../models/Food.js';

// Admin: Add food
export const addFood = async (req, res) => {
  try {
    const { category, name, price, quantity, ingredients, speciality, description } = req.body;

    const imageUrl = req.file ? req.file.path : ''; // multer-storage-cloudinary automatically gives Cloudinary URL

    const food = new Food({
      category,
      name,
      price,
      quantity,
      ingredients: JSON.parse(ingredients),
      speciality,
      description,
      image: imageUrl,
    });

    await food.save();
    res.status(201).json({ message: 'Food item added', food });
  } catch (error) {
    console.error('Error adding food:', error);
    res.status(500).json({ message: 'Server error', error });
  }
};

// Admin: Get all food
export const getAllFood = async (req, res) => {
  try {
    const foods = await Food.find();
    res.json(foods);
  } catch (error) {
    console.error('Error fetching foods:', error);
    res.status(500).json({ message: 'Server error', error });
  }
};

// Customer: Get menu items
export const getMenuItems = async (req, res) => {
  try {
    const foods = await Food.find();
    res.json(foods);
  } catch (error) {
    console.error('Error fetching menu for customer:', error);
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
    console.error('Error deleting food:', error);
    res.status(500).json({ message: 'Server error', error });
  }
};
