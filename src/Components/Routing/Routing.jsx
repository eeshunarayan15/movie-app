import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from '../Home/Home'
import About from '../About/About';
import Trending from '../Trending/Trending';
import Popular from '../Popular/Popular';
import Movie from '../Movie/Movie';
import Shows from '../Shows/Shows';
import People from '../People/People';
import ContactUs from '../ContactUs/ContactUs';

import TvDetails from '../TvDetails/TvDetails';
import MovieDetails from '../MovieDetails/MovieDetails';
import Trailer from '../Trailer/Trailer';
import TvTrailer from '../Trailer/TvTrailer';
import { PersonDetails } from '../Person/PersonDetails';

const Routing = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/trending" element={<Trending />} />
        <Route path="/popular" element={<Popular />} />

        <Route path="/movie" element={<Movie />} />
        <Route path="/movie/details/:id" element={<MovieDetails />} />
        <Route path="/movie/details/:id/trailer" element={<Trailer />} />

        <Route path="/shows" element={<Shows />} />
        <Route path="/shows/tv/details/:id" element={<TvDetails />} />
        <Route path="/shows/tv/details/:id/trailer" element={<TvTrailer />} />

        <Route path="/people" element={<People />} />
        <Route path="/people/details/:id" element={<PersonDetails/>} />

        <Route path="/about" element={<About />} />
        <Route path="/contactus" element={<ContactUs />} />
      </Routes>
    </>
  );
}

export default Routing