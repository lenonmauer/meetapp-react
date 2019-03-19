import { reducer, ProfileActions as actions } from '../../store/ducks/profile';

describe('Testing profile reducer', () => {
  it('should set loading as true on request', () => {
    const state = reducer([], actions.getProfileRequest());

    expect(state.loading).toBe(true);
  });

  it('should set loading as true on request', () => {
    const state = reducer([], actions.setProfileRequest());

    expect(state.loading).toBe(true);
  });

  it('should set loading as true on request', () => {
    const state = reducer([], actions.setPreferencesRequest());

    expect(state.loading).toBe(true);
  });

  it('should set loading as false and copy data on success', () => {
    const data = { a: 2 };
    const state = reducer([], actions.getProfileSuccess(data));

    expect(state.loading).toBe(false);
    expect(state.data).toBe(data);
  });

  it('should set loading as false and copy data on success', () => {
    const data = { a: 2 };
    const state = reducer([], actions.setProfileSuccess(data));

    expect(state.loading).toBe(false);
    expect(state.data).toBe(data);
  });

  it('should set loading as false and copy data on success', () => {
    const data = { a: 2 };
    const state = reducer([], actions.setPreferencesSuccess(data));

    expect(state.loading).toBe(false);
    expect(state.data).toBe(data);
  });

  it('should set loading as false on complete', () => {
    const state = reducer({ loading: true }, actions.getProfileComplete());

    expect(state.loading).toBe(false);
  });

  it('should set loading as false on complete', () => {
    const state = reducer({ loading: true }, actions.setProfileComplete());

    expect(state.loading).toBe(false);
  });

  it('should set loading as false on complete', () => {
    const state = reducer({ loading: true }, actions.setPreferencesComplete());

    expect(state.loading).toBe(false);
  });
});
