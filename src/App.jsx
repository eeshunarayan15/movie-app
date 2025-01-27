import React from 'react'
import Navbar from './Components/Navbar/TopNav'
import Routing from './Components/Routing/Routing'
import Home from './Components/Home/Home'

const App = () => {
  return (
    <div className='w-screen h-screen bg-[#1F1e24] flex overflow-x-hidden '>

      <Routing />
 

    </div>
  )
}

export default App