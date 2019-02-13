import { createActions, createReducer } from 'reduxsauce';

export const { Types, Creators } = createActions({
  getProfileRequest: [],
  getProfileSuccess: ['data'],
  getProfileComplete: [],
  setProfileRequest: ['data'],
  setProfileSuccess: ['data'],
  setProfileComplete: [],
  setPreferencesRequest: ['data'],
  setPreferencesSuccess: ['data'],
  setPreferencesComplete: [],
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

const endLoading = (state = INITIAL_STATE) => ({
  ...state,
  loading: false,
});

export default createReducer(INITIAL_STATE, {
  [Types.GET_PROFILE_REQUEST]: request,
  [Types.GET_PROFILE_SUCCESS]: success,
  [Types.GET_PROFILE_COMPLETE]: endLoading,
  [Types.SET_PROFILE_REQUEST]: request,
  [Types.SET_PROFILE_SUCCESS]: success,
  [Types.SET_PROFILE_COMPLETE]: endLoading,
  [Types.SET_PREFERENCES_REQUEST]: request,
  [Types.SET_PREFERENCES_SUCCESS]: success,
  [Types.SET_PREFERENCES_COMPLETE]: endLoading,
});
