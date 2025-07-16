import react, {useState} from "react";
import { useEffect } from "react";
import { useAuth } from "../../Contexts/AuthContext";
import axios from "axios";
import { Navigate, useLocation } from "react-router-dom";
import fallback from '../../Img/missing_img.png';
import styles from '../Main/MoviePreview.css';
import Header from '../../Components/Header';
import { axiosAddToWatchlist } from '../../api/axios';


function MoviePreviewPage(){
    const API_KEY = process.env.REACT_APP_API_KEY;
    const location = useLocation();
    const movie = location.state?.e;
    const [movieData, setMovieData] = useState(null);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        setMovieData(movie);
        console.log(movieData);
        setLoading(false);
    }, []);


    if(!movie){
        return <Navigate to="/main"/>
    }
    console.log(movieData);


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
                    <span className="info-text">{Array.isArray(movieData.genres)
                        ? movieData.genres.map((g) => g.name).join(", ")
                        : JSON.parse(movieData.genres).map((g) => g.name).join(", ")
                    }</span>
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
        {/* <div className="mt-5 cast-section">
            <h3 className="section-heading">Obsada</h3>
            <div className="row">
                {movieData.credits.cast.slice(0, 10).map((actor) => (
                <div key={actor.cast_id} className="col-6 col-md-3 mb-3 p-2"> 
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
        </div> */}

        {/* Keywords */}
        {/* {movieData.keywords.keywords.length > 0 && (
            <div className="mt-4 keyword-section">
            <h4 className="section-heading">Słowa kluczowe</h4>
            <ul className="list-inline keyword-list">
                {movieData.keywords.keywords.map((kw) => (
                <li key={kw.id} className="list-inline-item badge bg-secondary me-2 keyword-badge">
                    {kw.name}
                </li>
                ))}
            </ul>
            </div>
        )} */}
        {/* Recommendations */}
        {/* {movieData.recommendations.results.length > 0 && (
        <div className="mt-5 recommendations-section">
            <h3 className="section-heading">Polecane filmy</h3>
            <div className="row">
            {movieData.recommendations.results.slice(0, 8).map((rec) => (
                <div key={rec.id} className="col-6 col-md-3 mb-4">
                <div className="card recommendation-card h-100">
                    <img
                    src={rec.poster_path ? `https://image.tmdb.org/t/p/w500${rec.poster_path}` : fallback}
                    alt={rec.title}
                    className="img-fluid rounded"
                    />
                    <div className="card-body p-2">
                    <h5 className="card-title fs-6 mb-1">{rec.title}</h5>
                    <p className="card-text small mb-0">
                        {rec.release_date ? rec.release_date : 'Brak daty'}
                    </p>
                    </div>
                </div>
                </div>
            ))}
            </div>
        </div>
        )} */}

    </div>    
    </div>
    )
}



export default MoviePreviewPage;