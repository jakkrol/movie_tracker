import react, {useState} from "react";
import { useAuth } from "../../Contexts/AuthContext";
import axios from "axios";
import { useLocation } from "react-router-dom";

function MoviePreviewPage(){
    const {state} = useLocation();
    const movie = state.e;
    console.log(movie.title);

    return (
       <p>Hello</p>
    )
}

export default MoviePreviewPage;