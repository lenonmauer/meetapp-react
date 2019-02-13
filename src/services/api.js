import axios from 'apisauce';

const api = axios.create({
  baseURL: 'http://localhost:3333',
});

api.addRequestTransform((request) => {
  const token = localStorage.getItem('@meetapp/token');

  if (token) {
    request.headers.Authorization = `Bearer ${token}`;
  }
});

export default api;
