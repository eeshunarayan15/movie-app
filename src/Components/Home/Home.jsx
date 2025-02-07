import React, { useEffect, useState } from "react";
import SideNav from "../Navbar/SideNav";
import TopNav from "../Navbar/TopNav";
import axios from "../../Utils/axios";
import Header from "../Header/Header";
import HorizontalCards from "../HorizontalCards/HorizontalCards";
import DropDown from "../../DropDown/DropDown";
import Loader from "../../Loader/loader";

const Home = () => {
  const [category, setCategory] = useState("movie");
  document.title = "Movie App || HOMEPEAGE";
  const [wallpaper, setWallpaper] = useState(null);
  const [trending, setTrending] = useState([]);
  const [dataLoaded, setDataLoaded] = useState(false);
  const [isTimeoutDone, setIsTimeoutDone] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsTimeoutDone(true);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (wallpaper && trending) {
      setDataLoaded(true);
    }
  }, [wallpaper, trending]);

  useEffect(() => {
    const getHeaderWallpaper = async () => {
      try {
        const { data } = await axios.get("/movie/upcoming", {
          params: { language: "en-US", page: 1 },
        });
        if (data.results?.length > 0) {
          const randomIndex = Math.floor(Math.random() * data.results.length);
          setWallpaper(data.results[randomIndex]);
        }
      } catch (error) {
        console.error("Error fetching wallpaper:", error);
      }
    };

    getHeaderWallpaper();
  }, []);

  useEffect(() => {
    const getTrending = async () => {
      try {
        const response = await axios.get(`/trending/${category}/day`);
        setTrending(response.data.results);
      } catch (error) {
        console.error("Error fetching trending:", error);
      }
    };

    getTrending();
  }, [category]);

  const handleDropdown = (e) => {
    setCategory(e.target.value);
  };

  return dataLoaded && isTimeoutDone ? (
    <>
      <SideNav
        handleDropdown={handleDropdown}
        isOpen={isSidebarOpen}
        closeSidebar={() => setIsSidebarOpen(false)}
      />
      <div className="w-full lg:w-[80%] h-full overflow-auto overflow-x-auto">
        <TopNav toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
        <Header data={wallpaper} />
        <div className="mb-5 flex flex-col lg:flex-row justify-between pt-10 px-4 lg:px-10">
          <h1 className="text-2xl lg:text-3xl text-zinc-400 font-semibold lg:pt-2 mb-4 lg:mb-0">
            Trending
          </h1>
          <DropDown
            title="filter"
            options={["tv", "movie", "all"]}
            handleDropdown={handleDropdown}
            className="w-full lg:w-auto"
          />
        </div>
        <div className="px-3">
          <HorizontalCards title={category} trending={trending} />
        </div>
      </div>
      {/* Mobile overlay */}
      {isSidebarOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </>
  ) : (
    <Loader />
  );
};

export default Home;
