import React from 'react'
import { useState } from 'react'
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
        <img src='images/pexels-didsss-3844786.jpg'></img>
      </div>

      <form className=' w-full flex flex-row justify-center items-center gap-2'>
        <input type='text'
         
         name="input"
         placeholder='write your text here'
         value={inputText.input}
         onChange={changeHandler}
         className=' w-80 h-6 px-2 rounded-full shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white'


        >
        </input>

        <button onClick={submitHandler} className=' px-2 rounded-full shadow-md bg-gradient-to-r from-orange-500 via-blue-500 to-gray-500 text-white font-semibold hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'>Generate Image</button>
      </form>
    </div>
  )
}

