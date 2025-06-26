import react, {useState} from "react";
import { useEffect } from "react";
import { useAuth } from "../../Contexts/AuthContext";
import axios from "axios";
import { Navigate, useLocation } from "react-router-dom";
import fallback from '../../Img/missing_img.png';

function MoviePreviewPage(){
    const API_KEY = process.env.REACT_APP_API_KEY;
    const location = useLocation();
    const movie = location.state?.e;
    const [movieData, setMovieData] = useState(null);
    const [loading, setLoading] = useState(true);



    useEffect(() => {
        const fetchMovieDetails = async () => {
        try {
            const response = await axios.get(
            `https://api.themoviedb.org/3/movie/${movie.id}`,
            {
                params: {
                api_key: API_KEY,
                language: "pl-PL",
                append_to_response: "credits,recommendations,reviews,keywords",
                },
            }
            );
            setMovieData(response.data);
        } catch (error) {
            console.error("Error fetching movie details:", error);
        } finally {
            setLoading(false);
        }
        };

        fetchMovieDetails();
    });




    if(!movie){
        return <Navigate to="/main"/>
    }
    console.log(movie);


    if (loading) return <div className="text-center mt-5">Ładowanie danych filmu...</div>;

    if (!movieData)
        return <div className="text-center mt-5">Nie udało się załadować danych filmu.</div>;

    return (
         <div className="container mt-4">
      <div className="row">
        {/* Poster */}
        <div className="col-md-4">
          <img
            src={`https://image.tmdb.org/t/p/w500${movieData.poster_path}`}
            alt={movieData.title}
            className="img-fluid rounded"
          />
        </div>

        {/* Main Info */}
        <div className="col-md-8">
          <h2>{movieData.title}</h2>
          <p>
            <strong>Data premiery:</strong> {movieData.release_date}
          </p>
          <p>
            <strong>Gatunki:</strong>{" "}
            {movieData.genres.map((g) => g.name).join(", ")}
          </p>
          <p>
            <strong>Ocena:</strong> {movieData.vote_average} / 10 (
            {movieData.vote_count} głosów)
          </p>

          <h4>Opis</h4>
          <p>{movieData.overview}</p>
        </div>
      </div>

      {/* Cast */}
      <div className="mt-5">
        <h3>Obsada</h3>
        <div className="row">
          {movieData.credits.cast.slice(0, 10).map((actor) => (
            <div key={actor.cast_id} className="col-6 col-md-3 mb-3">
              <img
                src={
                  actor.profile_path
                    ? `https://image.tmdb.org/t/p/w185${actor.profile_path}`
                    : fallback
                }
                alt={actor.name}
                className="img-fluid rounded"
              />
              <p className="mb-0 mt-2"><strong>{actor.name}</strong></p>
              <p className="text-muted">Jako {actor.character}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Keywords */}
      {movieData.keywords.keywords.length > 0 && (
        <div className="mt-4">
          <h4>Słowa kluczowe</h4>
          <ul className="list-inline">
            {movieData.keywords.keywords.map((kw) => (
              <li key={kw.id} className="list-inline-item badge bg-secondary me-2">
                {kw.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
    )
}

export default MoviePreviewPage;