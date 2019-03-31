import axios from 'apisauce';
import { push } from 'connected-react-router';

import { store } from '../store';
import { LoginActions } from '../store/ducks/login';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

api.addRequestTransform((request) => {
  const token = localStorage.getItem('@meetapp/token');

  if (token) {
    request.headers.Authorization = `Bearer ${token}`;
  }
});

api.addResponseTransform((response) => {
  if (response.status === 401) {
    localStorage.removeItem('@meetapp/token');
    store.dispatch(LoginActions.logout());
    store.dispatch(push('/login'));
  }
});

export default api;
