import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { asyncloadperson, removeperson } from "../Store/Action/personAction";
import {
  Link,
  Outlet,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import { ExternalLink, House, Loader, Loader2Icon, LoaderCircle, LucideLoaderCircle, Star } from "lucide-react";
import HorizontalCards from "../HorizontalCards/HorizontalCards";
import Trailer from "../Trailer/Trailer";
import DropDown from "../../DropDown/DropDown"

export const PersonDetails = () => {
  const [category, setCategory] = useState("movie");
  console.log(category)
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();

  // Corrected selector to get person info from Redux state
  const info = useSelector((state) => state.people.info);
  // In your component

  console.log("Combined Credits:", info?.combinedcredits.cast);

  // Fetch person details on mount and clean up on unmount
  useEffect(() => {
    console.log("Dispatching asyncloadperson with id:", id);
    dispatch(asyncloadperson(id))
      .then((response) => {
        console.log("Person data fetched and state updated:", response);
      })
      .catch((error) => {
        console.error("Error fetching person data:", error);
      });
    return () => {
      console.log("Dispatching removeperson");
      dispatch(removeperson());
    };
  }, [id, dispatch]);

  // Preload image for faster display, so jab img tag render ho toh image cache mein ho!
  useEffect(() => {
    if (info && info.detail && info.detail.profile_path) {
      const img = new Image();
      img.src = `https://image.tmdb.org/t/p/w500${info.detail.profile_path}`;
      console.log("Preloading image:", img.src);
    }
  }, [info]);

  console.log("Current person info:", info);
  return info ? (
    <div className="px-[3%] flex flex-col  w-screen h-screen">
      <nav
        id="part1"
        className="p-4 flex font-semibold h-[10vh] items-center text-zinc-200 gap-10 "
      >
        <button
          onClick={() => navigate(-1)}
          className="hover:text-[blue] text-2xl transition duration-200 transform hover:scale-130"
        >
          <i className="ri-arrow-go-back-fill" />
        </button>
      </nav>
      <div className="w-full  flex gap-2 ">
        {/* Part 2: Left poster and details */}
        <div className="left ">
          <div className="w-[12vw] rounded-lg overflow-hidden h-[35vh] ">
            <img
              src={`https://image.tmdb.org/t/p/w500${info.detail.profile_path}`}
              loading="lazy" // Browser ko bolte hain, "Bhai, tabhi load karo jab zarurat pade!"
              decoding="async" // Async decoding se performance aur behtar ho jati hai
              className="shadow-[8px_17px_13px_38px_2px_rgba(0,0,0,.5)] object-cover mb-2"
              alt={info.detail.name || "Person Image"}
              onError={(e) => {
                e.target.src = "/fallback-image.jpg"; // Agar image load nahi hui, fallback image show karega
                console.log("Image loading failed:", info.detail.profile_path);
              }}
            />
            <hr className="bg-slate-100   h-[1px]" />
            {/* Social media links */}
            <div className="flex items-center gap-3 text-white mt-2">
              <a
                href={`https://www.facebook.com/${info.externalid.facebook_id}`}
                target="_blank"
                className="hover:text-[blue] transition duration-200 transform hover:scale-130"
              >
                <i className="ri-facebook-circle-fill text-2xl "></i>
              </a>
              <a
                href={`https://www.instagram.com/${info.externalid.instagram_id}`}
                target="_blank"
                rel="noreferrer"
                className="hover:text-[blue] transition duration-200 transform hover:scale-130"
              >
                <i className="ri-instagram-line text-2xl"></i>
              </a>

              <a
                href={`https://x.com/${info.externalid.twitter_id}`}
                target="_blank"
                rel="noreferrer"
                className="hover:text-[blue] transition duration-200 transform hover:scale-130"
              >
                <i className="ri-twitter-x-line text-2xl"></i>
              </a>

              <a
                target="_blank"
                href={`https://www.imdb.com/title/${info.externalid.imdb_id}/`}
              >
                <i className="fa-brands fa-imdb text-2xl hover:text-[blue] font-semibold transition duration-200 transform hover:scale-130"></i>
              </a>
              <a
                target="_blank"
                href={`https://www.wikidata.org/wiki/${info.externalid.wikidata_id}`}
              >
                <i className="fa-brands fa-wikipedia-w text-2xl hover:text-[blue] transition duration-200 transform hover:scale-130"></i>
              </a>
            </div>
          </div>
          <div>
            {/* Aap yahan aur details ya components add kar sakte hain */}
            <h1 className="text-2xl text-zinc-400 font-semibold">
              Personal Information
            </h1>
            <h1 className="text-lg text-zinc-400 font-semibold">Known For </h1>
            <h1 className="text-lg text-zinc-400 font-semibold">
              {" "}
              {info.detail.known_for_department}
            </h1>
            <h1 className="text-lg text-zinc-400 font-semibold">Gender </h1>
            <h1 className="text-lg text-zinc-400 font-semibold">
              {" "}
              {info.detail.gender == 1 ? "Female" : "Male"}
            </h1>

            <h1 className="text-lg text-zinc-400 font-semibold">Birth Day </h1>
            <h1 className="text-lg text-zinc-400 font-semibold">
              {" "}
              {info.detail.birthday}
            </h1>
            <h1 className="text-lg text-zinc-400 font-semibold">Death Day </h1>
            <h1 className="text-lg text-zinc-400 font-semibold">
              {" "}
              {info.detail.deathday ? info.detail.deathday : "Not Available"}
            </h1>
            <h1 className="text-lg text-zinc-400 font-semibold">
              Place of Birth{" "}
            </h1>
            <h1 className="text-lg text-zinc-400 font-semibold">
              {" "}
              {info.detail.place_of_birth}
            </h1>
            <h1 className="text-lg text-zinc-400 font-semibold">
              Also Known As{" "}
            </h1>
            <h1 className="text-lg text-zinc-400 font-semibold">
              {" "}
              {info.detail.also_known_as.join()}
            </h1>
          </div>
        </div>
        <div className=" w-[88vw] rounded-lg right">
          <h1 className="text-6xl text-zinc-400 font-black">
            {info.detail.name}
          </h1>
          <h1 className="text-2xl  font-semibold mt-3 mb-3 text-white">
            Biography{" "}
          </h1>
          <p className="text-sm text-zinc-400 font-semibold">
            {" "}
            {info.detail.biography}
          </p>
          <h1 className="text-white text-2xl font-semibold  mt-3">
            Movies & Shows
          </h1>
          {info?.combinedcredits?.cast?.length > 0 && (
            <HorizontalCards
              trending={info.combinedcredits.cast}
              title="Filmography"
            />
          )}
        </div>
      </div>
      {/* Social or external links (uncomment if required)
      
      */}{" "}
      <div className="w-full h-full p-10  ">
        <div className="flex justify-between">
          <h1 className="text-xl text-zinc-500 font-semibold">Acting Carrer</h1>

          <DropDown
            title={category}
            options={["tv", "movie"]}
            handleDropdown={() => setCategory(e.target.value)}
          />
        </div>
        <div className="w-full h-[50vh] text-zinc-400 mt-5 border-zinc-700 p-5    overflow-x-auto overflow-y-auto shadow-2xl rounded-lg shadow-[rgba(255,255,255,.5)]  ">
          {info[category + "credits"].cast.map((item, index) => (
            <li
              key={index}
              className="hover:text-white duration-300 cursor-pointer"
            >
              <Link className="">
                <span>
                  {item.name ||
                    item.title ||
                    item.original_name ||
                    item.original_title}
                </span>
                <span className="block">{item.character&&`Character Name: ${item.character}` }</span>
              </Link>
            </li>
          ))}
        </div>
      </div>
    </div>
  ) : (
    <div className=" text-white w-full">
      {" "}
      <Loader />
    </div>
  );
};
