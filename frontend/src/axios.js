import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://127.0.0.1:8000',
  withCredentials: true,
});


instance.interceptors.request.use((config) => {
  const token = localStorage.getItem('adminToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default instance;