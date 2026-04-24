import axios from "axios";
import SERVER_URL from "./config";

const axiosInstance = axios.create({
    baseURL: SERVER_URL,
    withCredentials: true
});

axiosInstance.interceptors.response.use(
    (res)=>res,
    async (err) => {
        const originalRequest = err.config;

        if (err.response.status === 403 && !originalRequest._retry) {
            console.log("Access token expired, attempting to refresh...");
            originalRequest._retry = true;
            try{
                const response = await axios.get(`${SERVER_URL}/api/refresh`, { withCredentials: true });
                const newToken = response.data.accessToken;
                originalRequest.headers['Authorization'] = `Bearer ${newToken}`;

                localStorage.setItem('token', newToken); // Setting token to localStorage
                window.dispatchEvent(new Event('tokenUpdated')); // Dispatching event to notify about token update

                return axiosInstance(originalRequest);
            }catch(error){
                return Promise.reject(error);
            }
        }
    return Promise.reject(err);
    }
);

export default axiosInstance;