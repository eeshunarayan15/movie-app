import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ReactPlayer from "react-player";

const Trailer = () => {
  // Redux store se movie info ko access kar rahe hain
  const data = useSelector((state) => state.movie.info);
  // Local state mein YouTube link ko store karne ke liye
  const [youtubeLink, setYoutubeLink] = useState(null);

  // Jab bhi data update ho, useEffect chalega
  useEffect(() => {
    if (data && data.videos && data.videos.key) {
      // YouTube link generate karo using video key
      const link = `https://www.youtube.com/watch?v=${data.videos.key}`;
      setYoutubeLink(link);
      console.log("YouTube Trailer Link:", link);
    }
  }, [data]);

  return (
    <div>
      <h2>Movie Trailer</h2>
      {youtubeLink ? (
        // ReactPlayer component ka use karke video play kar rahe hain
        <ReactPlayer url={youtubeLink} controls={true} className="w-full" />
      ) : (
        // Agar link nahi mila toh loading message dikhate hain
        <p>Loading trailer...</p>
      )}
    </div>
  );
};

export default Trailer;
