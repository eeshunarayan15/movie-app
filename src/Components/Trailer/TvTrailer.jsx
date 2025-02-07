import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { asyncloadtv } from '../Store/Action/TvAction';

const TvTrailer = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();

  // Corrected selector
  const info = useSelector((state) => state.tv.info);
  console.log(info + "info");

  useEffect(() => {
    console.log("Dispatching asyncloadtv with id:", id);
    dispatch(asyncloadtv(id))
      .then((response) => {
        console.log("tv info fetched and state updated:", response);
      })
      .catch((error) => {
        console.error("Error fetching tv info:", error);
      });
    return () => {
      console.log("Dispatching asyncloadtv");
      dispatch(asyncloadtv());
    };
  }, [id, dispatch]);

    console.log("Current tv info:", info);
    const [youtubeLink, setYoutubeLink] = useState(null);
    
      // Jab bhi info update ho, useEffect chalega
      useEffect(() => {
        if (info && info.videos && info.videos.key) {
          // YouTube link generate karo using video key
          const link = `https://www.youtube.com/watch?v=${info.videos.key}`;
          setYoutubeLink(link);
          console.log("YouTube Trailer Link:", link);
        }
      }, [info]);

  return <div>TvTrailer</div>;
}

export default TvTrailer