import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

import { mainReducer } from './reducers/index';

let store;

export function createReduxStore(initialState = {}) {
  store = createStore(mainReducer, initialState, composeWithDevTools(
    applyMiddleware(thunk)
  ));

  return store;
};

export function getStore() {
  return store;
}