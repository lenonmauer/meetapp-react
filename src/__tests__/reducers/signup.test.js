import { reducer, SignUpActions as actions } from '../../store/ducks/signup';

describe('Testing signup reducer', () => {
  it('should set loading as true on request', () => {
    const state = reducer([], actions.postSignUpRequest());

    expect(state.loading).toBe(true);
  });

  it('should set loading as false on success', () => {
    const state = reducer([], actions.postSignUpComplete());

    expect(state.loading).toBe(false);
  });
});
