import React from "react";
import { Link, NavLink } from "react-router-dom";

const Header = ({ data }) => {
  // console.log(data);

  // Create the full image URL using TMDB's base URL
  const imageUrl = data?.backdrop_path
    ? `https://image.tmdb.org/t/p/original${data.backdrop_path}`
    : "https://png.pngtree.com/png-vector/20221125/ourmid/pngtree-no-image-available-icon-flatvector-illustration-pic-design-profile-vector-png-image_40966566.jpg";

  return (
    <div
      style={{
        background: `linear-gradient(rgba(0,0,0,.2), rgba(0,0,0,.4), rgba(0,0,0,.5)), url("${imageUrl}")`,
        backgroundColor: "#000", // Fallback color
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
      role="img"
      aria-label={`Background image for ${data?.title || "movie"}`}
      className="w-full min-h-[50vh] flex flex-col justify-end items-start pl-[10%] pb-[4%]"
    >
      <div>
        <h1 className=" mb-4 text-3xl font-black text-white">
          {data?.name || data?.title || data?.original_title || "Untitled"}
        </h1>
        <p className="text-white text-sm ">
          {data.overview.slice(0, 200) || "No description available."}...
          <NavLink
            className={({ isActive }) =>
              `${isActive ? "text-blue-500" : "text-blue-300"}`
            }
    
            to={`${data.media_type}/details/${data.id}`}
          >
            More
          </NavLink>
        </p>
        <p className="text-white">
          {data.release_date}
          {data.media_type}
        </p>

        <p className="text-white uppercase">{data.media_type}</p>

        <p className="text-white">Language => {data.original_language}</p>

        <p className="text-white">Rating {data.vote_average}</p>
      </div>
    </div>
  );
};

export default Header;
