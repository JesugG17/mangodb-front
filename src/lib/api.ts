import axios from 'axios';

export const httpClient = axios.create({
  baseURL: 'http://localhost:3002/api',
  validateStatus: () => true,
});

httpClient.interceptors.request.use((config) => {
  const auth = JSON.parse(localStorage.getItem('auth') || '{}');

  if (auth.token) {
    config.headers['Authorization'] = auth.token;
  }

  return config;
});
