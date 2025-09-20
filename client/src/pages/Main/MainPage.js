import react, { useState, useEffect, use } from "react";
import { useAuth } from "../../Contexts/AuthContext";
import axios from 'axios';
import { Navigate, Route, useNavigate } from "react-router-dom";
import MoviePreviewPage from "./MoviePreviewPage";
import { BrowserRouter as Router, Routes } from 'react-router-dom';
import styles from './Main.css';
import fallback from '../../Img/missing_img.png';
import Header from '../../Components/Header';
import { motion, AnimatePresence } from "framer-motion";
import { useRef } from "react";


function HorizontalRow({ movies, handleMovieClick }) {
  const containerRef = useRef();
  const [visibleIndexes, setVisibleIndexes] = useState([]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      (entries) => {
        setVisibleIndexes((prev) => {
          const updated = [...prev];
          entries.forEach((entry) => {
            const idx = Number(entry.target.dataset.idx);
            if (entry.isIntersecting) {
              // add if not already present
              if (!updated.includes(idx)) updated.push(idx);
            } else {
              // remove if leaving viewport
              const indexPos = updated.indexOf(idx);
              if (indexPos !== -1) updated.splice(indexPos, 1);
            }
          });
          return updated;
        });
      },
      { root: container, threshold: 0.5 }
    );

    Array.from(container.children).forEach((child, idx) => {
      child.dataset.idx = idx;
      observer.observe(child);
    });

    return () => observer.disconnect();
  }, [movies]);

  return (
    <div
      ref={containerRef}
      className="movies-container"
      style={{ display: "flex", overflowX: "auto", gap: "16px" }}
    >
      {movies.map((movie, idx) => (
        <motion.div
          key={movie.id}
          className="movie-card"
          onClick={() => handleMovieClick(movie)}
          initial={{ opacity: 1, scale: 0 }}
          animate={visibleIndexes.includes(idx) ? { scale: 1 } : { scale: 0 }}
          transition={{ type: "spring", stiffness: 500, damping: 25 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <img
            src={movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : fallback}
            alt={movie.title}
          />
          <h3>{movie.title}</h3>
          <p>{movie.release_date}</p>
        </motion.div>
      ))}
    </div>
  );
}

function MainPage() {
const API_KEY = process.env.REACT_APP_API_KEY;
const navigate = useNavigate();

const [searchMode, setSearchMode] = useState('');
const [pageNumber, setPageNumber] = useState(1);
const [selectedGenre, setSelectedGenre] = useState('');
const [movieTitle, setMovieTitle] = useState('');
const [movies, setMovies] = useState([]);
const [popularMovies, setPopularMovies] = useState([]);
const [cinemaMovies, setCinemaMovies] = useState([]);
const [topRatedMovies, setTopRatedMovies] = useState([]);
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
    console.log("TEST QUERY" + res.data.results);
  } catch (error) {
    console.error('Error while fetching by query: ', error);
  }
};

const searchPopularMovies = async () => {
  try{
    const path = `https://api.themoviedb.org/3/movie/popular`;

    const res = await axios.get(path, {
      params: {
        api_key: API_KEY,
        page: pageNumber,
        language: 'pl-PL'
      }
    });

    setPopularMovies(res.data.results);
    console.log("TEST POPULAR" + res.data.results);
  }catch (error) {
    console.error('Error while fetching by query: ', error);
  }
};

const searchCinemaMovies = async () => {
  try{
    const path = `https://api.themoviedb.org/3/movie/now_playing`;

    const res = await axios.get(path, {
      params: {
        api_key: API_KEY,
        page: pageNumber,
        language: 'pl-PL'
      }
    });

    setCinemaMovies(res.data.results);
  }catch (error) {
    console.error('Error while fetching cinema movies: ', error);
  }
}

const searchTopRatedMovies = async () => {
  try{
    const path = `https://api.themoviedb.org/3/movie/top_rated`;

    const res = await axios.get(path, {
      params: {
        api_key: API_KEY,
        page: pageNumber,
        language: 'pl-PL'
      }
    });

    setTopRatedMovies(res.data.results);
  }catch (error) {
    console.error('Error while fetching cinema movies: ', error);
  }
}

//   const searchByGenre = async () => {
//   try {
//     const response = await axios.get('https://api.themoviedb.org/3/discover/movie', {
//       params: {
//         api_key: API_KEY,
//         with_genres: selectedGenre,
//         page: pageNumber,
//         language: 'pl-PL'
//       }
//     });

