import Employee from '../models/Employee.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

// Register a new employee
export const addEmployee = async (req, res) => {
  try {
    const { name, password, email, dateOfJoin, salary, type } = req.body;
    const existing = await Employee.findOne({ email });
    if (existing) return res.status(400).json({ message: 'Email already exists.' });

    const employee = new Employee({
      name,
      password,
      email,
      dateOfJoin,
      salary,
      type
    });

    await employee.save();
    res.status(201).json({ message: 'Employee added', employee });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error });
  }
};

// Employee login
export const loginEmployee = async (req, res) => {
  try {
    const { email, password } = req.body;
    const employee = await Employee.findOne({ email });
    if (!employee) return res.status(404).json({ message: 'Employee not found.' });

    const isMatch = await employee.comparePassword(password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials.' });

    const token = jwt.sign(
      { id: employee._id, email: employee.email, type: employee.type },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    res.json({ token, message: 'Login successful.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error });
  }
};

// Get all employees
export const getAllEmployees = async (req, res) => {
  try {
    const employees = await Employee.find();
    res.json(employees);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error });
  }
};

// Delete an employee
export const deleteEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Employee.findByIdAndDelete(id);
    if (!result) return res.status(404).json({ message: 'Employee not found.' });
    res.json({ message: 'Employee deleted' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error });
  }
};
