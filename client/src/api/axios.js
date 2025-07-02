import axios from 'axios';
import SERVER_URL from './config';
import { data } from 'react-router-dom';
import LoginPage from '../pages/Login/LoginPage';

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

export default axiosInstance;