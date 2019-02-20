import { createActions, createReducer } from 'reduxsauce';

const { Types, Creators } = createActions({
  postMeetupRequest: ['data', 'callback'],
  postMeetupComplete: [],
  getMeetupsRequest: [],
  getMeetupsSuccess: ['data'],
  getMeetupsComplete: [],
  getMeetupRequest: ['id'],
  getMeetupSuccess: ['data'],
  getMeetupComplete: [],
  searchMeetupsRequest: ['search'],
  searchMeetupsSuccess: ['data'],
  searchMeetupsComplete: [],
});

const INITIAL_STATE = {
  loading: false,
  data: null,
};

const request = (state = INITIAL_STATE) => ({
  ...state,
  loading: true,
  data: null,
});

const complete = (state = INITIAL_STATE) => ({
  ...state,
  loading: false,
});

const success = (state = INITIAL_STATE, action) => ({
  ...state,
  data: action.data,
});

export const reducer = createReducer(INITIAL_STATE, {
  [Types.POST_MEETUP_REQUEST]: request,
  [Types.POST_MEETUP_COMPLETE]: complete,
  [Types.GET_MEETUPS_REQUEST]: request,
  [Types.GET_MEETUPS_SUCCESS]: success,
  [Types.GET_MEETUPS_COMPLETE]: complete,
  [Types.GET_MEETUP_REQUEST]: request,
  [Types.GET_MEETUP_SUCCESS]: success,
  [Types.GET_MEETUP_COMPLETE]: complete,
  [Types.SEARCH_MEETUPS_REQUEST]: request,
  [Types.SEARCH_MEETUPS_SUCCESS]: success,
  [Types.SEARCH_MEETUPS_COMPLETE]: complete,
});

export const MeetupTypes = Types;

export const MeetupActions = Creators;
