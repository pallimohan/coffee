import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import { FaShoppingCart } from 'react-icons/fa';

const CartIcon = () => {
  const { cartItems } = useContext(CartContext);

  return (
    <div className="relative cursor-pointer">
      <FaShoppingCart size={24} className="text-brown-900" />
      {cartItems.length > 0 && (
        <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full px-2 py-0.5">
          {cartItems.length}
        </span>
      )}
    </div>
  );
};

export default CartIcon;
