import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import createStore from 'redux-mock-store';
import { MemoryRouter } from 'react-router-dom';

import SignUp from '../../pages/SignUp';

import { SignUpActions } from '../../store/ducks/signup';

const mockStore = createStore();

const INITIAL_STATE = {
  signup: {
    loading: false,
  },
};

const hackToFormik = () => new Promise((resolve) => {
  setTimeout(resolve, 0);
});

const getStore = (state = {}) => mockStore({ ...INITIAL_STATE, ...state });

const getWrapper = (store, values = {}) => mount(
  <Provider store={store}>
    <MemoryRouter>
      <SignUp values={values} />
    </MemoryRouter>
  </Provider>,
);

describe('SignUp Page', () => {
  it('should call postLoginRequest action when form data is valid', async () => {
    const store = getStore();
    const data = { email: 'email@email.com', password: 'password' };
    const wrapper = getWrapper(store, data);

    wrapper.find('form').simulate('submit');

    await hackToFormik();

    expect(store.getActions()).toContainEqual(SignUpActions.postSignUpRequest(data));
  });

  it('should not call any store action when form data is invalid', async () => {
    const store = getStore();
    const wrapper = getWrapper(store);

    wrapper.find('form').simulate('submit');

    await hackToFormik();

    expect(store.getActions().length).toEqual(0);
  });
});
