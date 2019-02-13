import React from 'react';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import { ConnectedRouter } from 'connected-react-router';

import GlobalStyle from './styles/global';
import { Container, Content } from './styles/components';

import { Navbar } from './components';

import './config/reactotron';

import { store } from './store';

import history from './routes/history';
import Routes from './routes';

const App = () => (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Container>
        <GlobalStyle />
        <Content>
          <Navbar />
          <Routes />
          <ToastContainer />
        </Content>
      </Container>
    </ConnectedRouter>
  </Provider>
);

export default App;
