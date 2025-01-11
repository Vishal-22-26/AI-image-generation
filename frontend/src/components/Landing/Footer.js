import React from 'react'
import { assets } from '../../assets/assets'

export default function Footer() {
  return (
    <div className='flex flex-wrap items-center justify-between
    gap-4 py-5 mt-20 w-full px-4 lg:px-10 bg-gray-100'>
      <div className='w-full sm:w-auto flex justify-center sm:justify-start'>
        <img src={assets.Logo} width={150}/>
      </div>

        <p className='text-sm text-gray-600 w-full text-center sm:w-auto sm:text-left'>Copyright @USCKIIT | All right reserved.</p>

        <div className='flex gap-4 w-full sm:w-auto justify-center sm:justify-end'>
            <img src={assets.facebook_icon} alt='Facebook' width={35} className='cursor-pointer hover:opacity-80 transition-opacity'/>
            <img src={assets.instagram_icon} alt='Instagram' width={35} className='cursor-pointer hover:opacity-80 transition-opacity'/>
            <img src={assets.twitter_icon} alt='Twitter' width={35} className='cursor-pointer hover:opacity-80 transition-opacity'/>
        </div>
    </div>
  )
}
