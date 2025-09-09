import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const Employes = () => {
  const { token, API_URL, logout } = useContext(AuthContext);
  const [employees, setEmployees] = useState([]);

  // Fetch employees
  const fetchEmployees = async () => {
    try {
      const res = await fetch(`${API_URL}/employees`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (res.ok) {
        const data = await res.json();
        setEmployees(data);
      } else {
        alert("Unauthorized or failed to fetch employees.");
        logout();
      }
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  // Delete an employee
  const handleDelete = async (id) => {
    try {
      const res = await fetch(`${API_URL}/employees/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (res.ok) {
        alert("Employee deleted.");
        fetchEmployees();
      } else {
        alert("Failed to delete.");
      }
    } catch (error) {
      console.error("Delete error:", error);
    }
  };

  useEffect(() => {
    if (token) {
      fetchEmployees();
    }
  }, [token]);

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <h1 className="text-2xl text-brown-900 mb-4 text-center">Employees</h1>
      {employees.length === 0 ? (
        <p className="text-center">No employees found.</p>
      ) : (
        <div className="max-w-3xl mx-auto space-y-4">
          {employees.map(emp => (
            <div key={emp._id} className="bg-white p-4 rounded shadow flex justify-between items-center">
              <div>
                <h2 className="text-lg font-semibold">{emp.name}</h2>
                <p>Email: {emp.email}</p>
                <p>Type: {emp.type}</p>
                <p>Salary: ${emp.salary}</p>
              </div>
              <button
                onClick={() => handleDelete(emp._id)}
                className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Employes;
