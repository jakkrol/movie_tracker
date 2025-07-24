import react, { useState, useEffect } from "react";
import { useAuth } from "../../Contexts/AuthContext";
import axios from 'axios';
import { Navigate, Route, useNavigate } from "react-router-dom";
import MoviePreviewPage from "./MoviePreviewPage";
import { BrowserRouter as Router, Routes } from 'react-router-dom';
import styles from './Main.css';
import fallback from '../../Img/missing_img.png';
import Header from '../../Components/Header';


function MainPage() {
const API_KEY = process.env.REACT_APP_API_KEY;
const navigate = useNavigate();

const [searchMode, setSearchMode] = useState('');
const [pageNumber, setPageNumber] = useState('');
const [selectedGenre, setSelectedGenre] = useState('');
const [movieTitle, setMovieTitle] = useState('');
const [movies, setMovies] = useState([]);
const [selectedMovie, setSelectedMovie] = useState(null);

const searchByQuery = async () => {
try{
    const path = `https://api.themoviedb.org/3/search/movie`;

    const res = await axios.get(path, {
      params: {
        api_key: API_KEY,
        query: movieTitle,
        page: pageNumber,
        language: 'pl-PL'
      }
    });

    setMovies(res.data.results);
    console.log(res.data.results);
  } catch (error) {
    console.error('Error while fetching by query: ', error);
  }
};

  const searchByGenre = async () => {
  try {
    const response = await axios.get('https://api.themoviedb.org/3/discover/movie', {
      params: {
        api_key: API_KEY,
        with_genres: selectedGenre,
        page: pageNumber,
        language: 'pl-PL'
      }
    });

    setMovies(response.data.results);
    console.log(response.data.results); 
  } catch (error) {
    console.error('Error while fetching movies by genre:', error);
  }
};


  const handleMovieClick = (e) => {
    console.log(e);
    setSelectedMovie(e);
    navigate("details", {state: {e}});
  }

  const handlePageButtonClick = (e) => {
    const page = Number(pageNumber);
    if(e === 'r'){
      setPageNumber(page + 1);
    }else{
      if(page != 1){
        setPageNumber(page - 1);
      }
    }
    console.log("PAGE NUMBER:---->" + pageNumber)
  }
  useEffect(()=>{
    const storedMovies = localStorage.getItem('movieList');
    const storedSelectedGenre = localStorage.getItem('genre');
    const storedSearchMode = localStorage.getItem('mode');
    const storedMovieTitle = localStorage.getItem('title');
    const storedPageNumber = localStorage.getItem('page');

    if(storedMovies) setSelectedMovie(storedMovies);
    if(storedPageNumber) setPageNumber(storedPageNumber);
    if(storedSelectedGenre) setSelectedGenre(storedSelectedGenre);
    if(storedMovieTitle) setMovieTitle(storedMovieTitle);
    if(storedSearchMode) setSearchMode(storedSearchMode);
  },[])
  useEffect(()=> {
    if(searchMode == 'genre'){
    searchByGenre();
    }
    if(searchMode == 'query'){
      searchByQuery();
    }
    localStorage.setItem('page', pageNumber);
  },[pageNumber]);

  useEffect(()=>{
    localStorage.setItem('mode', searchMode);
  }, [searchMode]);
    useEffect(()=>{
    localStorage.setItem('genre', selectedGenre);
  }, [selectedGenre]);
    useEffect(()=>{
    localStorage.setItem('movieList', movies)
  }, [movies]);
    useEffect(()=>{
    localStorage.setItem('title', movieTitle)
  }, [movieTitle]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pageNumber]);


return (
  <div className="wrapper">
    <Header />

    {/* Filter & Search Controls */}
    <div className="container mt-4 mb-3">
      <div className="row justify-content-center align-items-center g-3">
        <div className="col-12 col-md-4 d-flex justify-content-center justify-content-md-start">
          <select
            className="searchers"
            value={selectedGenre}
            onChange={(e) => {
              setSelectedGenre(e.target.value);
              setPageNumber(1);
              setSearchMode('genre');
              searchByGenre();
            }}
          >
            <option value="0">None</option>
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
        </div>

        <div className="col-12 col-md-6 d-flex justify-content-center">
          <input
            className="searchers"
            type="text"
            name="search"
            value={movieTitle}
            onChange={(e) => setMovieTitle(e.target.value)}
            placeholder="Search for movie"
          />
          <button
            className="search-button"
            onClick={() => {
              setSelectedGenre('');
              setPageNumber(1);
              setSearchMode('query');
              searchByQuery();
            }}
          >
            Search
          </button>
        </div>
      </div>
    </div>

    {/* Movie Cards Grid */}
<div className="movies-container">
  {movies.map(movie => (
    <div
      key={movie.id}
      className="movie-card"
      onClick={() => handleMovieClick(movie)}
    >
      <img className=""
        src={
          movie.poster_path
            ? `https://image.tmdb.org/t/p/w300/${movie.poster_path}`
            : fallback
        }
        alt={`${movie.title} poster`}
      />
      <h3>{movie.title}</h3>
      <p>{movie.release_date}</p>
    </div>
  ))}
</div>




    {/* <div className="container-fluid main">
      <div className="row g-4 px-3">
        {movies.map((movie) => (
          <div key={movie.id} className="col-12 col-sm-6 col-md-4 col-lg-3">
            <div className="card" tabIndex="0">
              <div className="card_image">
                <img
                  src={
                    movie.poster_path
                      ? `https://image.tmdb.org/t/p/original/${movie.poster_path}`
                      : fallback
                  }
                  alt={`${movie.title} poster`}
                />
              </div>
              <div className="card_content">
                <h2 className="card_title">{movie.title}</h2>
                <div className="card_text">
                  <p>
                    <strong>Release Date:</strong> {movie.release_date}
                  </p>
                  <p>
                    <strong>Rating:</strong> {movie.vote_average} / 10
                  </p>
                  <p>
                    {movie.overview
                      ? movie.overview
                      : 'No description available.'}
                  </p>
                </div>
                <div className="full_description">
                  <p onClick={() => handleMovieClick(movie)}>Check full site</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div> */}

    {/* Pagination Controls */}
    <div className="navigation mt-4">
      <button
        className="button-87"
        role="button"
        onClick={() => handlePageButtonClick('l')}
      >
        Previous
      </button>
      <div className="number">{pageNumber}</div>
      <button
        className="button-87"
        role="button"
        onClick={() => handlePageButtonClick('r')}
      >
        Next
      </button>
    </div>
  </div>
);
}

export default MainPage