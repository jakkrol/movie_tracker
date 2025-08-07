import axios from 'axios';
import SERVER_URL from './config';

const axiosInstance = axios.create({
  baseURL: SERVER_URL,
  withCredentials: true
});

const axiosRefresh = async (user, login) => {
  //let { user, login } = useAuth();
  try {
    const response = await axiosInstance.get('/api/refresh', {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    console.log("Otrzymano nowy access token:", response.data.accessToken);
    user.token = response.data.accessToken; // Aktualizuj token użytkownika
    login(user); // Zaktualizuj kontekst użytkownika
    return response.data.accessToken;
   }
  catch (err) {
    if (err.response) {
      console.log(err.response.data.message);
      alert(err.response.data.message);
    } else {
      console.log(err.message);
    }
  }
}

export const axiosRegister = async (data) =>{
    if(data.password === data.repeat_password){
      console.log("Very gucci")
      try{
          const registerUser = {login: data.login, password: data.password};
          console.log(registerUser);
          const response = await axiosInstance.post('api/register', registerUser);
          console.log(response.data);
          return true;
      }catch(err){
          if(err.response) {
              console.log(err.response.data.message);
              alert(err.response.data.message);
          }else{
              console.log(err.message);
          }
      }
  }
  return false;
}

export const axiosLogin = async (data) =>{
   try {
    console.log(data.login);
        const user = {login: data.login, password: data.password};
        console.log(user);
        const response = await axiosInstance.post('api/login', user);

        console.log(response.data);
        const loggedUser = { login: response.data.data.user, token: response.data.data.token}
        console.log(loggedUser);
        return loggedUser;
    }catch(err){
        if(err.response) {
            console.log(err.response.data.message);
            alert(err.response.data.message);
        }else{
            console.log(err.message);
        }
    }
    return null;
}



//////////////////////////////////////////////////////////////////////////////////PRIVATE API CALLS
////Im passing a login couse if the token is expired, I need to refresh it and call login from AuthContext to update the user access token
export const axiosAddToWatchlist = async (movie, currentUser, login) => { 
    try{
        const addToWatchlist = {movieId: movie.id, data: movie};
        console.log(addToWatchlist);
        const response = await axiosInstance.post('api/addMovie', addToWatchlist, {
            headers: {
                Authorization: `Bearer ${currentUser.token}`,
            }
        });
        console.log(response.data);
    }
    catch (error) {
    if (error.response && error.response.status === 403) {
      // Odświeżanie tokenu
      const newAccessToken = await axiosRefresh(currentUser, login);
      if (newAccessToken) {
        // Ponowne wywołanie z nowym tokenem
        return axiosAddToWatchlist(movie, { ...currentUser, token: newAccessToken }, login);
      }
    }
    console.error("Error fetching watchlist:", error);
  }
    return null;
}

/////////////////////////TESTY
export const fetchWatchlist = async (currentUser, login) => {
  try {
    console.log("Fetching watchlist for user:", currentUser);
    const response = await axiosInstance.get('/api/getWatchlist', {
      headers: {
        Authorization: `Bearer ${currentUser.token}`
      }
    });
    return response.data.data;
  } catch (error) {
    if (error.response && error.response.status === 403) {
      // Odświeżanie tokenu
      const newAccessToken = await axiosRefresh(currentUser, login);
      if (newAccessToken) {
        // Ponowne wywołanie z nowym tokenem
        return fetchWatchlist({ ...currentUser, token: newAccessToken }, login);
      }
    }
    console.error("Error fetching watchlist:", error);
  }
  return null;
};


export const axiosUpdateWatched = async (currentUser, updated, login) => {
    console.log("Updating watched status for movies:", updated);
    try {
        const response = await axiosInstance.post('/api/updateWatched', { movies: updated }, {
            headers: {
                Authorization: `Bearer ${currentUser.token}`
            }
        });
        console.log("Update response:", response);
    }catch (error) {
    if (error.response && error.response.status === 403) {
      // Odświeżanie tokenu
      const newAccessToken = await axiosRefresh(currentUser, login);
      if (newAccessToken) {
        // Ponowne wywołanie z nowym tokenem
        return axiosUpdateWatched({ ...currentUser, token: newAccessToken },updated, login);
      }
    }
    console.error("Error fetching watchlist:", error);
  }
    return null;
}


export const axiosDeleteMovie = async (currentUser, movie, login) => {
  try{
    console.log("Deleting movie from watchlist:", movie.movie_id);
    await axiosInstance.post('/api/deleteMovieWatchlist', { movieId: movie.movie_id}, {
      headers: {
        Authorization: `Bearer ${currentUser.token}`
      }
    });
    return true;
  }catch (err){
    if(err.response && err.response.status === 403) {
      const newAccessToken = await axiosRefresh(currentUser, login);
      if(newAccessToken) {
        return axiosDeleteMovie({ ...currentUser, token: newAccessToken }, movie, login);
      }
    }
    console.log("Error deleting movie from watchlist:", err);
  }
  return false;
}


export const axiosAddUserReview = async (currentUser, movieId, review, login) => {
  try {
    console.log("Adding user review for movie:", movieId);
    const response = await axiosInstance.post('/api/addReview', { movieId, review }, {
      headers: {
        Authorization: `Bearer ${currentUser.token}`
      }
    });
    console.log("Review added successfully:", response.data);
    return response.data;
  }catch (err) {
    if (err.response && err.response.status === 403) {
      const newAccessToken = await axiosRefresh(currentUser, login);
      if (newAccessToken) {
        return axiosAddUserReview({ ...currentUser, token: newAccessToken }, movieId, review, login);
      }
    }
    console.error("Error adding user review:", err);
  }
}


export const axiosGetMovieReviews = async (currentUser, movieId, login) => {
  try {
    console.log("Fetching reviews for movie:", movieId);
    const response = await axiosInstance.get('/api/getReviews', {
      params: { movieId },
      headers: {
        Authorization: `Bearer ${currentUser.token}`
      }
    });
    console.log("Reviews fetched successfully:", response.data);
    return response.data;
  } catch (err) {
    if (err.response && err.response.status === 403) {
      const newAccessToken = await axiosRefresh(currentUser, login);
      if (newAccessToken) {
        return axiosGetMovieReviews({ ...currentUser, token: newAccessToken }, movieId, login);
      }
    }
    console.error("Error fetching movie reviews:", err);
  }
};

export const axiosGetUserProfile = async (currentUser, login, username) => {
  try {
    console.log("Fetching: " + username);
    const response = await axiosInstance.get('/api/getProfile', {
      params: { username },
      headers: {
        Authorization: `Bearer ${currentUser.token}`
      }
  });
  console.log("Profile data fetched successfully:", response.data);
  return response.data;
} catch (err){
    if(err.response && err.response.status === 403) {
      const newAccessToken = await axiosRefresh(currentUser, login);
      if(newAccessToken) {
        return axiosGetUserProfile({ ...currentUser, token: newAccessToken }, login, username);
      }
    }
  }
}


export default axiosInstance;