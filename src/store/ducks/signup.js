import { createActions, createReducer } from 'reduxsauce';

const { Types, Creators } = createActions({
  postSignUpRequest: ['data'],
  postSignUpComplete: [],
});

const INITIAL_STATE = {
  loading: false,
};

const request = (state = INITIAL_STATE) => ({
  ...state,
  loading: true,
});

const complete = (state = INITIAL_STATE) => ({
  ...state,
  loading: false,
});

export const reducer = createReducer(INITIAL_STATE, {
  [Types.POST_SIGN_UP_REQUEST]: request,
  [Types.POST_SIGN_UP_COMPLETE]: complete,
});

export const SignUpTypes = Types;

export const SignUpActions = Creators;
