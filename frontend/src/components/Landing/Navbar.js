import React, { useContext } from 'react';
import { assets } from '../../assets/assets.js';
import { Link, useNavigate } from 'react-router-dom';
import { AppContext } from '../../context/AppContext.js';

export default function Navbar() {
    
    const {user,setShowLogin, logout, credit} = useContext(AppContext)
    const navigate = useNavigate();

    return (
        <div className="flex items-center justify-between py-4">
            <Link to={'/'}>
                <img src={assets.Logo} className="w-28 sm:w-32 lg:w-40" alt="Logo" />
            </Link>
            <div>
                {user ? (
                    <div className="flex items-center gap-2 sm:gap-3">
                        <button onClick={() =>navigate('/BuyCredit')} className="flex items-center gap-2 bg-red-100 px-4 sm:px-6 py-1.5 sm:py-3 rounded-full hover:scale-105 transition-all duration-500">
                            <img className="w-4" src={assets.credit_star} alt="Credits Icon" />
                            <p className="text-xs sm:text-sm font-medium text-gray-600">Credits left : {credit}</p>
                        </button>
                        <p className="text-gray-600 max:sm:hidden pl-4">Hi, {user.name}</p>
                        <div className="relative group">
                            <img src={assets.profile_icon} className="w-10 drop-shadow cursor-pointer" alt="Profile Icon" />
                            
                            <div className="absolute hidden group-hover:block top-full right-0 z-10 text-black bg-white rounded-md border text-sm shadow-lg">
                                <ul className="list-none m-0 p-2">
                                    <li onClick={logout}
                                    className="py-1 px-2 cursor-pointer hover:bg-gray-100 rounded w-20"
                                    >
                                        Log out
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="flex items-center gap-2 sm:gap-5">
                        <p onClick={() => navigate('/BuyCredit')} className="cursor-pointer">
                            Pricing
                        </p>
                        <button onClick={()=>setShowLogin(true)} className="bg-zinc-800 text-white px-7 py-2 sm:px-10 text-sm rounded-full">Login</button>

                    </div>
                )}
            </div>
        </div>
    );
}
