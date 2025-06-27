import react, {useState} from "react";
import { useEffect } from "react";
import { useAuth } from "../../Contexts/AuthContext";
import axios from "axios";
import { Navigate, useLocation } from "react-router-dom";
import fallback from '../../Img/missing_img.png';
import styles from './MoviePreview.css';
import Header from '../../Components/Header';


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
    }, [movie.id]);




    if(!movie){
        return <Navigate to="/main"/>
    }
    console.log(movie);


    if (loading) return <div className="text-center mt-5">Ładowanie danych filmu...</div>;

    if (!movieData)
        return <div className="text-center mt-5">Nie udało się załadować danych filmu.</div>;

    
    return (
    <div>
        <Header/>
        <div className="container mt-4 movie-detail-container">
        <div className="row">
            {/* Poster */}
            <div className="col-md-4">
                <img
                    src={`https://image.tmdb.org/t/p/w500${movieData.poster_path}`}
                    alt={movieData.title}
                    className="img-fluid rounded movie-poster"
                />
            </div>

            {/* Main Info */}
            <div className="col-md-8 card_content movie-info">
                <h2 className="card_title movie-title">{movieData.title}</h2>
                <p>
                    <strong>Data premiery:</strong> <span className="info-text">{movieData.release_date}</span>
                </p>
                <p>
                    <strong>Gatunki:</strong>{" "}
                    <span className="info-text">{movieData.genres.map((g) => g.name).join(", ")}</span>
                </p>
                <p>
                    <strong>Ocena:</strong>{" "}
                    <span className="info-text">
                    {movieData.vote_average} / 10 ({movieData.vote_count} głosów)
                    </span>
                </p>
                <h4 className="mt-4 section-heading">Opis</h4>
                <p className="full_description movie-overview">{movieData.overview}</p>
            </div>
        </div>

        {/* Cast */}
        <div className="mt-5 cast-section">
            <h3 className="section-heading">Obsada</h3>
            <div className="row">
                {movieData.credits.cast.slice(0, 10).map((actor) => (
                <div key={actor.cast_id} className="col-6 col-md-3 mb-3 p-2"> {/* padding here */}
                    <div className="cast-member">
                        <img
                            src={ actor.profile_path ? `https://image.tmdb.org/t/p/w185${actor.profile_path}` : fallback }
                            alt={actor.name}
                            className="img-fluid rounded actor-photo"
                        />
                        <p className="mb-0 mt-2 actor-name">
                            <strong>{actor.name}</strong>
                        </p>
                        <p className="actor-role">Jako {actor.character}</p>
                    </div>
                </div>
            ))}
            </div>
        </div>

        {/* Keywords */}
        {movieData.keywords.keywords.length > 0 && (
            <div className="mt-4 keyword-section">
            <h4 className="section-heading">Słowa kluczowe</h4>
            <ul className="list-inline keyword-list">
                {movieData.keywords.keywords.map((kw) => (
                <li
                    key={kw.id}
                    className="list-inline-item badge bg-secondary me-2 keyword-badge"
                >
                    {kw.name}
                </li>
                ))}
            </ul>
            </div>
        )}
    </div>
    </div>
    )
}

export default MoviePreviewPage;