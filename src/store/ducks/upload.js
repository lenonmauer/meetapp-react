import { createActions, createReducer } from 'reduxsauce';

const { Types, Creators } = createActions({
  uploadRequest: ['data'],
  uploadSuccess: ['data'],
  uploadFailure: [],
  resetUpload: [],
});

const INITIAL_STATE = {
  data: null,
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
  data: null,
});

const reset = (state = INITIAL_STATE) => ({
  ...state,
  data: null,
});

export const reducer = createReducer(INITIAL_STATE, {
  [Types.UPLOAD_REQUEST]: request,
  [Types.UPLOAD_SUCCESS]: success,
  [Types.UPLOAD_FAILURE]: failure,
  [Types.RESET_UPLOAD]: reset,
});

export const UploadTypes = Types;

export const UploadActions = Creators;
