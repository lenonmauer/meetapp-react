import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import createStore from 'redux-mock-store';
import { MemoryRouter } from 'react-router-dom';

import LoginPage from '../../pages/Login';

import { LoginActions } from '../../store/ducks/login';

const mockStore = createStore();

const INITIAL_STATE = {
  login: {
    logged: false,
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
      <LoginPage values={values} />
    </MemoryRouter>
  </Provider>,
);

describe('Login Page', () => {
  it('should call postLoginRequest action when form data is valid', async () => {
    const store = getStore();
    const data = { email: 'email@email.com', password: 'password' };
    const wrapper = getWrapper(store, data);

    wrapper.find('form').simulate('submit');

    await hackToFormik();

    expect(store.getActions()).toContainEqual(LoginActions.postLoginRequest(data));
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
      login: {
        loading: false,
      },
    });

    const storeWithLoading = mockStore({
      login: {
        loading: true,
      },
    });

    const wrapper = getWrapper(storeWithoutLoading);

    expect(wrapper.find('Spinner')).toHaveLength(0);

    wrapper.setProps({ store: storeWithLoading });
    wrapper.update();

    expect(wrapper.find('Spinner')).toHaveLength(1);
  });

  it('should redirect to dashboard when user is already logged in', async () => {
    const store = mockStore({
      login: {
        logged: true,
        loading: false,
      },
    });

    getWrapper(store);

    expect(store.getActions()[0].type).toEqual('@@router/CALL_HISTORY_METHOD');
  });
});
