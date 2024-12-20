import React from 'react';

export default function BuyCredit() {
  return (
    <div className="bg-[#F0FCF9] w-full p-4">
      {/* Heading */}
      <div className="heading flex justify-center items-center mt-4 mb-11">
        <div 
          className="w-32 md:w-36 h-9 rounded-full text-lg font-serif cursor-pointer flex justify-center items-center bg-black text-white">
          Our Plans
        </div>
      </div>
      
      {/* Cards */}
      <div className="flex flex-col md:flex-row justify-center items-center gap-8 md:gap-12 lg:gap-16">
        {/* Basic Plan */}
        <div className="w-full max-w-xs bg-slate-950 rounded-xl p-4">
          <h3 className="text-center text-white text-xl md:text-2xl mt-1 font-serif">Basic</h3>
          <img 
            alt="pricing" 
            src="images/pricing.jpg"
            className="w-full h-40 object-cover rounded-lg mt-3"
          />
          <div className="flex justify-center items-center mt-2">
            <p 
              className="text-white text-center bg-opacity-60 text-xs rounded-full bg-gray-50 px-3 py-1">
              Save 25%
            </p>
          </div>
          <a href="/plan">
            <button 
              className="bg-[#EA580C] mt-4 w-full rounded-md font-semibold text-center h-10 text-white">
              Choose Plan
            </button>
          </a>
        </div>

        {/* Professional Plan */}
        <div className="w-full max-w-xs bg-slate-950 rounded-xl p-4">
          <h3 className="text-center text-white text-xl md:text-2xl mt-1 font-serif">Professional</h3>
          <img 
            alt="pricing" 
            src="images/pricing.jpg"
            className="w-full h-40 object-cover rounded-lg mt-3"
          />
          <div className="flex justify-center items-center mt-2">
            <p 
              className="text-white text-center bg-opacity-60 text-xs rounded-full bg-gray-50 px-3 py-1">
              Save 35%
            </p>
          </div>
          <a href="/plan">
            <button 
              className="bg-[#EA580C] mt-4 w-full rounded-md font-semibold text-center h-10 text-white">
              Choose Plan
            </button>
          </a>
        </div>

        {/* Ultimate Plan */}
        <div className="w-full max-w-xs bg-slate-950 rounded-xl p-4">
          <h3 className="text-center text-white text-xl md:text-2xl mt-1 font-serif">Ultimate</h3>
          <img 
            alt="pricing" 
            src="images/pricing.jpg"
            className="w-full h-40 object-cover rounded-lg mt-3"
          />
          <div className="flex justify-center items-center mt-2">
            <p 
              className="text-white text-center bg-opacity-60 text-xs rounded-full bg-gray-50 px-3 py-1">
              Save 45%
            </p>
          </div>
          <a href="/plan">
            <button 
              className="bg-[#EA580C] mt-4 w-full rounded-md font-semibold text-center h-10 text-white">
              Choose Plan
            </button>
          </a>
        </div>
      </div>
    </div>
  );
}
