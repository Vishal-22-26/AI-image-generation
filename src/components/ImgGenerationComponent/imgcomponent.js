import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { IoArrowForwardCircleOutline } from "react-icons/io5";

export default function ImgComponent() {
  const [inputText, setInputText] = useState('');

  const handleInputChange = (event) => {
    setInputText(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(inputText);
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <div className="bg-gray-100 rounded-2xl shadow-xl overflow-hidden mb-8">
        <img 
          src="/aiphoto.jpg" 
          alt="AI Generated" 
          className="w-full h-80 object-cover"
        />
      </div>

      <form onSubmit={handleSubmit} className="mb-8">
        <div className="flex items-center bg-white rounded-full shadow-lg overflow-hidden">
          <input
            type="text"
            value={inputText}
            onChange={handleInputChange}
            placeholder="Describe your image..."
            className="flex-grow px-6 py-4 focus:outline-none"
          />
          <button
            type="submit"
            className="bg-gradient-to-r from-orange-400 to-orange-500 text-white font-semibold px-6 py-4 hover:from-orange-500 hover:to-orange-600 transition-all duration-300"
          >
            Generate Image
          </button>
        </div>
      </form>

      <NavLink 
        to="/gallery" 
        className="inline-flex items-center justify-center bg-black text-white font-semibold px-6 py-3 rounded-full hover:bg-orange-500 transition-all duration-300"
      >
        <IoArrowForwardCircleOutline className="mr-2" />
        Go to My Gallery
      </NavLink>
    </div>
  );
}
