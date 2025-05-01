import react, { useState } from "react";
import { useAuth } from "../../Contexts/AuthContext";
import axios from 'axios';

function MainPage() {

const API_KEY = process.env.REACT_APP_API_KEY;

const searchMovies = async () => {

    const path1 = 'https://api.themoviedb.org/3/genre/movie/list';
    const path2 = 'https://api.themoviedb.org/3/search/movie';
    const path3 = 'https://api.themoviedb.org/3/discover/movie?api_key=YOUR_API_KEY&with_genres=28';

    axios.get(path1, {
      params: {
        api_key: API_KEY,
        query: 'Jack+Reacher'
      }
    })
    .then(res => console.log(res.data))
    .catch(err => console.error(err));
  };




    return(
        <div>
            <button onClick={searchMovies}>TEST</button>
        </div>
    )
}

export default MainPage