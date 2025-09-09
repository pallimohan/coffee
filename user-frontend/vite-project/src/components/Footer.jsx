import React from 'react';
import { FaFacebookF, FaTwitter, FaInstagram, FaEnvelope, FaPhone } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-[#2a4a46] text-white py-8 px-4">
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-6 text-center sm:text-left">
        
        {/* About Section */}
        <div>
          <h3 className="text-lg font-bold mb-2">About Coffee Shop</h3>
          <p className="text-sm text-gray-300">
            We serve the finest coffee crafted with passion. Join us for a delightful experience in every cup.
          </p>
        </div>

        {/* Contact Section */}
        <div>
          <h3 className="text-lg font-bold mb-2">Contact Us</h3>
          <p className="text-sm text-gray-300 flex items-center justify-center sm:justify-start gap-2">
            <FaEnvelope /> info@coffeeshop.com
          </p>
          <p className="text-sm text-gray-300 flex items-center justify-center sm:justify-start gap-2 mt-2">
            <FaPhone /> +91 98765 43210
          </p>
        </div>

        {/* Social Media Section */}
        <div>
          <h3 className="text-lg font-bold mb-2">Follow Us</h3>
          <div className="flex justify-center sm:justify-start gap-4 mt-2">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-400">
              <FaFacebookF size={20} />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-400">
              <FaTwitter size={20} />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-400">
              <FaInstagram size={20} />
            </a>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-700 mt-6 pt-4 text-center text-sm text-gray-400">
        &copy; {new Date().getFullYear()} Coffee Shop. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
