import { hot } from 'react-hot-loader/root';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { BrowserRouter } from 'react-router-dom';

import { App } from './app/components/app';
import { mainReducer } from './app/reducers/index';

(window as any).parseApiResponse = function(response: any) {
  return response;
}

const store = createStore(mainReducer, {}, composeWithDevTools(
  applyMiddleware(thunk)
));

const app = (
  <Provider store={store}>
    <BrowserRouter>
      <App/>
    </BrowserRouter>
  </Provider>
)

ReactDOM.render(hot(app), document.getElementById('app'));