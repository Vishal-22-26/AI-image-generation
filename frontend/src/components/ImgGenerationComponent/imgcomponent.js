import React, { useContext, useState } from 'react'
import { IoArrowForwardCircleOutline } from "react-icons/io5";
import { IoHomeOutline } from "react-icons/io5";  
import aiphoto from "./aiphoto.jpg"  
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../../context/AppContext';
import { MdOutlineDownloading } from "react-icons/md";

export default function ImgComponent() {
   const [inputText, setInputText] = useState({input: ""});
   const [isImageLoaded, setIsImageLoaded] = useState(false);
   const [image, setImage] = useState(aiphoto);
   const [loading, setLoading] = useState(false);
   const { generateImage } = useContext(AppContext);
   const navigate = useNavigate();
  
   function changeHandler(event) {
       const { name, value } = event.target;
       setInputText(prev => ({...prev, [name]: value}));
   }

   async function downloadHandler() {
     try {
       const currentImage = isImageLoaded ? image : aiphoto;
       
       if (currentImage.startsWith('data:image')) {
         const link = document.createElement("a");
         link.href = currentImage;
         link.download = `ai-generated-${Date.now()}.jpg`;
         link.click();
         link.remove();
       } else {
         const response = await fetch(currentImage);
         const blob = await response.blob();
         const url = window.URL.createObjectURL(blob);
         const link = document.createElement("a");
         link.href = url;
         link.download = `ai-generated-${Date.now()}.jpg`;
         link.click();
         window.URL.revokeObjectURL(url);
         link.remove();
       }
     } catch (error) {
       console.error("Error downloading image:", error);
     }
   }

   const submitHandler = async(e) => {
      e.preventDefault();
      setLoading(true);

      try {
        if(inputText.input.trim()) {
          const generatedImage = await generateImage(inputText.input);
          if(generatedImage) {
            setIsImageLoaded(true);
            setImage(generatedImage);
          }
        }
      } catch (error) {
        console.error("Error generating image:", error);
      } finally {
        setLoading(false);
      }
   }

  return (
    <div className='w-full text-lg py-5 flex justify-center items-center flex-col'>
      <div className='bg-customBg h-80 w-80 overflow-hidden m-4 shadow-lg shadow-black rounded-lg'>
        <img 
          src={isImageLoaded ? image : aiphoto}
          alt="AI Generated"
          className="h-full w-full object-cover"
        />
      </div>

      <form onSubmit={submitHandler} className="flex items-center bg-black rounded-full px-4 py-2 shadow-md w-[90%] max-w-[600px] my-4">
        <input
          type="text"
          name="input"
          value={inputText.input}
          onChange={changeHandler}
          placeholder="Write your text here."
          className="flex-1 bg-transparent outline-none text-white placeholder-gray-400 mx-3 min-w-0"
          disabled={loading}
        />
        
        <button
          type="submit"
          className={`whitespace-nowrap bg-orange-400 text-white text-sm font-medium px-4 py-2 rounded-full hover:bg-orange-500 focus:outline-none ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
          disabled={loading}
        >
          {loading ? 'Generating...' : 'Generate Image'}
        </button>
      </form>

      <div className='flex flex-wrap justify-center gap-3 px-4'>
        <div 
          className='bg-orange-400 text-white text-sm font-medium px-4 py-2 rounded-full hover:bg-orange-500 focus:outline-none flex flex-row justify-center items-center gap-x-2 cursor-pointer whitespace-nowrap' 
          onClick={() => navigate('/')}
        >
          <IoHomeOutline />
          <span>HOME</span>
        </div>
        <div 
          className='bg-orange-400 text-white text-sm font-medium px-4 py-2 rounded-full hover:bg-orange-500 focus:outline-none flex flex-row justify-center items-center gap-x-2 cursor-pointer whitespace-nowrap' 
          onClick={() => navigate('/gallery')}
        >
          <IoArrowForwardCircleOutline />
          <span>GO TO MY GALLERY</span>
        </div>
        <div 
          className='bg-orange-400 text-white text-sm font-medium px-4 py-2 rounded-full hover:bg-orange-500 focus:outline-none flex flex-row justify-center items-center gap-x-2 cursor-pointer whitespace-nowrap' 
          onClick={downloadHandler}
        >
          <MdOutlineDownloading />
          <span>Download Image</span>
        </div>
      </div>
    </div>
  )
}