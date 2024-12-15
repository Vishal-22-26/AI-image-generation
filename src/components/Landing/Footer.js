import React from 'react'
import { assets } from '../../assets/assets'

export default function Footer() {
  return (
    <div className='flex items-center justify-between
    gap-4 py-3 mt-20'>
        <img src={assets.Logo} width={150}/>
        <p className='text-sm text-gray-600'>Copyright @USCKIIT | All right reserved.</p>

        <div className='flex gap-3'>
            <img src={assets.facebook_icon} width={35} className='cursor-pointer'/>
            <img src={assets.instagram_icon} width={35} className='cursor-pointer'/>
            <img src={assets.twitter_icon} width={35} className='cursor-pointer'/>
        </div>
    </div>
  )
}
