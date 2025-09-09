import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';

const Menu = () => {
  const { token, API_URL, addToCart, updateQuantity, cart } = useContext(AuthContext);
  const [items, setItems] = useState([]);
  const [search, setSearch] = useState('');
  const [filteredItems, setFilteredItems] = useState([]);

  const fetchMenu = async () => {
    try {
      const res = await fetch(`${API_URL}/menu`);
      if (res.ok) {
        const data = await res.json();
        setItems(data);
        setFilteredItems(data);
      } else {
        alert('Failed to fetch menu items.');
      }
    } catch (error) {
      console.error('Error fetching menu:', error);
    }
  };

  useEffect(() => {
    fetchMenu();
  }, []);

  useEffect(() => {
    const lowerSearch = search.toLowerCase();
    setFilteredItems(
      items.filter(item =>
        item.name.toLowerCase().includes(lowerSearch) ||
        item.category.toLowerCase().includes(lowerSearch) ||
        item.speciality.toLowerCase().includes(lowerSearch) ||
        item.ingredients.join(' ').toLowerCase().includes(lowerSearch) ||
        item.description.toLowerCase().includes(lowerSearch)
      )
    );
  }, [search, items]);

  const handleAdd = (item) => {
    if (!token) {
      alert('You must be logged in to add items to cart.');
      return;
    }
    addToCart(item);
  };

  const handleIncrement = (id) => {
    if (!token) {
      alert('You must be logged in to modify cart.');
      return;
    }
    const existing = cart.find(i => i._id === id);
    if (existing) updateQuantity(id, existing.quantity + 1);
  };

  const handleDecrement = (id) => {
    if (!token) {
      alert('You must be logged in to modify cart.');
      return;
    }
    const existing = cart.find(i => i._id === id);
    if (existing && existing.quantity > 0) updateQuantity(id, existing.quantity - 1);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <h1 className="text-3xl md:text-4xl text-brown-900 mb-6 text-center font-serif">Menu</h1>

      {/* Search Bar */}
      <div className="max-w-2xl mx-auto mb-6">
        <input
          type="text"
          placeholder="Search menu..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#2a4a46]"
        />
      </div>

      {filteredItems.length === 0 ? (
        <p className="text-center text-brown-800">No items found.</p>
      ) : (
        <div className="space-y-8">
          {filteredItems.map(item => {
            const cartItem = cart.find(i => i._id === item._id);
            const quantity = cartItem ? cartItem.quantity : 0;

            return (
              <div key={item._id} className="bg-white rounded-xl shadow-md overflow-hidden flex flex-col md:flex-row max-w-5xl mx-auto md:h-64 h-auto">
                
                {/* Image Section */}
                <div className="flex justify-center items-center md:w-1/3 w-full md:h-full h-48 bg-gray-100 p-2">
                  <img
                    src={`http://localhost:5000${item.image}`}
                    alt={item.name}
                    className="w-40 h-40 md:w-44 md:h-44 object-cover rounded"
                  />
                </div>

                {/* Details Section */}
                <div className="md:w-2/3 w-full p-6 flex flex-col justify-between">
                  <div>
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-2">
                      <h2 className="text-2xl font-bold text-brown-900 font-serif">{item.name}</h2>
                      <span className="text-brown-800 font-semibold mt-2 md:mt-0">Rs - {item.price}</span>
                    </div>
                    <p className="text-brown-700 mb-1">Category: {item.category}</p>
                    <p className="text-brown-700 mb-1">Ingredients: {item.ingredients.join(', ')}</p>
                    <p className="text-brown-700 mb-1">Speciality: <span className="bg-[#2a4a46] text-white px-2 py-1 rounded">{item.speciality}</span></p>
                    <p className="text-brown-600">{item.description}</p>
                  </div>

                  <div className="flex flex-col md:flex-row items-start md:items-center justify-between mt-4 space-y-2 md:space-y-0">
                    {quantity === 0 ? (
                      <button
                        onClick={() => handleAdd(item)}
                        className="bg-[#2a4a46] text-white py-2 px-5 rounded hover:bg-[#23534f] transition"
                      >
                        Add to Cart
                      </button>
                    ) : (
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handleDecrement(item._id)}
                          className="bg-[#2a4a46] text-white px-4 py-1 rounded hover:bg-[#23534f] transition"
                        >
                          -
                        </button>
                        <span className="text-brown-900 font-semibold text-lg">{quantity}</span>
                        <button
                          onClick={() => handleIncrement(item._id)}
                          className="bg-[#2a4a46] text-white px-4 py-1 rounded hover:bg-[#23534f] transition"
                        >
                          +
                        </button>
                      </div>
                    )}
                  </div>
                </div>

              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Menu;
