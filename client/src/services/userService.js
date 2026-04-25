import axiosInstance from '../api/axiosInstance';

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
    // if(err.response && err.response.status === 403) {
    //   const newAccessToken = await axiosRefresh(currentUser, login);
    //   if(newAccessToken) {
    //     return axiosGetUserProfile({ ...currentUser, token: newAccessToken }, login, username);
    //   }
    // }
    console.error("Error fetching user profile:", err);
  }
}
