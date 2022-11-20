import React, { useLayoutEffect, useState } from "react";
import "./Details.css";
import { selector, useRecoilValue } from "recoil";
import { movieName } from "../MoviesList/MovieListCard";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const movieValue = selector({
  key: "movieValue",
  get: ({ get }) => {
    return get(movieName);
  },
});

export default function DetailPage() {
  const navigate = useNavigate();
  const movieTerm = useRecoilValue(movieValue);
  const [movieData, setMovieData] = useState([]);

  console.log("movieTerm", movieTerm);

  const styles = {
    container: {
      backgroundImage: `url(http://image.tmdb.org/t/p/original${movieData.backdrop_path})`,
      backgroundPosition: "center",
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
      width: "100vw",
      height: "100vh",
      display: "flex",
      alignItems: "center",
    },
  };

  const cardStyle = {
    backgroundSize: "52% 100%",

    backgroundImage: `url(http://image.tmdb.org/t/p/original${movieData.poster_path})`,
    backgroundPosition: `-60px 42px,0`,
    backgroundRepeat: "no-repeat",
    backgroundColor: " rgb(10, 10, 10)",
  };

  useLayoutEffect(() => {
    const getData = async () => {
      const data = await axios.get(
        `https://api.themoviedb.org/3/movie/${movieTerm}?api_key=a4e58d56fe8690c89ebed28c6816ff3f&language=en-US%5C`
      );
      setMovieData(data.data);
      console.log("data.data", data.data);
    };
    getData();
  }, [movieTerm]);

  return (
    <>
      {movieTerm ? (
        <div className="DetailPage " style={styles.container}>
          <div class="card" style={cardStyle}>
            <div class="card__inner">
              <header class="card__header">
                <nav class="card__nav">
                  <ul class="list list--nav">
                    <li>
                      <a href="#">Movie</a>
                    </li>
                    <li>
                      <a href="#">Trivia</a>
                    </li>
                    <li>
                      <a href="#">Reviews</a>
                    </li>
                  </ul>
                </nav>
              </header>

              <main class="card__body">
                <div class="card__info">
                  <h1 class="card__title">{movieData.title}</h1>

                  <p class="card__slug">{movieData.overview}</p>

                  <button
                    onClick={() => {
                      window.open(movieData.homepage, "_blank");
                    }}
                    class="card__btn"
                    value="Watch trailer"
                  >
                    Home Page
                  </button>

                  <div class="card__rating">{movieData.vote_average}</div>
                </div>
              </main>

              <footer class="card__footer">
                <ul class="list list--info">
                  <li>{movieData.release_date}</li>
                  <li>{movieData.runtime} min</li>
                  <li>
                    {movieData.genres?.map((e) => (
                      <>{e.name} | </>
                    ))}
                  </li>
                </ul>
              </footer>
            </div>
          </div>
        </div>
      ) : (
        (navigate("/"), window.location.reload())
      )}
    </>
  );
}
