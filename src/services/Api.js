import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8000/api', // Replace with your Laravel API base URL
    headers: {
        'Content-Type': 'application/json',
    },
    
});
api.interceptors.request.use(config => {
    const token = localStorage.getItem('token'); // or wherever you store your token
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  }, error => {
    return Promise.reject(error);
  });

export default api;