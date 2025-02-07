import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from '../../Utils/axios';
import VerticalCards from '../Verticalcards/VerticalCards';
import InfiniteScroll from 'react-infinite-scroll-component';
import DropDown from '../../DropDown/DropDown';
import TopNav from '../Navbar/TopNav';

const Movie = () => {


    
  const [movie, setMovie] = useState([]);
  const [duration, setDuration] = useState("day");
  const [category, setCategory] = useState("now_playing");
  document.title = "MOVIE APP || Trending " + category.toUpperCase();

  //========================================================
  const [page, setPage] = useState(1); // Track current page
  const [hasMore, setHasMore] = useState(true); // Track if more data is available

  //========================================================
  const navigate = useNavigate();

  const getMovie = async () => {
    try {
      const { data } = await axios.get(
        `/movie/${category}?page=${page}`
      );
 
      console.log(data.results);
      if (data.results.length > 0) {
        // Append new data to existing data
        setMovie((prev) => [...prev, ...data.results]);
      } else {
        // No more data to load
        setHasMore(false);
      }
    } catch (error) {
      console.log("error" + error);
    }
  };

  // Fetch more data for infinite scroll
  const fetchMoreData = () => {
    setPage((prevPage) => prevPage + 1); // Increment page
  };

  // Fetch data on component mount or when category/duration changes
  useEffect(() => {
    setMovie([]); // Clear existing data
    setPage(1); // Reset page to 1
    setHasMore(true); // Reset hasMore
    getMovie();
  }, [category, duration]);

  // Fetch data when page changes
  useEffect(() => {
    if (page > 1) {
      getMovie();
    }
  }, [page]);

  const handleCategory = (event) => {
    setCategory(event.target.value);
  };

  const handleDuration = (event) => {
    setDuration(event.target.value);
  };

  return (
    <div className="w-screen h-screen">
      <div className="h-[10vh] bg-zinc-700 w-[95%] mx-auto rounded-lg flex items-center  gap-2">
        <i
          onClick={() => navigate(-1)}
          className="ri-arrow-go-back-line pl-4 text-2xl text-white hover:text-[#6556CD]"
        ></i>
              <h1 className="text-2xl text-zinc-400 font-semibold">MOVIE { category.toUpperCase()}</h1>
        <TopNav />
        <DropDown
          handleDropdown={handleCategory}
          title="Category"
          options={["popular", "top_rated", "upcoming","now_playing"]}
        />
       
      </div>

      <div
        id="scrollableDiv"
        className="w-[95%] mx-auto"
        style={{ height: "80vh", overflowY: "auto" }}
      >
        <InfiniteScroll
          dataLength={movie.length} // Current length of data
          next={fetchMoreData} // Function to fetch more data
          hasMore={hasMore} // Boolean to check if more data is available
          loader={<h4 className="text-center text-white">Loading...</h4>} // Loader component
          endMessage={
            <p className="text-center">
              <b>Yay! You have seen it all</b>
            </p>
          }
          scrollableTarget="scrollableDiv" // ID of the scrollable container
        >
          <VerticalCards trending={movie} title={category} />
        </InfiniteScroll>
      </div>
    </div>
  );
}

export default Movie