import { createActions, createReducer } from 'reduxsauce';

const { Types, Creators } = createActions({
  postSubscriptionRequest: ['id', 'callback'],
  postSubscriptionComplete: [],
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
  [Types.POST_SUBSCRIPTION_REQUEST]: request,
  [Types.POST_SUBSCRIPTION_COMPLETE]: complete,
});

export const SubscriptionTypes = Types;

export const SubscriptionActions = Creators;
