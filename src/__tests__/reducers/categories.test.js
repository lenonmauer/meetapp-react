import { reducer, CategoriesActions as actions } from '../../store/ducks/categories';

describe('Testing categories reducer', () => {
  it('should set loading as true on request', () => {
    const state = reducer([], actions.getCategoriesRequest());

    expect(state.loading).toBe(true);
  });

  it('should set loading as false and set data on success', () => {
    const data = {
      a: 2.0,
    };
    const state = reducer([], actions.getCategoriesSuccess(data));

    expect(state.loading).toBe(false);
    expect(state.data).toBe(data);
  });

  it('should set loading as false on failure', () => {
    const data = {
      a: 2.0,
    };
    const state = reducer([], actions.getCategoriesFailure(data));

    expect(state.loading).toBe(false);
  });
});
