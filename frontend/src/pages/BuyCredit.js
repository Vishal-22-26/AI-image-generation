import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

export default function BuyCredit() {
  const navigate = useNavigate();
  const { user, backendUrl, loadCreditsData, token, setShowLogin } = useContext(AppContext);

  const initPay = async (order) => {
    const options = {
      key: process.env.REACT_APP_RAZORPAY_KEY,
      amount: order.amount,
      currency: order.currency,
      name: 'Credit Purchase',
      description: 'Purchase Credits',
      order_id: order.id,
      handler: async (response) => {
        try {
          const { data } = await axios.post(
            `${backendUrl}/api/user/verify-razor`,
            { ...response },
            { headers: { token } }
          );
          
          if (data.success) {
            loadCreditsData();
            toast.success('Payment successful!');
          }
        } catch (error) {
          toast.error('Payment verification failed');
        }
      },
      prefill: {
        name: user?.name,
        email: user?.email
      },
      theme: {
        color: '#EA580C'
      }
    };

    const razorpay = new window.Razorpay(options);
    razorpay.open();
  };

  const paymentRazorpay = async (planId) => {
    try {
      if (!user) {
        setShowLogin(true);
        return;
      }

      const { data } = await axios.post(
        `${backendUrl}/api/user/pay-razor`,
        { planId },
        { headers: { token } }
      );

      if (data.success) {
        initPay(data.order);
      }
    } catch (error) {
      toast.error(error.message || 'Payment initialization failed');
    }
  };

  const plans = [
    { id: 'basic', title: 'Basic Plan', price: 'Rs. 129', credits: '5', description: 'Perfect for getting started' },
    { id: 'professional', title: 'Pro Plan', price: 'Rs. 199', credits: '10', description: 'Most popular choice' },
    { id: 'ultimate', title: 'Ultimate Plan', price: 'Rs. 499', credits: '15', description: 'Best value for power users' }
  ];

  return (
    <div className=" w-full px-4 pb-5">
      <div className="max-w-5xl mx-auto">
        <button
          onClick={() => navigate('/')}
          className="mb-6 mt-2 px-6 py-2.5 bg-black border border-gray-200 text-gray-100 rounded-lg 
            hover:bg-gray-800 transition-colors duration-200 flex items-center gap-2 shadow-sm"
        >
          <span>←</span> Back
        </button>

        <div className="text-center mb-14">
          <h2 className="text-3xl font-bold text-gray-900">
            Choose Your Credit Package
          </h2>
          <p className="mt-3 text-gray-600">
            Select the plan that best suits your needs
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className="relative bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300
                border border-gray-100 overflow-hidden"
            >
              {plan.id === 'professional' && (
                <div className="absolute top-0 left-0 right-0 bg-[#EA580C] text-white text-xs py-1.5 text-center">
                  MOST POPULAR
                </div>
              )}
              
              <div className="p-8 pt-12">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {plan.title}
                </h3>
                <p className="text-gray-500 text-sm mb-6">
                  {plan.description}
                </p>

                <div className="mb-8">
                  <div className="flex items-baseline">
                    <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                    <span className="ml-2 text-gray-500">/ one-time</span>
                  </div>
                  <p className="mt-2 text-[#EA580C] font-medium">
                    {plan.credits} Credits
                  </p>
                </div>

                <ul className="space-y-4 mb-8">
                  <li className="flex items-center text-gray-600">
                    <svg className="w-5 h-5 text-[#EA580C] mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/>
                    </svg>
                    Instant Credit Delivery
                  </li>
                  <li className="flex items-center text-gray-600">
                    <svg className="w-5 h-5 text-[#EA580C] mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/>
                    </svg>
                    No Expiration Date
                  </li>
                </ul>

                <button
                  onClick={() => paymentRazorpay(plan.id)}
                  className={`w-full py-3.5 px-6 rounded-lg font-medium transition-all duration-200
                    ${plan.id === 'professional' 
                      ? 'bg-[#EA580C] text-white hover:bg-[#D45207]' 
                      : 'bg-gray-200 text-gray-700 hover:text-gray-100 hover:bg-gray-900'}`}
                >
                  Select Package
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}