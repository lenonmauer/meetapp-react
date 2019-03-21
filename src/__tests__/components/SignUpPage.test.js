import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import createStore from 'redux-mock-store';
import { MemoryRouter } from 'react-router-dom';

import SignUpPage from '../../pages/SignUp';

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
      <SignUpPage values={values} />
    </MemoryRouter>
  </Provider>,
);

describe('SignUp Page', () => {
  it('should call postLoginRequest action when form data is valid', async () => {
    const store = getStore();
    const data = {
      email: 'email@email.com', password: 'password', name: 'Name', password_confirmation: 'password',
    };
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

  it('should render loading spinner when requested', () => {
    const storeWithoutLoading = mockStore({
      signup: {
        loading: false,
      },
    });

    const storeWithLoading = mockStore({
      signup: {
        loading: true,
      },
    });

    const wrapper = getWrapper(storeWithoutLoading);

    expect(wrapper.find('Spinner')).toHaveLength(0);

    wrapper.setProps({ store: storeWithLoading });
    wrapper.update();

    expect(wrapper.find('Spinner')).toHaveLength(1);
  });
});
