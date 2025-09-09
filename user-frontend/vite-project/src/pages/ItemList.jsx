import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const ItemsList = () => {
  const { cart, updateQuantity, removeFromCart, addToCart, token } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleIncrement = (id, currentQty) => {
    updateQuantity(id, currentQty + 1);
  };

  const handleDecrement = (id, currentQty) => {
    if (currentQty > 1) {
      updateQuantity(id, currentQty - 1);
    } else {
      // Set quantity to 0 but don't remove, show Add to Cart button
      updateQuantity(id, 0);
    }
  };

  // Dynamically calculate total amount, only include items with quantity > 0
  const totalAmount = cart.reduce((acc, item) => acc + (item.quantity > 0 ? item.price * item.quantity : 0), 0);

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <h1 className="text-4xl font-bold text-[#2a4a46] mb-8 text-center">Your Cart</h1>

      {cart.length === 0 ? (
        <p className="text-center text-[#2a4a46] text-lg">Your cart is empty. Add some delicious coffee!</p>
      ) : (
        <div className="max-w-5xl mx-auto space-y-6">
          {cart.map(item => (
            <div key={item._id} className="bg-white p-6 rounded-lg shadow-md flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-6">
              
              {/* Image Section */}
              <img src={`http://localhost:5000${item.image}`} alt={item.name} className="w-32 h-32 md:w-40 md:h-40 object-cover rounded-lg" />

              {/* Details Section */}
              <div className="flex-1 text-center md:text-left">
                <h2 className="text-2xl font-bold text-[#2a4a46]">{item.name}</h2>
                <p className="text-gray-700 mt-2">Price: ${item.price}</p>
                <p className="text-gray-600 mt-1 text-sm">Ingredients: {item.ingredients.join(', ')}</p>
              </div>

              {/* Actions Section */}
              <div className="flex flex-col items-center space-y-4">
                {item.quantity > 0 ? (
                  <>
                    <div className="flex items-center space-x-3">
                      <button onClick={() => handleDecrement(item._id, item.quantity)} className="bg-[#2a4a46] text-white px-4 py-2 rounded hover:bg-[#1f3b36] transition">
                        -
                      </button>
                      <span className="text-xl font-semibold text-[#2a4a46]">{item.quantity}</span>
                      <button onClick={() => handleIncrement(item._id, item.quantity)} className="bg-[#2a4a46] text-white px-4 py-2 rounded hover:bg-[#1f3b36] transition">
                        +
                      </button>
                    </div>
                    <button onClick={() => removeFromCart(item._id)} className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition">
                      Remove
                    </button>
                  </>
                ) : (
                  <button onClick={() => addToCart(item)} className="bg-[#2a4a46] text-white px-4 py-2 rounded hover:bg-[#1f3b36] transition">
                    Add to Cart
                  </button>
                )}
              </div>
            </div>
          ))}

          {/* Total and Place Order */}
          <div className="text-right mt-8">
            <p className="text-2xl font-bold text-[#2a4a46] mb-4">
              Total: ${totalAmount.toFixed(2)}
            </p>
            <button 
              onClick={() => token ? navigate('/place-order') : alert('Login required to place order')} 
              className="w-full md:w-1/3 mx-auto bg-[#2a4a46] text-white py-3 rounded hover:bg-[#1f3b36] transition font-semibold"
            >
              Place Order
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ItemsList;