//     setMovies(response.data.results);
//     console.log(response.data.results); 
//   } catch (error) {
//     console.error('Error while fetching movies by genre:', error);
//   }
// };


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
    console.log("GIGA LIPA");
    const storedMovies = localStorage.getItem('movieList');
    const storedSelectedGenre = localStorage.getItem('genre');
    const storedSearchMode = localStorage.getItem('mode');
    const storedMovieTitle = localStorage.getItem('title');
    const storedPageNumber = localStorage.getItem('page');
    const storedPopularMovies = sessionStorage.getItem('popularMovies');
    const storedCinemaMovies = sessionStorage.getItem('cinemaMovies');
    const storedTopRatedMovies = sessionStorage.getItem('topRatedMovies');

    if(storedMovies) setSelectedMovie(storedMovies);
    if(storedPageNumber) setPageNumber(storedPageNumber);
    if(storedSelectedGenre) setSelectedGenre(storedSelectedGenre);
    if(storedMovieTitle) setMovieTitle(storedMovieTitle);
    if(storedSearchMode) setSearchMode(storedSearchMode);
   
    if (storedPopularMovies) {
  try {
    const parsed = JSON.parse(storedPopularMovies);
    if (Array.isArray(parsed)) {
      setPopularMovies(parsed);
    } else {
      console.warn("popularMovies z sessionStorage nie jest tablicą");
      searchPopularMovies();
    }
  } catch (error) {
    console.error("Błąd przy parsowaniu popularMovies z sessionStorage:", error);
    searchPopularMovies();
  }
} else {
  searchPopularMovies();
}

    if (storedCinemaMovies) {
  try {
    const parsed = JSON.parse(storedCinemaMovies);
    if (Array.isArray(parsed)) {
      setCinemaMovies(parsed);
    } else {
      console.warn("CinemaMovies z sessionStorage nie jest tablicą");
      searchCinemaMovies();
    }
  } catch (error) {
    console.error("Błąd przy parsowaniu CinemaMovies z sessionStorage:", error);
    searchCinemaMovies();
  }
} else {
  searchCinemaMovies();
}

    if (storedTopRatedMovies) {
  try {
    const parsed = JSON.parse(storedTopRatedMovies);
    if (Array.isArray(parsed)) {
      setTopRatedMovies(parsed);
    } else {
      console.warn("popularMovies z sessionStorage nie jest tablicą");
      searchTopRatedMovies();
    }
  } catch (error) {
    console.error("Błąd przy parsowaniu popularMovies z sessionStorage:", error);
    searchTopRatedMovies();
  }
} else {
  searchTopRatedMovies();
}

  },[])


  useEffect(()=> {
    // if(searchMode == 'genre'){
    // searchByGenre();
    // }
    if(searchMode == 'query'){
      //searchByQuery();
      searchPopularMovies();
      searchCinemaMovies();
      searchTopRatedMovies();
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
    useEffect(()=>{
    sessionStorage.setItem('popularMovies', popularMovies)
  }, [popularMovies]);
    useEffect(()=>{
    sessionStorage.setItem('cinemaMovies', cinemaMovies)
  }, [cinemaMovies]);
    useEffect(()=>{
      sessionStorage.setItem('topRatedMovies', topRatedMovies);
    })

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pageNumber]);


return (
  <div className="wrapper">
    <Header />

    {/* Filter & Search Controls */}
    <div className="container mt-4 mb-3">
      <div className="row justify-content-center align-items-center g-3">
        <div className="col-12 col-md-6 d-flex justify-content-center searcherBox">
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

          {movies.length > 0 && (
        <div className="searchResults">
          <h2>Wyniki wyszukiwania</h2>
          <div className="movies-container">
            {movies.map(movie => (
              <div key={movie.id} className="movie-card" onClick={() => handleMovieClick(movie)}>
                <img src={movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : fallback} alt={movie.title} />
                <h3>{movie.title}</h3>
                <p>{movie.release_date}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="popularContainer">
        <h2>Popularne</h2>
        <HorizontalRow movies={popularMovies} handleMovieClick={handleMovieClick} />
      </div>

      <div className="cinemaContainer">
        <h2>W Kinach</h2>
        <HorizontalRow movies={cinemaMovies} handleMovieClick={handleMovieClick} />
      </div>

      <div className="topRatedContainer">
        <h2>Najlepiej Oceniane</h2>
        <HorizontalRow movies={topRatedMovies} handleMovieClick={handleMovieClick} />
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
    {/* <div className="navigation mt-4">
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
    </div> */}
  </div>
);
}

export default MainPage