import Employee from '../models/Employee.js';

// Add new employee
export const addEmployee = async (req, res) => {
  try {
    const { name, password, email, dateOfJoin, salary, type } = req.body;
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

// Delete employee by ID
export const deleteEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Employee.findByIdAndDelete(id);
    if (result) {
      res.json({ message: 'Employee deleted' });
    } else {
      res.status(404).json({ message: 'Employee not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error });
  }
};

// Retrieve all employees
export const getAllEmployees = async (req, res) => {
  try {
    const employees = await Employee.find();
    res.json(employees);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error });
  }
};
