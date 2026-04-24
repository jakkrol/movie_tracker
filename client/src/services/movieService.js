import axiosInstance from "../api/axiosInstance";

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
    // if (error.response && error.response.status === 403) {
    //   // Odświeżanie tokenu
    //   const newAccessToken = await axiosRefresh(currentUser, login);
    //   if (newAccessToken) {
    //     // Ponowne wywołanie z nowym tokenem
    //     return axiosAddToWatchlist(movie, { ...currentUser, token: newAccessToken }, login);
    //   }
    // }
    console.error("Error fetching watchlist:", error);
  }
    return null;
}


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
    // if (error.response && error.response.status === 403) {
    //   // Odświeżanie tokenu
    //   const newAccessToken = await axiosRefresh(currentUser, login);
    //   if (newAccessToken) {
    //     // Ponowne wywołanie z nowym tokenem
    //     return fetchWatchlist({ ...currentUser, token: newAccessToken }, login);
    //   }
    // }
    console.error("Error fetching watchlist:", error);
    return null;
  }
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
    // if (error.response && error.response.status === 403) {
    //   // Odświeżanie tokenu
    //   const newAccessToken = await axiosRefresh(currentUser, login);
    //   if (newAccessToken) {
    //     // Ponowne wywołanie z nowym tokenem
    //     return axiosUpdateWatched({ ...currentUser, token: newAccessToken },updated, login);
    //   }
    // }
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
    // if(err.response && err.response.status === 403) {
    //   const newAccessToken = await axiosRefresh(currentUser, login);
    //   if(newAccessToken) {
    //     return axiosDeleteMovie({ ...currentUser, token: newAccessToken }, movie, login);
    //   }
    // }
    console.log("Error deleting movie from watchlist:", err);
  }
  return false;
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
    // if (err.response && err.response.status === 403) {
    //   const newAccessToken = await axiosRefresh(currentUser, login);
    //   if (newAccessToken) {
    //     return axiosGetMovieReviews({ ...currentUser, token: newAccessToken }, movieId, login);
    //   }
    // }
    console.error("Error fetching movie reviews:", err);
  }
};


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
    // if (err.response && err.response.status === 403) {
    //   const newAccessToken = await axiosRefresh(currentUser, login);
    //   if (newAccessToken) {
    //     return axiosAddUserReview({ ...currentUser, token: newAccessToken }, movieId, review, login);
    //   }
    // }
    console.error("Error adding user review:", err);
  }
}