import react, {useState} from "react";
import { useAuth } from "../../Contexts/AuthContext";
import axios from "axios";
import { Navigate, useLocation } from "react-router-dom";

function MoviePreviewPage(){
    const location = useLocation();
    const movie = location.state?.e;
    if(!movie){
        return <Navigate to="/main"/>
    }
    console.log(movie);

//     useEffect(() => {
//     async function fetchCast() {
//       try {
//         const res = await fetch(
//           `https://api.themoviedb.org/3/movie/${movie.id}/credits?api_key=YOUR_API_KEY&language=pl-PL`
//         );
//         const data = await res.json();
//         setCast(data.cast);
//       } catch (err) {
//         console.error("Błąd podczas pobierania obsady:", err);
//       }
//     }
//   },[]);


    return (
       <div className="container-fluid">
        
       </div>
    )
}

export default MoviePreviewPage;