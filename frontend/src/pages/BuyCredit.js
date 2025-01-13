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
    { id: 'basic', title: 'Basic', discount: '25%' },
    { id: 'professional', title: 'Professional', discount: '35%' },
    { id: 'ultimate', title: 'Ultimate', discount: '45%' }
  ];

  return (
    <div className="bg-[#F0FCF9] w-full p-4">
      <div className="flex justify-between items-center px-4 mb-6">
        <button
          onClick={() => navigate('/')}
          className="bg-gray-800 text-white px-6 py-2 rounded-md hover:bg-gray-700 transition-colors"
        >
          Back to Home
        </button>
      </div>

      <div className="heading flex justify-center items-center mt-4 mb-11">
        <div className="w-32 md:w-36 h-9 rounded-full text-lg font-serif cursor-pointer flex justify-center items-center bg-black text-white">
          Our Plans
        </div>
      </div>

      <div className="flex flex-col md:flex-row justify-center items-center gap-8 md:gap-12 lg:gap-16">
        {plans.map((plan) => (
          <div key={plan.id} className="w-full max-w-xs bg-slate-950 rounded-xl p-4">
            <h3 className="text-center text-white text-xl md:text-2xl mt-1 font-serif">
              {plan.title}
            </h3>
            <img
              alt={`${plan.title} pricing`}
              src="/images/pricing.jpg"
              className="w-full h-40 object-cover rounded-lg mt-3"
            />
            <div className="flex justify-center items-center mt-2">
              <p className="text-white text-center bg-opacity-60 text-xs rounded-full bg-gray-50 px-3 py-1">
                Save {plan.discount}
              </p>
            </div>
            <button
              onClick={() => paymentRazorpay(plan.id)}
              className="bg-[#EA580C] mt-4 w-full rounded-md font-semibold text-center h-10 text-white"
            >
              Choose Plan
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}