
import MovieList from "./Components/MoviesList/MovieList"
import Home from "./Components/Home/Home"
import Details from "./Components/Details/Details"
import {useState,useLayoutEffect} from "react"
import {BrowserRouter,Routes,Route} from "react-router-dom"
import axios from "axios"

function App() {
  const [genre, setGenre] = useState(null);
  const genreUrl = `https://api.themoviedb.org/3/genre/movie/list?api_key=a4e58d56fe8690c89ebed28c6816ff3f&language=en-US`;

  useLayoutEffect(() => {
    axios
      .get(genreUrl)
      .then((response) => {
        setGenre(response.data.genres);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [genreUrl]);
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path="/MovieList" element={<MovieList/>}/>
        <Route path="/" element={<Home genre={genre}/>}/>
        <Route path="/details" element={<Details/>}/>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
