import React from 'react'
import { useState } from 'react'
import { NavLink } from 'react-router-dom';
import { IoArrowForwardCircleOutline } from "react-icons/io5";
import { AiOutlinePlus, AiOutlineAudio } from "react-icons/ai";
import {aiphoto} from "./aiphoto.jpg"
export default function ImgComponent() {
   const [inputText, setInputText]= useState({input:""});

   function changeHandler(event){
       event.preventDefault();
       
       setInputText(()=>({[event.target.name]:event.target.value}))
   }

   function submitHandler(event){
      event.preventDefault()
      
      console.log(inputText.input)
   }
  return (
    <div className='w-full text-lg py-5 flex justify-center items-center flex-col'>
      <div className='bg-customBg h-80 w-80 overflow-hidden m-4 shadow-lg shadow-black  rounded-lg'>
        <img src="aiphoto.jpg"
          className="h-full w-full object-cover"
        ></img>
      </div>

      <form className="flex items-center bg-black rounded-full px-4 py-2 shadow-md w-full max-w-[600px] my-4 gap-x-2">
      
      <input
        type="text"
        name="message"
        placeholder="Write your text here."
        className="flex-1 bg-transparent outline-none text-white placeholder-gray-400 mx-3"
      />
      <button
        type="submit"
        className="text-white text-xl focus:outline-none"
        aria-label="Send message"
      >
        <AiOutlineAudio />
      </button>
      <button
        type="button"
        className="bg-orange-400 text-white text-sm font-medium px-4 py-2 rounded-full hover:bg-orange-500 focus:outline-none"
      >
        Generate Image
      </button>
    </form>
      <NavLink to="../pages/GalleryPage">
          <div className='bg-orange-400 text-white text-sm font-medium px-4 py-2 rounded-full hover:bg-orange-500 focus:outline-none flex flex-row justify-center items-center gap-x-2'>
            <IoArrowForwardCircleOutline />
            <button>GO TO MY GALLERY</button>
          </div>
        </NavLink>
    </div>
  )
}

