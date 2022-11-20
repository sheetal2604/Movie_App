import React from "react";
import { atom, useRecoilState } from "recoil";
import { Link } from "react-router-dom";

export const movieName = atom({
  key: "movieName",
  default: "",
});

export default function MovieListCard({
  name,
  score,
  overview,
  id,
  backdrop,

  releaseDate,
}) {
  const [, setMovieName] = useRecoilState(movieName);
  return (
    <>
      <Link
        to="/details"
        className="MovieListCard"
        onClick={() => setMovieName(id)}
      >
        <div className="MovieListImageLayer">
          <h3>{name}</h3>
          <p>
            {overview.slice(0, 120).split(" ").slice(0, -1).join(" ") + "..."}
          </p>
          <p>{releaseDate}</p>
          <p>{score}</p>
        </div>
        <img src={backdrop} alt="" />
      </Link>
    </>
  );
}
