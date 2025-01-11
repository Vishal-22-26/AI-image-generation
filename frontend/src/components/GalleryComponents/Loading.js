import React from 'react'

export default function Loading() {
  return (
    <div className='h-200 flex flex-col justify-center items-center min-h-screen'>
      <img src="images/loading.gif"></img>
      <h1 className='text-4xl font-bold'>Loading...</h1>
    </div>
  )
}


