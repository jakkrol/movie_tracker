import react, { useState } from "react";
import { useAuth } from "../../Contexts/AuthContext";
import axios from 'axios';
import { Navigate, Route, useNavigate } from "react-router-dom";
import MoviePreviewPage from "./MoviePreviewPage";
import { BrowserRouter as Router, Routes } from 'react-router-dom';

function MainPage() {
const API_KEY = process.env.REACT_APP_API_KEY;
const navigate = useNavigate();

const [selectedGenre, setSelectedGenre] = useState('');
const [movieTitle, setMovieTitle] = useState('');
const [movies, setMovies] = useState([]);
const [selectedMovie, setSelectedMovie] = useState(null);

const searchByQuery = async () => {

    const path1 = 'https://api.themoviedb.org/3/genre/movie/list';
    const path2 = 'https://api.themoviedb.org/3/search/movie';
    const path3 = 'https://api.themoviedb.org/3/discover/movie?api_key=YOUR_API_KEY&with_genres=28';

    axios.get(path2, {
      params: {
        api_key: API_KEY,
        query: movieTitle
      }
    })
    .then(res => setMovies(res.data.results))
    .catch(err => console.error(err));
  };



  
  const searchByGenre = (e) => {
    setSelectedGenre(e.target.value);
    const path3 = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=${e.target.value}&page=1`;

    axios.get(path3, {
      params: {
        api_key: API_KEY
      }
    })
    .then(res => setMovies(res.data.results))
    .catch(err => console.error(err));
  }


  const handleMovieClick = (e) => {
    setSelectedMovie(e);
    navigate("details", {state: {e}});
  }



    return(
        <div>
      
        <select value={selectedGenre} onChange={searchByGenre}>
          <option value = "0">None</option>
          <option value="28">Action</option>
          <option value="12">Adventure</option>
          <option value="16">Animation</option>
          <option value="35">Comedy</option>
          <option value="80">Crime</option>
          <option value="99">Documentary</option>
          <option value="18">Drama</option>
          <option value="10751">Family</option>
          <option value="14">Fantasy</option>
          <option value="36">History</option>
          <option value="27">Horror</option>
          <option value="10402">Music</option>
          <option value="9648">Mystery</option>
          <option value="10749">Romance</option>
          <option value="878">Science Fiction</option>
          <option value="10770">TV Movie</option>
          <option value="53">Thriller</option>
          <option value="10752">War</option>
          <option value="37">Western</option>
        </select>


        <input type="text" name="search" value={movieTitle} onChange={(e) => setMovieTitle(e.target.value)} placeholder="Search for movie"/>
        <button onClick={searchByQuery}>TEST</button>


          <div className="container-fluid">
            {movies.map(movie => (
              <div className="moiveContainer" onClick={() => handleMovieClick(movie)}>
                <p key={movie.id} >{movie.title}</p>
              </div>
            ))}
          </div>
          


            {/* <Routes>
              <Route
                path="detail"
                element={
                  selectedMovie ?(
                    <MoviePreviewPage movie={selectedMovie}/>
                  ) : (
                    <Navigate to="/main"/>
                  )
                }>

              </Route>
            </Routes> */}
        </div>
    )
}

export default MainPage