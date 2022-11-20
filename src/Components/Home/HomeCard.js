import { atom, useRecoilState } from "recoil";
import { Link } from "react-router-dom";
import "./Home.css";

export const genreName = atom({
  key: "genreName",
  default: "",
});

export default function HomeCard({ name, id }) {
  const [, setGenreName] = useRecoilState(genreName);

  return (
    <>
      <Link
        to="/movielist"
        className="HomeCard"
        onClick={() => setGenreName(id)}
      >
        <div className="HomeImageLayer">
          <h2>{name}</h2>
        </div>
      </Link>
    </>
  );
}
