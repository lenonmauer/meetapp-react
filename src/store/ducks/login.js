import { createActions, createReducer } from 'reduxsauce';

const { Types, Creators } = createActions({
  postLoginRequest: ['data'],
  postLoginSuccess: [],
  postLoginFailure: [],
  logout: [],
});

const INITIAL_STATE = {
  logged: !!localStorage.getItem('@meetapp/token'),
  loading: false,
};

const request = (state = INITIAL_STATE) => ({
  ...state,
  loading: true,
});

const success = (state = INITIAL_STATE) => ({
  ...state,
  loading: false,
  logged: true,
});

const failure = (state = INITIAL_STATE) => ({
  ...state,
  loading: false,
  logged: false,
});

const logout = (state = INITIAL_STATE) => ({
  ...state,
  logged: false,
});

export const reducer = createReducer(INITIAL_STATE, {
  [Types.POST_LOGIN_REQUEST]: request,
  [Types.POST_LOGIN_SUCCESS]: success,
  [Types.POST_LOGIN_FAILURE]: failure,
  [Types.LOGOUT]: logout,
});

export const LoginTypes = Types;

export const LoginActions = Creators;
