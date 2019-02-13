import { createStore, compose, applyMiddleware } from 'redux';
import { routerMiddleware } from 'connected-react-router';
import createSagaMiddleware from 'redux-saga';

import history from '../routes/history';

import sagas from './sagas';
import reducers from './ducks';

const middlewares = [];
const isDev = process.env.NODE_ENV === 'development';

const sagaMonitor = isDev ? console.tron.createSagaMonitor() : null;
const sagaMiddleware = createSagaMiddleware({ sagaMonitor });

middlewares.push(sagaMiddleware);
middlewares.push(routerMiddleware(history));

const createAppropriareStore = isDev ? console.tron.createStore : createStore;
const store = createAppropriareStore(reducers(history), compose(applyMiddleware(...middlewares)));

sagaMiddleware.run(sagas);

export { store };
