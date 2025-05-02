import react, { useState } from "react";
import { useAuth } from "../../Contexts/AuthContext";
import axios from 'axios';

function MainPage() {
const API_KEY = process.env.REACT_APP_API_KEY;
const [selectedGenre, setSelectedGenre] = useState('');
const [movieTitle, setMovieTitle] = useState('');

const searchMovies = async () => {

    const path1 = 'https://api.themoviedb.org/3/genre/movie/list';
    const path2 = 'https://api.themoviedb.org/3/search/movie';
    const path3 = 'https://api.themoviedb.org/3/discover/movie?api_key=YOUR_API_KEY&with_genres=28';

    axios.get(path2, {
      params: {
        api_key: API_KEY,
        query: movieTitle
      }
    })
    .then(res => console.log(res.data))
    .catch(err => console.error(err));
  };



  
  const handleGenreChange = (e) => {
    setSelectedGenre(e.target.value);
    const path3 = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=${e.target.value}&page=1`;

    axios.get(path3, {
      params: {
        api_key: API_KEY
      }
    })
    .then(res => console.log(res.data))
    .catch(err => console.error(err));
  }



    return(
        <div>
      
        <select value={selectedGenre} onChange={handleGenreChange}>
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
        <button onClick={searchMovies}>TEST</button>
        </div>
    )
}

export default MainPage