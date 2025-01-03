import React from 'react';
import { Link } from 'react-router-dom';
import { FaCheckCircle, FaArrowRight } from 'react-icons/fa';

const PlanCard = ({ title, price, features, popular }) => (
  <div className={`w-full max-w-sm bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 ease-in-out ${popular ? 'border-4 border-[#ea6e2c]' : ''}`}>
    <h3 className="text-center text-black text-3xl font-extrabold mb-4">{title}</h3>
    <div className="text-center mb-6">
      <span className="text-5xl font-bold text-black">${price}</span>
      <span className="text-gray-600 ml-2">/month</span>
    </div>
    <ul className="mb-8 space-y-4">
      {features.map((feature, index) => (
        <li key={index} className="flex items-center">
          <FaCheckCircle className="text-[#ea6e2c] mr-3" />
          <span className="text-black">{feature}</span>
        </li>
      ))}
    </ul>
    <Link to="#" className="block">
      <button className={`w-full py-4 rounded-full font-bold text-lg transition-colors duration-300 ease-in-out flex items-center justify-center ${popular ? 'bg-[#ea6e2c] text-white hover:bg-[#d15e1f]' : 'bg-gray-200 text-black hover:bg-gray-300'}`}>
        Choose Plan
        <FaArrowRight className="ml-2" />
      </button>
    </Link>
  </div>
);

export default function BuyCredit() {
  const plans = [
    { 
      title: 'Starter', 
      price: 29, 
      features: ['100 AI-generated images', '24/7 support', 'Basic editing tools'],
      popular: false
    },
    { 
      title: 'Pro', 
      price: 79, 
      features: ['Unlimited AI-generated images', 'Priority support', 'Advanced editing suite', 'Custom AI training'],
      popular: true
    },
    { 
      title: 'Enterprise', 
      price: 199, 
      features: ['Everything in Pro', 'API access', 'Dedicated account manager', 'Custom integration'],
      popular: false
    },
  ];

  return (
    <div className="bg-gradient-to-b py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-extrabold text-black sm:text-4xl">
            Choose Your Perfect Plan
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Unlock the power of AI-generated images with our flexible pricing options
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {plans.map((plan, index) => (
            <PlanCard key={index} {...plan} />
          ))}
        </div>
      </div>
    </div>
  );
}
