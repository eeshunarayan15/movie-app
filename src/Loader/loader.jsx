import React from 'react'
import loaderGif from '../Components/images/loader.gif'; 

const Loader = () => {
  return (
      <div className='w-screen h-screen flex justify-center items-center bg-black'>
        <img className='h-[50%] ' src={loaderGif} alt="" />  
    </div>
  )
}

export default Loader