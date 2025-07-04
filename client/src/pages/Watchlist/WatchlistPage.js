import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Header from '../../Components/Header';
import fallback from '../../Img/missing_img.png';
import styles from '../Main/Main.css';
import { fetchWatchlist } from "../../api/axios";
import { useAuth } from "../../Contexts/AuthContext";

function WatchlistPage() {
  const navigate = useNavigate();
  const [movies, setMovies] = useState([]);

  const { user } = useAuth();

const handleFetchWatchlist = async () => {
    try {
      const response = await fetchWatchlist(user);
      setMovies(response);
    } catch (error) {
      console.error("Error fetching watchlist:", error);
    }
}

  useEffect(() => {
    handleFetchWatchlist();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleMovieClick = (movie) => {
    navigate("/details", { state: { e: movie } });
  };

  return (
    <div className="wrapper">
      <Header />
      <h2 style={{ textAlign: 'center', margin: '20px' }}>Your Watchlist</h2>

      <div className="container-fluid main">
        <div className="row g-4 px-3">
          {movies.length > 0 ? (
            movies.map((movie) => (
              <div key={movie.id} className="col-12 col-sm-6 col-md-4 col-lg-3">
                <div className="card" tabIndex="0">
                  <div className="card_image">
                    <img
                      src={movie.poster_path ? `https://image.tmdb.org/t/p/original/${movie.poster_path}` : fallback}
                      alt={`${movie.title} poster`}
                    />
                  </div>
                  <div className="card_content">
                    <h2 className="card_title">{movie.title}</h2>
                    <div className="card_text">
                      <p><strong>Release Date:</strong> {movie.release_date}</p>
                      <p><strong>Rating:</strong> {movie.vote_average} / 10</p>
                      <p>{movie.overview || "No description available."}</p>
                    </div>
                    <div className="full_description">
                      <p onClick={() => handleMovieClick(movie)}>Check full site</p>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div style={{ textAlign: 'center', marginTop: '2rem' }}>
              <h4>Your watchlist is empty.</h4>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default WatchlistPage;
