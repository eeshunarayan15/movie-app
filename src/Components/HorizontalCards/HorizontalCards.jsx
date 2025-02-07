import React from "react";
import {
  Star,
  Calendar,
  Globe,
  Tv,
  Film,
  ThumbsUp,
  Users,
  TrendingUp as Trending,
} from "lucide-react";
import { Link } from "react-router-dom";

const HorizontalCards = ({ trending,title }) => {
  return (
    <div className="w-full py-6">
      <div className="flex   flex-w gap-6 overflow-x-auto pb-4 scrollbar-hide">
        {trending.map((item, index) => (
          <Link
            key={index}
            to={`/${trending.media_type || title}/details/${item.id}`}
          >
            <div className="min-w-[300px] bg-gradient-to-b from-gray-800 to-gray-900 rounded-xl overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-2xl border border-gray-700">
              <div className="relative group">
                <img
                  src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                  alt={item.title || item.name}
                  className="w-full h-[400px] object-cover"
                />
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent via-gray-900/70 to-gray-900 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-0 p-4 space-y-2">
                    <p className="text-gray-200 text-sm line-clamp-4">
                      {item?.overview || "No description available."}
                    </p>
                    {item.first_air_date && (
                      <p className="text-gray-300 text-sm">
                        First Aired:{" "}
                        {new Date(item.first_air_date).toLocaleDateString()}
                      </p>
                    )}
                    {item.origin_country && (
                      <p className="text-gray-300 text-sm">
                        Origin: {item.origin_country.join(", ")}
                      </p>
                    )}
                  </div>
                </div>
                <div className="absolute top-2 left-2 right-2 flex justify-between">
                  <span className="px-2 py-1 bg-purple-500 text-white text-xs font-semibold rounded-full flex items-center gap-1">
                    {item.media_type === "tv" ? (
                      <Tv className="w-3 h-3" />
                    ) : (
                      <Film className="w-3 h-3" />
                    )}
                    {item.media_type?.toUpperCase()}
                  </span>
                  {item.adult && (
                    <span className="px-2 py-1 bg-red-500 text-white text-xs font-semibold rounded-full">
                      18+
                    </span>
                  )}
                </div>
              </div>

              <div className="p-4 space-y-3">
                <h2 className="text-lg font-bold text-white line-clamp-1">
                  {item?.name ||
                    item?.title ||
                    item?.original_title ||
                    "Untitled"}
                </h2>

                <div className="flex flex-wrap items-center gap-3 text-sm text-gray-400">
                  {item.vote_average && (
                    <div className="flex items-center gap-1" title="Rating">
                      <Star className="w-4 h-4 text-yellow-500" />
                      <span>{item.vote_average.toFixed(1)}</span>
                    </div>
                  )}

                  {(item.release_date || item.first_air_date) && (
                    <div
                      className="flex items-center gap-1"
                      title="Release Year"
                    >
                      <Calendar className="w-4 h-4" />
                      <span>
                        {new Date(
                          item.release_date || item.first_air_date
                        ).getFullYear()}
                      </span>
                    </div>
                  )}

                  {item.original_language && (
                    <div className="flex items-center gap-1" title="Language">
                      <Globe className="w-4 h-4" />
                      <span>{item.original_language.toUpperCase()}</span>
                    </div>
                  )}
                </div>

                <div className="flex flex-wrap items-center gap-3 text-sm text-gray-400">
                  {item.vote_count && (
                    <div className="flex items-center gap-1" title="Vote Count">
                      <ThumbsUp className="w-4 h-4 text-blue-400" />
                      <span>{item.vote_count.toLocaleString()}</span>
                    </div>
                  )}

                  {item.popularity && (
                    <div className="flex items-center gap-1" title="Popularity">
                      <Trending className="w-4 h-4 text-green-400" />
                      <span>
                        {Math.round(item.popularity).toLocaleString()}
                      </span>
                    </div>
                  )}

                  {item.genre_ids && (
                    <div
                      className="flex items-center gap-1"
                      title="Genre Count"
                    >
                      <Users className="w-4 h-4 text-purple-400" />
                      <span>{item.genre_ids.length} Genres</span>
                    </div>
                  )}
                </div>

                {item.original_name && item.original_name !== item.name && (
                  <p className="text-sm text-gray-500 italic line-clamp-1">
                    Original: {item.original_name}
                  </p>
                )}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default HorizontalCards;
