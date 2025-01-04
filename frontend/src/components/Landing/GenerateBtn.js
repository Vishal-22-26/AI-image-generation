import React, {useContext} from 'react'
import { useNavigate } from 'react-router-dom'
import { assets } from '../../assets/assets'
import { AppContext } from '../../context/AppContext';

export default function GenerateBtn() {
  const navigate = useNavigate();
   const {token, setShowLogin} = useContext(AppContext)
  
    const handleGenerateClick = () => {
      if(!token){
        setShowLogin(true)
      } else{
        navigate('/generate')
      }
    }

  return (
    <div className='pb-16 text-center'>
        <h1 className='text-2xl md:text-3xl lg:text-4xl
        mt-4 font-semibold text-neutral-800 py-6 md:py-16'>See the magic. Try now</h1>
        <button 
            className='inline-flex items-center gap-2 px-12 py-3
            rounded-full bg-black text-white m-auto hover:scale-105
            transition-all duration-500' 
            onClick={handleGenerateClick}
        >
            Generate Images
            <img className='h-6' src={assets.star_group} alt="star group"/>
        </button>
    </div>
  )
}