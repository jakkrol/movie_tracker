// src/api/axiosInstance.js

import axios from 'axios';
import SERVER_URL from './config';

const axiosInstance = axios.create({
  baseURL: SERVER_URL,
  // headers: { Authorization: `Bearer ${token}` }, // opcjonalnie
});

export default axiosInstance;
