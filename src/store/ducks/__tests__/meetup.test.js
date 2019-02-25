import { reducer, MeetupActions as actions } from '../meetup';

describe('Testing meetup reducer', () => {
  it('should set loading=true and data=null on request', () => {
    const state = reducer([], actions.postMeetupRequest());

    expect(state.loading).toBe(true);
    expect(state.data).toBe(null);
  });

  it('should set loading=true and data=null on request', () => {
    const state = reducer([], actions.getMeetupsRequest());

    expect(state.loading).toBe(true);
    expect(state.data).toBe(null);
  });

  it('should set loading=true and data=null on request', () => {
    const state = reducer([], actions.getMeetupRequest());

    expect(state.loading).toBe(true);
    expect(state.data).toBe(null);
  });

  it('should set loading=true and data=null on request', () => {
    const state = reducer([], actions.searchMeetupsRequest());

    expect(state.loading).toBe(true);
    expect(state.data).toBe(null);
  });

  it('should set loading=false on complete', () => {
    const state = reducer({ loading: true }, actions.postMeetupComplete());

    expect(state.loading).toBe(false);
  });

  it('should set loading=false on complete', () => {
    const state = reducer({ loading: true }, actions.getMeetupsComplete());

    expect(state.loading).toBe(false);
  });

  it('should set loading=false on complete', () => {
    const state = reducer({ loading: true }, actions.getMeetupComplete());

    expect(state.loading).toBe(false);
  });

  it('should set loading=false on complete', () => {
    const state = reducer({ loading: true }, actions.searchMeetupsComplete());

    expect(state.loading).toBe(false);
  });

  it('should copy data on success', () => {
    const data = { a: 2 };
    const state = reducer([], actions.getMeetupsSuccess(data));

    expect(state.data).toBe(data);
  });

  it('should copy data on success', () => {
    const data = { a: 2 };
    const state = reducer([], actions.getMeetupSuccess(data));

    expect(state.data).toBe(data);
  });

  it('should copy data on success', () => {
    const data = { a: 2 };
    const state = reducer([], actions.searchMeetupsSuccess(data));

    expect(state.data).toBe(data);
  });
});
