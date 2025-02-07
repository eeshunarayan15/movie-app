import axios from '../../Utils/axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import TopNav from '../Navbar/TopNav';
import InfiniteScroll from 'react-infinite-scroll-component';
import VerticalCards from '../Verticalcards/VerticalCards';
import PeopleCard from '../HorizontalCards/PeopleCard';


const People = () => {
    
  const [people, setPeople] = useState([]);
  const [duration, setDuration] = useState("day");
  const [category, setCategory] = useState("now_playing");
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const navigate = useNavigate();

  // Fetch data using your custom instance
  const getPeople = async () => {
    try {
      const { data } = await axios.get(`person/popular?page=${page}`);
      console.log("API Response:", data); // Log the full response
      if (data.results?.length > 0) {
        setPeople((prev) => [...prev, ...data.results]);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.error("API Error:", error);
    }
  };

  // Fetch more data for infinite scroll
  const fetchMoreData = () => {
    setPage((prevPage) => prevPage + 1); // Increment page
  };

  // Fetch data on component mount or when category/duration changes
  useEffect(() => {
    setPeople([]); // Clear existing data
    setPage(1); // Reset page to 1
    setHasMore(true); // Reset hasMore
      getPeople();
  }, [category, duration]);

  // Fetch data when page changes
  useEffect(() => {
    if (page > 1) {
        getPeople();
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
        <h1 className="text-2xl text-zinc-400 font-semibold">
          Person
        </h1>
        <TopNav />
      
      </div>

      <div
        id="scrollableDiv"
        className="w-[95%] mx-auto"
        style={{ height: "80vh", overflowY: "auto" }}
      >
        <InfiniteScroll
          dataLength={people.length} // Current length of data
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
                  <PeopleCard data={people } />
        </InfiniteScroll>
      </div>
    </div>
  );
}

export default People