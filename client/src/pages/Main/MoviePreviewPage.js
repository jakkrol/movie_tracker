import react, {useState} from "react";
import { useEffect } from "react";
import { useAuth } from "../../Contexts/AuthContext";
import axios from "axios";
import { Navigate, useLocation } from "react-router-dom";
import fallback from '../../Img/missing_img.png';
import styles from './MoviePreview.css';
import Header from '../../Components/Header';
import { axiosAddToWatchlist, axiosAddUserReview, axiosGetMovieReviews } from '../../api/axios';


function MoviePreviewPage(){
    const API_KEY = process.env.REACT_APP_API_KEY;
    const location = useLocation();
    const movie = location.state?.e;
    const [movieData, setMovieData] = useState(null);
    const [loading, setLoading] = useState(true);

    const [reviews, setReviews] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [newReview, setNewReview] = useState("");


    const { user, login } = useAuth();


    useEffect(() => {
        console.log(movie);
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

    useEffect(() => {
        const fetchReviews = async () => {
            try {
            const res = await axiosGetMovieReviews(user, movie.id, login);
            setReviews(res.data); // np. [{review: "tekst", user: "user1"}]
            console.log("Fetched reviews:", res.data);
            } catch (err) {
            console.error("Błąd pobierania recenzji:", err);
            }
        };

        fetchReviews();
    }, [movie.id]);

    function getSlimMovieData(movie) {
        return {
            id: movie.id,
            title: movie.title,
            release_date: movie.release_date,
            poster_path: movie.poster_path,
            vote_average: movie.vote_average,
            overview: movie.overview,
            // slice cast to only first 10 with needed fields if available
            credits: {
            cast: movie.credits?.cast
                ?.slice(0, 10)
                .map(c => ({
                name: c.name,
                character: c.character,
                profile_path: c.profile_path,
                })) || [],
            },
        };
    }
    const handleAddToWatchlist = async () => {
        try{
            console.log(user);
            let movie = getSlimMovieData(movieData);
            await axiosAddToWatchlist(movie, user, login);
            alert("Film został dodany do Twojej watchlisty.");
        }catch (error) {
            console.error("Error adding movie to watchlist:", error);
            alert("Wystąpił błąd podczas dodawania filmu do watchlisty.");
        }
    }

    const handleAddReview = async () => {
        await axiosAddUserReview(user, movie.id, newReview, login);
        setShowModal(false);
        setNewReview("");
        setReviews(prev => [...prev, { review: newReview, user: user.username }]);
    }


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
                <button className="btn btn-primary mb-3" onClick={handleAddToWatchlist}>
                    Dodaj do Watchlisty
                </button>
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
                <li key={kw.id} className="list-inline-item badge bg-secondary me-2 keyword-badge">
                    {kw.name}
                </li>
                ))}
            </ul>
            </div>
        )}
        {/* Recommendations */}
        {movieData.recommendations.results.length > 0 && (
        <div className="mt-5 recommendations-section">
            <h3 className="section-heading">Polecane filmy</h3>
            <div className="row">
            {movieData.recommendations.results.slice(0, 8).map((rec) => (
                <div key={rec.id} className="col-6 col-md-3 mb-4">
                <div className="recommendation-card h-100">
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
        )}

    </div>    


        <div className="reviewContainer">
        <h3>Recenzje</h3>
        {reviews.length === 0 ? (
            <p>Brak recenzji.</p>
        ) : (
            reviews.map((r, i) => (
            <div key={i} className="review-item">
                {r.review}
            </div>
            ))
        )}
        <button
            className="btn btn-outline-light mt-3"
            onClick={() => setShowModal(true)}
        >
            + Dodaj recenzję
        </button>
        </div>

      {showModal && (
        <div className="modalContainer fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded shadow-lg w-96">
            <h4 className="text-lg font-bold mb-2">Add Your Review</h4>
            <textarea
              className="w-full p-2 border rounded mb-4"
              rows={4}
              value={newReview}
              onChange={(e) => setNewReview(e.target.value)}
              placeholder="Write your review..."
            />
            <div className="flex justify-end gap-2">
              <button
                className="bg-gray-300 px-4 py-2 rounded"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
              <button
                className="bg-green-500 text-white px-4 py-2 rounded"
                onClick={handleAddReview}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
    )
}



export default MoviePreviewPage;