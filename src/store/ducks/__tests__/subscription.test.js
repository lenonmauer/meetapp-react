import { reducer, SubscriptionActions as actions } from '../subscription';

describe('Testing subscription reducer', () => {
  it('should set loading as true on request', () => {
    const state = reducer([], actions.postSubscriptionRequest());

    expect(state.loading).toBe(true);
  });

  it('should set loading as false on success', () => {
    const state = reducer([], actions.postSubscriptionComplete());

    expect(state.loading).toBe(false);
  });
});
