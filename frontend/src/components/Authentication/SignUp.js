import React, { useState, useEffect, useContext } from "react";
import { assets } from "../../assets/assets";
import { AppContext } from "../../context/AppContext";
import axios from 'axios';
import { toast } from 'react-toastify';

const SignUp = ({ onBackToLogin }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { setShowLogin, setUser, backendUrl, setToken } = useContext(AppContext);

  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  const handleSignUp = async(e) => {
    e.preventDefault();

    try{
    
      const {data} = await axios.post(backendUrl + '/api/user/register', {name,email, password});

      if(data.success){
        setToken(data.token)
        setUser(data.user)
        localStorage.setItem('token', data.token)
        setShowLogin(false)
      }else{
        toast.error(data.message)
      }
  
}catch(error){
  const errorMessage = error.response?.data?.message || 'Something went wrong during signup';
      toast.error(errorMessage);
}
};

  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 z-50 backdrop-blur-sm bg-black/30 flex justify-center items-center">
      <form
        onSubmit={handleSignUp}
        className="relative bg-white p-10 rounded-xl text-slate-500 w-96 max-w-[90%]"
      >
        <h1 className="text-center text-2xl text-neutral-700 font-medium">
          Sign Up
        </h1>
        <p className="text-sm text-center mb-4">Create a new account</p>

        <div className="border px-6 py-2 flex items-center gap-2 rounded-full mt-5">
          <img
            src={assets.profile_icon}
            alt=""
            className="w-5 h-5 object-contain"
          />
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="outline-none text-sm w-full"
            placeholder="Full Name"
            required
          />
        </div>

        <div className="border px-6 py-2 flex items-center gap-2 rounded-full mt-4">
          <img src={assets.email_icon} alt="" />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="outline-none text-sm w-full"
            placeholder="Email id"
            required
          />
        </div>

        <div className="border px-6 py-2 flex items-center gap-2 rounded-full mt-4">
          <img src={assets.lock_icon} alt="" />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="outline-none text-sm w-full"
            placeholder="Password"
            required
          />
        </div>

        <button type='submit' className="bg-black w-full text-white py-2 rounded-full mt-4">SignUp
        </button>

        <p className="mt-5 text-center">
          Already have an account?{" "}
          <span
            className="text-blue-600 cursor-pointer"
            onClick={onBackToLogin}
          >
            Login
          </span>
        </p>

        <img
          onClick={() => setShowLogin(false)}
          src={assets.cross_icon}
          className="absolute top-5 right-5 cursor-pointer"
          alt="Close"
        />
      </form>
    </div>
  );
};

export default SignUp;