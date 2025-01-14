import React from 'react'
import { assets } from '../../assets/assets'
import { SiLinkedin, SiInstagram } from 'react-icons/si'
import { HiGlobeAlt } from 'react-icons/hi'

export default function Footer() {
  return (
    <div className='flex flex-wrap items-center justify-between
    gap-4 py-5 mt-20 w-full px-4 lg:px-10 bg-gray-100'>
      <div className='w-full sm:w-auto flex justify-center sm:justify-start'>
        <img src={assets.Logo} width={150} alt="Logo"/>
      </div>

      <p className='text-sm text-gray-600 w-full text-center sm:w-auto sm:text-left'>Copyright @<span><a href="https://usckiit.in" target="_blank" className='text-blue-600 hover:underline'>USC KIIT</a></span> | All right reserved.</p>

      <div className='flex gap-6 w-full sm:w-auto justify-center sm:justify-end'>
        <a 
          href="https://www.linkedin.com/company/uipath-community-kiit/posts/?feedView=all" 
          target="_blank" 
          rel="noopener noreferrer"
          className='text-gray-600 hover:text-blue-600 transform hover:scale-110 transition-all duration-200'
        >
          <SiLinkedin size={26} />
        </a>
        <a 
          href="https://www.instagram.com/usc.kiit/" 
          target="_blank" 
          rel="noopener noreferrer"
          className='text-gray-600 hover:text-pink-600 transform hover:scale-110 transition-all duration-200'
        >
          <SiInstagram size={26} />
        </a>
        <a 
          href="https://usckiit.in" 
          target="_blank" 
          rel="noopener noreferrer"
          className='text-gray-600 hover:text-green-600 transform hover:scale-110 transition-all duration-200'
        >
          <HiGlobeAlt size={28} />
        </a>
      </div>
    </div>
  )
}