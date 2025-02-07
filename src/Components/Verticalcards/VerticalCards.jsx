import React from "react";
import { Link } from "react-router-dom";
import {
  Star,
  Calendar,
  Globe,
  Tv,
  Film,
  ThumbsUp,
  Users,
  TrendingUp,
  Info,
} from "lucide-react";

const VerticalCards = ({ trending, title }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-6">
      {trending.map((item, index) => (
        <Link
          key={index}
          // to={`/${item.media_type || title}/details/${item.id}`}
          to={
            title === "tv"
              ? `/shows/tv/details/${item.id}`
              : `/movie/details/${item.id}`
          }
        >
          <div className="group bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] border border-gray-700">
            <div className="relative aspect-video">
              <div>
                <img
                  className="w-full h-full object-cover"
                  src={`https://image.tmdb.org/t/p/original/${
                    item.poster_path || item.backdrop_path
                  }}`}
                  alt={item.title || item.name}
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-0 p-4 space-y-2">
                  <p className="text-gray-200 text-sm line-clamp-3">
                    {item.overview || "No description available."}
                  </p>
                </div>
              </div>
              <div className="absolute top-2 left-2 right-2 flex justify-between items-center">
                <span className="px-3 py-1 bg-purple-500 text-white text-xs font-semibold rounded-full flex items-center gap-1">
                  {item.media_type === "tv" ? (
                    <Tv className="w-3 h-3" />
                  ) : (
                    <Film className="w-3 h-3" />
                  )}
                  {item.media_type?.toUpperCase()}
                </span>
                {item.adult && (
                  <span className="px-3 py-1 bg-red-500 text-white text-xs font-semibold rounded-full">
                    18+
                  </span>
                )}
              </div>
            </div>

            <div className="p-5 space-y-4">
              <div className="block hover:text-purple-400 transition-colors">
                <h2 className="text-xl font-bold text-white line-clamp-1">
                  {item.title || item.original_name || item.original_title}
                </h2>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  {item.vote_average && (
                    <div className="flex items-center gap-2 text-sm text-gray-300">
                      <Star className="w-4 h-4 text-yellow-500" />
                      <span>{item.vote_average.toFixed(1)} Rating</span>
                    </div>
                  )}

                  {item.vote_count && (
                    <div className="flex items-center gap-2 text-sm text-gray-300">
                      <ThumbsUp className="w-4 h-4 text-blue-400" />
                      <span>{item.vote_count.toLocaleString()} Votes</span>
                    </div>
                  )}

                  {item.popularity && (
                    <div className="flex items-center gap-2 text-sm text-gray-300">
                      <TrendingUp className="w-4 h-4 text-green-400" />
                      <span>
                        {Math.round(item.popularity).toLocaleString()}
                      </span>
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  {(item.release_date || item.first_air_date) && (
                    <div className="flex items-center gap-2 text-sm text-gray-300">
                      <Calendar className="w-4 h-4" />
                      <span>
                        {new Date(
                          item.release_date || item.first_air_date
                        ).getFullYear()}
                      </span>
                    </div>
                  )}

                  {item.original_language && (
                    <div className="flex items-center gap-2 text-sm text-gray-300">
                      <Globe className="w-4 h-4" />
                      <span>{item.original_language.toUpperCase()}</span>
                    </div>
                  )}

                  {item.genre_ids && (
                    <div className="flex items-center gap-2 text-sm text-gray-300">
                      <Users className="w-4 h-4 text-purple-400" />
                      <span>{item.genre_ids.length} Genres</span>
                    </div>
                  )}
                </div>
              </div>

              {item.original_name &&
                item.original_name !== (item.title || item.name) && (
                  <div className="flex items-center gap-2 text-sm text-gray-400">
                    <Info className="w-4 h-4" />
                    <span className="italic line-clamp-1">
                      Original: {item.original_name}
                    </span>
                  </div>
                )}
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};    

export default VerticalCards;
