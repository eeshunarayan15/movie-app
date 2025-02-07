import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { asyncloadmovie, removemovie } from "../Store/Action/movieAction";
import { Link, Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
import { ExternalLink, House, Loader, Star } from "lucide-react";
import HorizontalCards from "../HorizontalCards/HorizontalCards";
import Trailer from "../Trailer/Trailer";

const MovieDetails = () => {
    const {pathname} = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();

  // Corrected selector
  const info = useSelector((state) => state.movie.info);
  console.log(info+"info")

  useEffect(() => {
    console.log("Dispatching asyncloadmovie with id:", id);
    dispatch(asyncloadmovie(id))
      .then((response) => {
        console.log("Movie data fetched and state updated:", response);
      })
      .catch((error) => {
        console.error("Error fetching movie data:", error);
      });
    return () => {
      console.log("Dispatching removemovie");
      dispatch(removemovie());
    };
  }, [id, dispatch]);

  console.log("Current movie info:", info);

  return info ? (
    <div 
      style={{
        background: `linear-gradient(rgba(0,0,0,.2), rgba(0,0,0,.4), rgba(0,0,0,.5)), 
          url(https://image.tmdb.org/t/p/original/${info.detail.backdrop_path})`,
        backgroundColor: "#000",
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
      className="w-screen h-screen px-[10%] "
    >
      <div className="w-full h-full ">
        {/* part 1 */}
        <nav
          id="part 1"
          className="p-4 flex font-semibold h-[10vh] bg-[] items-center text-zinc-200  gap-10"
        >
          <button
            onClick={() => navigate(-1)}
            className=" hover:text-[#6556CD] text-2xl  transition duration-200 transform hover:scale-130"
          >
            <i className=" ri-arrow-go-back-fill" />
          </button>

          <a
            href={info.detail.imdb_url || info.detail.homepage}
            target="_blank"
            className=" hover:text-[#6556CD]   transition duration-200 transform hover:scale-130 "
          >
            <House size={24} />
          </a>

          <a
            target="_blank"
            rel="noreferrer"
            className=" hover:text-[#6556CD]  transition duration-200 transform hover:scale-130"
          >
            <ExternalLink size={24} />
          </a>
          <a
            target="_blank"
            href={`https://www.imdb.com/title/${info.externalid.imdb_id}/`}
          >
            <i className="fa-brands fa-imdb text-2xl  hover:text-[#6556CD] font-semibold  transition duration-200 transform hover:scale-130 "></i>
          </a>
          <a
            target="_blank"
            href={`https://www.wikidata.org/wiki/${info.externalid.wikidata_id}`}
          >
            <i className="fa-brands fa-wikipedia-w text-2xl  hover:text-[#6556CD] transition duration-200 transform hover:scale-130 "></i>
          </a>
        </nav>
        {/* part 2 */}
        <div
          id="part 2 "
          className=" w-full   font-semibold flex  bg-[]  text-zinc-200  "
        >
          {/* img card */}
          <div className="   ">
            <div className="flex flex-col  md:flex-row  gap-5 text-zinc-100  font-semibold ">
              {/* wallpaper container  */}
              <div>
                <div
                  id=" img container"
                  className=" bg-red-100 w-[15vw] h-[vh]  rounded-xl overflow-hidden mt-2 ml-2 "
                >
                  <img
                    className=" object-cover  overflow-hidden hover:scale-103"
                    src={`https://image.tmdb.org/t/p/original/${
                      info.detail.poster_path || info.detail.backdrop_path
                    }`}
                    alt=""
                  />
                </div>
                <div className="flex gap-2 ml-2 mt-5">
                  {info.watchproviders &&
                    info.watchproviders.IN &&
                    info.watchproviders.IN.flatrate &&
                    info.watchproviders.IN.flatrate.map((item, index) => (
                      <div className="" key={index}>
                        <div className="">
                          {" "}
                          <img
                            className=" rounded w-[7vh] h-auto overflow-hidden hover:scale-103"
                            src={`https://image.tmdb.org/t/p/original/${item.logo_path}`}
                            alt={item.provider_name}
                          />
                        </div>
                        {/* <p>{item.provider_name}</p>{" "} */}
                        {/* Optional: Display provider name */}
                      </div>
                    ))}
                </div>
              </div>

              <div>
                <h1 className="hover:text-[#6556CD] text-4xl transition duration-300 hover:scale-101">
                  {info.detail.name ||
                    info.detail.original_name ||
                    info.detail.original_title}
                  <small className="text-xs font-semibold">
                    (
                    {info.detail.release_date &&
                      info.detail.release_date.split("-")[0]}
                    )
                  </small>
                </h1>

                <div>
                  <span>
                    {" "}
                    {info.detail.vote_average && (
                      <div className="flex items-center gap-1 text-gray-300">
                        {" "}
                        <Star className="w-4 h-4 text-yellow-500" />
                        <span>
                          {info.detail.vote_average.toFixed(1)} Rating
                        </span>
                      </div>
                    )}
                  </span>

                  <span>User Score</span>
                  <h1>{info.detail.release_date}</h1>
                  <h1>
                    {info.detail.genres
                      .map((item, index) => item.name)
                      .join(",")}
                  </h1>
                  <h1>{info.detail.tagline}</h1>
                  <h1> Runtime {info.detail.runtime}</h1>
                  <h1 className="md:w-[500px]">{info.detail.overview}</h1>
                  <h1 className="md:w-[500pxpx]">
                    Movie Translated : {info.translations.join(" ")}
                  </h1>
                  <button className="bg-slate-100 px-4 py-1 text-black rounded-md hover:border-[1px] hover:bg-transparent mt-2 hover:text-white text-sm ">
                    <Link to={`${pathname}/trailer`}>Play Trailer</Link>
                  </button>
                </div>
              </div>
            </div>
          </div>{" "}
          {/* img card ends here */}
          <div></div>
        </div>
              <div className=" ">
                  <HorizontalCards trending={ info.recomendations ? info.recomendations:info.similar} />
        </div>
        <Outlet />
     
      </div>
    </div>
  ) : (
    <div className="flex justify-center items-center h-screen flex-col w-screen">
      <Loader className="animate-spin text-white" size={50} />
      <p className="text-white">Loading movie details...</p>
    </div>
  );
};

export default MovieDetails;
