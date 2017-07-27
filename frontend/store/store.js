import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import {createLogger} from 'redux-logger';

import RootReducer from '../reducers/root_reducer';

const middlewares = [thunk];

// if (process.env.NODE_ENV !== 'production') {
//   debugger
//   // const {createLogger} = require('redux-logger');
//   middlewares.push(createLogger());
// }

const configureStore = (preloadedState = {}) => (
  createStore( RootReducer, preloadedState, applyMiddleware(...middlewares))
);

export default configureStore;
