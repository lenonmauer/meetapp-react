import { createActions, createReducer } from 'reduxsauce';

export const { Types, Creators } = createActions({
  getCategoriesRequest: [],
  getCategoriesSuccess: ['data'],
  getCategoriesFailure: ['data'],
});

const INITIAL_STATE = {
  data: [],
  loading: false,
};

const request = (state = INITIAL_STATE) => ({
  ...state,
  loading: true,
});

const success = (state = INITIAL_STATE, action) => ({
  ...state,
  loading: false,
  data: action.data,
});

const failure = (state = INITIAL_STATE) => ({
  ...state,
  loading: false,
});

export default createReducer(INITIAL_STATE, {
  [Types.GET_CATEGORIES_REQUEST]: request,
  [Types.GET_CATEGORIES_SUCCESS]: success,
  [Types.GET_CATEGORIES_FAILURE]: failure,
});
