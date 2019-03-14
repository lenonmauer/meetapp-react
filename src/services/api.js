import axios from 'apisauce';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

api.addRequestTransform((request) => {
  const token = localStorage.getItem('@meetapp/token');

  if (token) {
    request.headers.Authorization = `Bearer ${token}`;
  }
});

export default api;
