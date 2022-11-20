import React, { useState, useLayoutEffect } from "react";
import "./MovieList.css";
import MovieListCard from "./MovieListCard";
import { selector, useRecoilValue } from "recoil";
import { genreName } from "../Home/HomeCard";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ReactPaginate from "react-paginate";

const genreValue = selector({
  key: "genreValue",
  get: ({ get }) => {
    return get(genreName);
  },
});

export default function MovieList() {
  const navigate = useNavigate();
  const genreType = useRecoilValue(genreValue);

  const [movieList, setMovieList] = useState([]);
  const [pageCount, setPageCount] = useState(1);
  useLayoutEffect(() => {
    const getData = async () => {
      const data = await axios.get(
        `https://api.themoviedb.org/3/genre/${genreType}/movies?sort_by=popularity.desc&page=${pageCount}&api_key=a4e58d56fe8690c89ebed28c6816ff3f`
      );
      setMovieList(data.data);
    };
    getData();
  }, [genreType, pageCount]);

  useLayoutEffect(() => {
    console.log("total_pages", parseInt(movieList.total_pages));
  }, [movieList]);

  const handlePageClick = (PageClick) => {
    setPageCount(parseInt(PageClick.selected) + 1);
    console.log("PageClick", PageClick);
  };

  return (
    <>
      {genreType ? (
        <div className="MovieList">
          <h1>Movie List</h1>
          <div className="MovieCardContainer">
            {movieList?.results?.map((data) => {
              return (
                <MovieListCard
                  key={data.id}
                  name={!data.name ? data.original_title : data.name}
                  score={data.vote_average}
                  overview={data.overview}
                  id={data.id}
                  backdrop={
                    !data.backdrop_path
                      ? `http://image.tmdb.org/t/p/original${data.poster_path}`
                      : `http://image.tmdb.org/t/p/original${data.backdrop_path}`
                  }
                  releaseDate={data.release_date}
                />
              );
            })}
          </div>
          {movieList && (
            <ReactPaginate
              previousLabel={"prev"}
              nextLabel={"next"}
              breakLabel={"..."}
              breakClassName={"break-me"}
              pageCount={parseInt(movieList.total_pages) - 1}
              marginPagesDisplayed={3}
              pageRangeDisplayed={15}
              onPageChange={(e) => handlePageClick(e)}
              containerClassName={"pagination"}
              subContainerClassName={"pages pagination"}
              activeClassName={"active"}
            />
          )}
        </div>
      ) : (
        (navigate("/"), window.location.reload())
      )}
    </>
  );
}


