import React, { useEffect } from "react";

import { Await, NavLink } from "react-router-dom";

const SideNav = () => {
  return (
    <div className="w-[20%]   border-zinc-400 p-3">
      <h1 className="text-white">
        <i className="ri-tv-fill text-[#6556CD] text-2xl mr-2"></i>
        <span className="text-2xl font-bold ">Movie App</span>
      </h1>
      <h1 className="text-white text-xl font-semibold pl-10 py-4 mt- mb-">
        New Feeds
      </h1>
      <nav className="flex flex-col text-zinc-400 text-xl  ">
        <NavLink  className="hover:bg-[#6556CD] hover:text-white duration-300 rounded-lg p-4  ">
          Home
        </NavLink>
        <NavLink
          
          to={"/trending"}
          className="hover:bg-[#6556CD] hover:text-white duration-300 rounded-lg p-4 "
        >
          <i className="ri-fire-line mr-2"></i>Trending
        </NavLink>
        <NavLink to={"/popular"} className="hover:bg-[#6556CD] hover:text-white duration-300 rounded-lg p-4 ">
          <i className="ri-bard-line mr-2"></i> Popular
        </NavLink>
        <NavLink to={"/movie"} className="hover:bg-[#6556CD] hover:text-white duration-300 rounded-lg p-4 ">
          <i className="ri-movie-2-fill mr-2"></i> Movie
        </NavLink>
        <NavLink to={"/shows"} className="hover:bg-[#6556CD] hover:text-white duration-300 rounded-lg p-4 ">
          <i className="ri-tv-line mr-2"></i> shows
        </NavLink>
        <NavLink to={"/people"} className="hover:bg-[#6556CD] hover:text-white duration-300 rounded-lg p-4 ">
          <i className="ri-team-fill mr-2 "></i> People
        </NavLink>
      </nav>
      <nav className="flex flex-col text-zinc-400 text-xl  ">
        <hr className=" bg-zinc-400 h-[1px]" />
        <h1 className="text-whit font-semibold text-xl mt-10 mb-5 ">
          Website Information
        </h1>
        <NavLink to={"/about"} className="hover:bg-[#6556CD] hover:text-white duration-300 rounded-lg p-4  ">
          <i className="mr-2 ri-information-fill"></i> About
        </NavLink>
        <NavLink to={"/contactus"} className="hover:bg-[#6556CD] hover:text-white duration-300 rounded-lg p-4 ">
          <i className="mr-2 ri-contacts-fill"></i>Contact Us
        </NavLink>
      </nav>
    </div>
  );
};

export default SideNav;
