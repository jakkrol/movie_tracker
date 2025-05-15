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

    console.log(movie.title);


    return (
       <div className="container-fluid">
        
       </div>
    )
}

export default MoviePreviewPage;