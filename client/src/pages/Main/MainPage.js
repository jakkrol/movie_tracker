import react, { useState, useEffect } from "react";
import { useAuth } from "../../Contexts/AuthContext";
import axios from 'axios';
import { Navigate, Route, useNavigate } from "react-router-dom";
import MoviePreviewPage from "./MoviePreviewPage";
import { BrowserRouter as Router, Routes } from 'react-router-dom';
import styles from './Main.css';
import fallback from '../../Img/missing_img.png';

function MainPage() {
const API_KEY = process.env.REACT_APP_API_KEY;
const navigate = useNavigate();

const [searchMode, setSearchMode] = useState('');
const [pageNumber, setPageNumber] = useState(1);
const [selectedGenre, setSelectedGenre] = useState('');
const [movieTitle, setMovieTitle] = useState('');
const [movies, setMovies] = useState([]);
const [selectedMovie, setSelectedMovie] = useState(null);

const searchByQuery = async () => {

    const path1 = 'https://api.themoviedb.org/3/genre/movie/list';
    const path2 = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&page=${pageNumber}`;

    axios.get(path2, {
      params: {
        api_key: API_KEY,
        query: movieTitle
      }
    })
    .then(res => setMovies(res.data.results))
    .catch(err => console.error(err));
  };

  
  const searchByGenre = async () => {
    const path3 = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=${selectedGenre}&page=${pageNumber}`;

    axios.get(path3, {
      params: {
        api_key: API_KEY
      }
    })
    .then(res => setMovies(res.data.results))
    .catch(err => console.error(err));

    console.log(movies);  
  }


  const handleMovieClick = (e) => {
    setSelectedMovie(e);
    navigate("details", {state: {e}});
  }

  const handlePageButtonClick = (e) => {
    if(e === 'r'){
      setPageNumber(prev => prev + 1);
    }else{
      if(pageNumber != 1){
        setPageNumber(prev => prev - 1);
      }
    }
  }

  useEffect(()=> {
    if(searchMode == 'genre'){
    searchByGenre();
    }
    if(searchMode == 'query'){
      searchByQuery();
    }
  },[pageNumber]);

    return(
        <div className="wrapper">
      
        <select value={selectedGenre} onChange={(e) => {setSelectedGenre(e.target.value); setPageNumber(1); setSearchMode('genre'); searchByGenre()}}>
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
        <button onClick={(e) => {setSelectedGenre(e.target.value); setPageNumber(1); setSearchMode('query'); searchByQuery()}}>TEST</button>



        <div className="container-fluid main">
          <div className="row g-4 px-3">
            {movies.map(movie => (
              <div
                key={movie.id}
                className="col-12 col-sm-6 col-md-4 col-lg-3"
                onClick={() => handleMovieClick(movie)}
              >
                <div className="card" tabIndex="0">
                  <div className="card_image">
                    <img src={movie.poster_path ? `https://image.tmdb.org/t/p/original/${movie.poster_path}` : fallback} alt={`${movie.title} poster`} />
                  </div>
                  <div className="card_content">
                    <h2 className="card_title">{movie.title}</h2>
                    <div className="card_text">
                      <p><strong>Release Date:</strong> {movie.release_date}</p>
                      <p><strong>Rating:</strong> {movie.vote_average} / 10</p>
                      <p>{movie.overview ? movie.overview : "No description available."}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>


          

          <div className="navigation">
            <button class="button-87" role="button" onClick={() => handlePageButtonClick('l')}>Previous</button>
            <button class="button-87" role="button" onClick={() => handlePageButtonClick('r')}>Next</button>
          </div>
        </div>
    )
}

export default MainPage