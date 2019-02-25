import { reducer, LoginActions as actions } from '../login';

describe('Testing login reducer', () => {
  it('should set loading as true on request', () => {
    const state = reducer([], actions.postLoginRequest());

    expect(state.loading).toBe(true);
  });

  it('should set loading=false and logged=true on success', () => {
    const state = reducer([], actions.postLoginSuccess());

    expect(state.loading).toBe(false);
    expect(state.logged).toBe(true);
  });

  it('should set loading and logged to false on failure', () => {
    const state = reducer([], actions.postLoginFailure());

    expect(state.loading).toBe(false);
    expect(state.logged).toBe(false);
  });

  it('should set logged=false on logout', () => {
    const state = reducer([], actions.logout());

    expect(state.logged).toBe(false);
  });
});
