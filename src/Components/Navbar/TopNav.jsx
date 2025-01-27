import React, { useState } from 'react'
import { Link, NavLink } from 'react-router-dom';

const TopNav = () => {
  const [query, setQuery] = useState("")
  const handlefunction = (e) => {
    setQuery(e.target.value)
  }
  const handleEmptySearch = () => {
    setQuery("")
  }
  console.log(query)
  return (
    <div className="w-full h-[10vh]  relative  flex justify-center items-center ">
      <div className=" border-slate-100 px-1 w-[400px]  border h-8 rounded-lg flex items-center justify-center ">
        <i class=" text-xl text-zinc-400 ri-search-line"></i>
        <input
          onChange={handlefunction}
          value={query}
          type="text"
          className="outline-none text-white border-none  rounded-lg w-[] mx-10 p-5"
        />
        {query.length > 0 && (
          <i
            onClick={handleEmptySearch}
            class=" text-xl text-zinc-400 ri-close-line"
          ></i>
        )}
      </div>

      <div className="absolute w-[50%] max-h-[50vh] bg-zinc-200 top-[95%] rounded-lg overflow-auto">
        {/* <Link className="hover:text-black duration-300 hover:bg-zinc-300 text-zinc-600 font-semibold p-10 w-[100%] flex justify-center items-center   border-b-2 border-zinc-100 ">
          <img src="" alt="" />

          <span>hello world</span>
        </Link> */}

     
      </div>
      {/* <NavLink to={"/"}>Home</NavLink>
      <NavLink to={"/about"}>About</NavLink> */}
    </div>
  );
}

export default TopNav