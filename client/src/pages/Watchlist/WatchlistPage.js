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
  const [modifiedMovies, setModifiedMovies] = useState([]);

  const { user } = useAuth();

const handleFetchWatchlist = async () => {
    try {
      const response = await fetchWatchlist(user);
      console.log("Fetched watchlist:", response);
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

  ////////////////////////////
    const toggleWatched = (movieId) => {
    setMovies((prevMovies) =>
      prevMovies.map((movie) =>
        movie.movie_id === movieId
          ? { ...movie, watched: !movie.watched }
          : movie
      )
    );

    setModifiedMovies((prev) =>
      prev.includes(movieId) ? prev : [...prev, movieId]
    );
  };

  const handleSaveChanges = async () => {
    // try {
    //   const updated = movies.filter((m) => modifiedMovies.includes(m.movie_id));
    //   // Save these updated movies to DB
    //   await axios.post("/api/watchlist/update-watched", { movies: updated });
    //   setModifiedMovies([]);
    // } catch (error) {
    //   console.error("Failed to save changes:", error);
    // }
  };
  ////////////////////////////


 return (
    <div className="wrapper">
      <Header />
      <h2 style={{ textAlign: "center", margin: "20px" }}>Your Watchlist</h2>

      {modifiedMovies.length > 0 && (
        <div style={{ textAlign: "center", marginBottom: "1rem" }}>
          <button className="btn btn-primary" onClick={handleSaveChanges}>
            Save Changes
          </button>
        </div>
      )}

      <div className="container-fluid main">
        <div className="row g-4 px-3">
          {movies.length > 0 ? (
            movies.map((movie) => (
              <div
                key={movie.movie_id}
                className="col-12 col-sm-6 col-md-4 col-lg-3"
              >
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
                      <p>{movie.overview || "No description available."}</p>
                    </div>

                    {/* Watched toggle button */}
                    <div className="watched-status" style={{ marginTop: "10px" }}>
                      <button
                        className={`btn ${
                          movie.watched ? "btn-success" : "btn-outline-secondary"
                        }`}
                        onClick={() => toggleWatched(movie.movie_id)}
                      >
                        {movie.watched ? "Watched ✓" : "Not Watched"}
                      </button>
                    </div>

                    <div className="full_description">
                      <p onClick={() => handleMovieClick(movie)}>Check full site</p>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div style={{ textAlign: "center", marginTop: "2rem" }}>
              <h4>Your watchlist is empty.</h4>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default WatchlistPage;
