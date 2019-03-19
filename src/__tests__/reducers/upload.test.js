import { reducer, UploadActions as actions } from '../../store/ducks/upload';

describe('Testing upload reducer', () => {
  it('should set loading as true on request', () => {
    const state = reducer([], actions.uploadRequest());

    expect(state.loading).toBe(true);
  });

  it('should set loading as false and copy data on success', () => {
    const data = { a: 2 };
    const state = reducer([], actions.uploadSuccess(data));

    expect(state.loading).toBe(false);
    expect(state.data).toBe(data);
  });

  it('should set loading=false and data=null on failure', () => {
    const state = reducer([], actions.uploadFailure());

    expect(state.loading).toBe(false);
    expect(state.data).toBe(null);
  });

  it('should set data=null on resetUpload', () => {
    const state = reducer([], actions.resetUpload());

    expect(state.data).toBe(null);
  });
});
