import axios from 'axios';
import SERVER_URL from './config';

const axiosInstance = axios.create({
  baseURL: SERVER_URL,
  withCredentials: true
});

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

export const axiosAddToWatchlist = async (movie, currentUser) => { 
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
    catch(err){
        if(err.response) {
            console.log(err.response.data.message);
            alert(err.response.data.message);
        }else{
            console.log(err.message);
        }
    }
    return null;
}

export const fetchWatchlist = async (currentUser) => {
  try {
    console.log("Fetching watchlist for user:", currentUser);
    const response = await axiosInstance.get('/api/getWatchlist', {
      headers: {
        Authorization: `Bearer ${currentUser.token}`
      }
    });
    return response.data.data; // albo response.data, zależnie co backend zwraca
  } catch (error) {
    console.error("Error fetching watchlist:", error);
  }
  return [];
};

export const axiosUpdateWatched = async (currentUser, updated) => {
    console.log("Updating watched status for movies:", updated);
    try {
        const response = await axiosInstance.post('/api/updateWatched', { movies: updated }, {
            headers: {
                Authorization: `Bearer ${currentUser.token}`
            }
        });
        console.log("Update response:", response);
    }catch (err){
        if(err.response) {
            console.log(err.response.data.message);
            alert(err.response.data.message);
        }else{
            console.log(err.message);
        }
    }
}


export default axiosInstance;