import Customer from '../models/Customer.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET || "customer-secret";

// Customer registration
export const registerCustomer = async (req, res) => {
  try {
    const { fullName, email, password, address } = req.body;
    if (!fullName || !email || !password || !address) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existing = await Customer.findOne({ email });
    if (existing) return res.status(400).json({ message: "Email already registered" });

    const newCustomer = new Customer({ fullName, email, password, address });
    await newCustomer.save();

    const token = jwt.sign({ id: newCustomer._id, email }, JWT_SECRET, { expiresIn: '1d' });
    res.status(201).json({ message: "Customer registered", token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error });
  }
};

// Customer login
export const loginCustomer = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ message: "Email and password are required" });

    const customer = await Customer.findOne({ email });
    if (!customer || customer.password !== password) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: customer._id, email }, JWT_SECRET, { expiresIn: '1d' });
    res.json({ message: "Login successful", token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error });
  }
};
