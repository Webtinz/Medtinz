import React from 'react';

const Navbar = () => {
  return (
    <nav className="flex justify-between items-center p-6 bg-white shadow-md">
      <div className="text-2xl font-bold text-blue-600">MED<span className="text-black">TINZ</span></div>
      <ul className="hidden md:flex gap-6 text-gray-700">
        <li>Features</li>
        <li>Contact us</li>
        <li>Pricing</li>
        <li>About us</li>
      </ul>
      <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
        Sign up
      </button>
    </nav>
  );
};

export default Navbar;
