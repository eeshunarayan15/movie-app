import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from '../Home/Home'
import About from '../About/About';

const Routing = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </>
  );
}

export default Routing