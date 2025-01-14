import React, { useContext } from 'react';
import { assets } from '../../assets/assets';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../../context/AppContext';
import { motion } from 'framer-motion';

export default function Header() {
  const navigate = useNavigate();
  const { token, setShowLogin } = useContext(AppContext);

  const handleGenerateClick = () => {
    if (!token) {
      setShowLogin(true);
    } else {
      navigate('/generate');
    }
  };

  return (
    <motion.div 
      className='flex flex-col justify-center items-center text-center my-2'
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className='text-stone-500 inline-flex text-center gap-2 bg-white px-6 py-1 rounded-full border border-neutral-500'
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <p>Best text to image generator</p>
        <img src={assets.star_icon} alt="Star Icon" />
      </motion.div>
      
      <motion.h1
        className='text-4xl max-w-[300px] sm:text-7xl sm:max-w-[590px] mx-auto mt-8 text-center'
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.4 }}
      >
        Turn text to <span className='text-orange-600 font-medium'>image</span>, in seconds
      </motion.h1>
      
      <motion.p
        className='text-center max-w-xl mx-auto mt-5'
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
      >
        Unleash your creativity with AI. Turn your imagination 
        into visual art in seconds - just type, and watch the magic
        happen.
      </motion.p>
      
      <motion.button
        className='sm:text-lg text-white bg-black wiauto mt-8 px-12 py-2.5 flex items-center gap-2 rounded-full'
        onClick={handleGenerateClick}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.8 }}
      >
        Generate Images
        <motion.img
          className='h-6'
          src={assets.star_group}
          alt="Star Group"
          animate={{ rotate: [0, 15, -15, 0] }} 
          transition={{
            repeat: Infinity, 
            repeatType: "loop",
            duration: 1.5, 
          }}
        />
      </motion.button>
      
      <motion.div
        className='flex flex-wrap justify-center mt-16 gap-3'
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
        }}
      >
        {Array(6).fill('').map((item, index) => (
          <motion.img
            className='rounded hover:scale-105 transition duration-300 cursor-pointer max-sm:w-10'
            src={index % 2 === 0 ? assets.sample_img_2 : assets.sample_img_1}
            key={index}
            width={70}
            alt="Sample"
            whileHover={{ scale: 1.2 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          />
        ))}
      </motion.div>
      
      <motion.p
        className='mt-2 text-neutral-600'
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.9, delay: 1 }}
      >
        Generated images from Pictora
      </motion.p>
    </motion.div>
  );
}
