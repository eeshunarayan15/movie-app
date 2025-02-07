import React from 'react'

import { Star, Film, Tv, Award, TrendingUp } from "lucide-react";
import { useNavigate } from 'react-router-dom';

const PeopleCard = ({ data }) => {
  const navigate = useNavigate();
  const handlePersonClick = (personid) => {
    navigate(`/people/details/${personid}`)
    
  }
  return (
    <div className="min-h-screen bg-[#1F1E24] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-white sm:text-5xl md:text-6xl">
            Popular People
          </h1>
          <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-400 sm:mt-4">
            Discover trending personalities in entertainment
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {data.map((person) => (
            <div 
              onClick={()=>handlePersonClick(person.id)}
              key={person.id}
              className="group relative bg-[#2A2931] rounded-2xl shadow-lg overflow-hidden transform transition duration-300 hover:scale-[1.02] hover:shadow-[0_0_25px_rgba(101,86,205,0.2)]"
            >
              <div className="relative aspect-w-3 aspect-h-4">
                <img
                  src={`https://image.tmdb.org/t/p/w500${person.profile_path}`}
                  alt={person.name}
                  className="w-full h-[400px] object-cover object-center transform transition duration-300 "
                  onError={(e) => {
                    e.target.src =
                      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=500&h=500&fit=crop";
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1F1E24]/90 via-[#1F1E24]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                {person.adult && (
                  <span className="absolute top-4 right-4 bg-red-500/90 text-white text-xs font-bold px-2 py-1 rounded">
                    18+
                  </span>
                )}
              </div>

              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h2 className="text-2xl font-bold text-white group-hover:text-[#6556CD] transition-colors">
                      {person.name}
                    </h2>
                    {person.original_name !== person.name && (
                      <p className="text-sm text-gray-400 mt-1">
                        {person.original_name}
                      </p>
                    )}
                  </div>
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-[#6556CD]/20 text-[#6556CD]">
                    {person.known_for_department}
                  </span>
                </div>

                <div className="space-y-3 mb-4">
                  <div className="flex items-center text-gray-400">
                    <TrendingUp className="w-4 h-4 mr-2 text-[#6556CD]" />
                    <span className="text-sm">Popularity: </span>
                    <div className="ml-2 flex-1 bg-[#1F1E24] rounded-full h-2">
                      <div
                        className="bg-[#6556CD] h-2 rounded-full transition-all duration-300"
                        style={{
                          width: `${Math.min(person.popularity, 100)}%`,
                        }}
                      />
                    </div>
                  </div>
                  <p className="text-sm text-gray-400 flex items-center">
                    <Award className="w-4 h-4 mr-2 text-[#6556CD]" />
                    Gender:{" "}
                    {person.gender === 1
                      ? "Female"
                      : person.gender === 2
                      ? "Male"
                      : "Other"}
                  </p>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-white border-b border-[#1F1E24] pb-2 flex items-center">
                    <Star className="w-5 h-5 mr-2 text-[#6556CD]" />
                    Known For
                  </h3>
                  <div className="space-y-3">
                    {person.known_for?.map((work) => (
                      <div
                        key={work.id}
                        className="bg-[#1F1E24] rounded-lg p-3 hover:bg-[#2A2931] transition-colors group/work"
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center">
                              {work.media_type === "movie" ? (
                                <Film className="w-4 h-4 mr-2 text-[#6556CD]" />
                              ) : (
                                <Tv className="w-4 h-4 mr-2 text-[#6556CD]" />
                              )}
                              <h4 className="font-medium text-white group-hover/work:text-[#6556CD] transition-colors">
                                {work.media_type === "movie"
                                  ? work.title
                                  : work.name}
                              </h4>
                            </div>
                            {work.vote_average > 0 && (
                              <p className="text-xs text-gray-400 mt-1">
                                Rating: {work.vote_average.toFixed(1)}/10 (
                                {work.vote_count} votes)
                              </p>
                            )}
                            {work.first_air_date && (
                              <p className="text-xs text-gray-400">
                                First Air Date: {work.first_air_date}
                              </p>
                            )}
                            <p className="mt-2 text-sm text-gray-400 line-clamp-2">
                              {work.overview}
                            </p>
                          </div>
                          {work.poster_path && (
                            <img
                              src={`https://image.tmdb.org/t/p/w92${work.poster_path}`}
                              alt={
                                work.media_type === "movie"
                                  ? work.title
                                  : work.name
                              }
                              className="w-16 h-24 object-cover rounded-md ml-3 shadow-md"
                            />
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default PeopleCard