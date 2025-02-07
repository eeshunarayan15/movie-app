import React, { useEffect, useState, useRef } from "react";
import axios from "../../Utils/axios";
import { Link } from "react-router-dom";
import { Search, X, Image as ImageIcon, Film, User } from "lucide-react";

const TopNav = () => {
  const [query, setQuery] = useState("");
  const [searches, setSearches] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const searchRef = useRef(null);

  const handleSearch = (e) => {
    setQuery(e.target.value);
  };

  const handleEmptySearch = () => {
    setQuery("");
    setSearches([]);
  };

  const closeSearch = () => {
    setIsSearchOpen(false);
    handleEmptySearch();
  };

  const getSearch = async () => {
    if (!query.trim()) {
      setSearches([]);
      return;
    }

    setIsLoading(true);
    try {
      const { data } = await axios.get(`/search/multi?query=${query}`);
      setSearches(data.results);
    } catch (error) {
      console.log("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      getSearch();
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [query]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsSearchOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const getMediaIcon = (item) => {
    if (item.media_type === "person") return <User className="w-4 h-4" />;
    if (item.media_type === "movie") return <Film className="w-4 h-4" />;
    return <ImageIcon className="w-4 h-4" />;
  };

  return (
    <div
      ref={searchRef}
      className={`${
        isSearchOpen
          ? "fixed inset-0 bg-gray-900/95 backdrop-blur-lg"
          : "relative bg-transparent"
      } z-50 transition-all duration-200`}
    >
      <div className="relative w-full max-w-2xl mx-auto px-4 py-3">
        {/* Mobile Close Button */}
        {isSearchOpen && (
          <button
            onClick={closeSearch}
            className="absolute right-4 top-3 p-2 text-gray-400 hover:text-white md:hidden"
          >
            <X className="w-6 h-6" />
          </button>
        )}

        {/* Search Input */}
        <div className="relative">
          <div className="relative flex items-center h-10 md:h-12 bg-gray-800/50 rounded-lg border border-gray-700 focus-within:border-purple-500 transition-colors">
            <Search className="w-4 h-4 md:w-5 md:h-5 text-gray-400 ml-3" />
            <input
              type="text"
              value={query}
              onChange={handleSearch}
              onFocus={() => setIsSearchOpen(true)}
              placeholder="Search movies, shows, people..."
              className="w-full h-full px-2 md:px-3 bg-transparent text-gray-100 placeholder-gray-400 outline-none text-sm md:text-base"
            />
            {query && (
              <button
                onClick={handleEmptySearch}
                className="p-1.5 md:p-2 hover:text-purple-400 transition-colors"
              >
                <X className="w-4 h-4 md:w-5 md:h-5" />
              </button>
            )}
          </div>

          {/* Loading indicator */}
          {isLoading && (
            <div className="absolute right-12 top-2.5 md:right-14 md:top-3">
              <div className="w-4 h-4 md:w-5 md:h-5 border-2 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
          )}
        </div>

        {/* Search Results */}
        {searches.length > 0 && isSearchOpen && (
          <div className="fixed inset-x-4 top-16 md:absolute md:inset-x-0 z-50 w-auto md:w-full mt-2 bg-gray-900 rounded-lg border border-gray-700 shadow-xl max-h-[calc(100vh-5rem)] md:max-h-[70vh] overflow-y-auto">
            {searches.map((item, index) => (
              <Link
               
                key={index}
                to={`/${item.media_type}/details/${item.id}`}
                onClick={closeSearch}
                className="flex items-center gap-3 md:gap-4 p-3 md:p-4 hover:bg-gray-800 transition-colors border-b border-gray-700/50 last:border-none"
              >
                {/* Image */}
                <div className="relative flex-shrink-0 w-12 h-18 md:w-16 md:h-24 bg-gray-800 rounded-md overflow-hidden">
                  {item.backdrop_path ||
                  item.profile_path ||
                  item.poster_path ? (
                    <img
                      className="w-full h-full object-cover"
                      src={`https://image.tmdb.org/t/p/w500${
                        item.backdrop_path ||
                        item.profile_path ||
                        item.poster_path
                      }`}
                      alt={item.title || item.name}
                      loading="lazy"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gray-800">
                      <ImageIcon className="w-6 h-6 md:w-8 md:h-8 text-gray-600" />
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="flex-grow min-w-0">
                  <div className="flex flex-wrap items-center gap-1.5 md:gap-2 mb-1">
                    <span className="flex items-center gap-1 px-1.5 py-0.5 md:px-2 md:py-1 bg-gray-800 rounded-full text-[10px] md:text-xs font-medium text-gray-300">
                      {getMediaIcon(item)}
                      <span className="hidden xs:inline">
                        {item.media_type?.toUpperCase()}
                      </span>
                    </span>
                    {item.vote_average && (
                      <span className="text-[10px] md:text-xs text-yellow-500">
                        ★ {item.vote_average.toFixed(1)}
                      </span>
                    )}
                  </div>
                  <h3 className="text-sm md:text-base text-gray-100 font-medium truncate">
                    {item.title || item.name || item.original_name}
                  </h3>
                  {item.release_date && (
                    <p className="text-xs md:text-sm text-gray-400">
                      {new Date(item.release_date).getFullYear()}
                    </p>
                  )}
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TopNav;
